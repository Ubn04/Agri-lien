import { db } from './client'
import fs from 'fs/promises'
import path from 'path'

export interface Migration {
  version: string
  name: string
  up: string
  down?: string
}

export class MigrationManager {
  private migrationsPath: string

  constructor(migrationsPath: string = path.join(process.cwd(), 'database', 'migrations')) {
    this.migrationsPath = migrationsPath
  }

  // Créer la table des migrations si elle n'existe pas
  async ensureMigrationsTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        version VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    await db.query(query)
  }

  // Obtenir les migrations exécutées
  async getExecutedMigrations(): Promise<string[]> {
    const result = await db.query<{ version: string }>(
      'SELECT version FROM migrations ORDER BY version'
    )
    return result.rows.map(row => row.version)
  }

  // Lire toutes les migrations du dossier
  async loadMigrations(): Promise<Migration[]> {
    try {
      const files = await fs.readdir(this.migrationsPath)
      const migrationFiles = files
        .filter(file => file.endsWith('.sql'))
        .sort()

      const migrations: Migration[] = []

      for (const file of migrationFiles) {
        const filePath = path.join(this.migrationsPath, file)
        const content = await fs.readFile(filePath, 'utf8')
        
        // Format attendu: YYYYMMDD_HHMMSS_nom.sql
        const [version, ...nameParts] = file.replace('.sql', '').split('_')
        const name = nameParts.join('_')

        // Séparer UP et DOWN si présent
        const sections = content.split('-- DOWN')
        const up = sections[0].replace('-- UP', '').trim()
        const down = sections[1]?.trim()

        migrations.push({
          version,
          name,
          up,
          down
        })
      }

      return migrations
    } catch (error) {
      console.error('Erreur lors du chargement des migrations:', error)
      return []
    }
  }

  // Exécuter les migrations en attente
  async migrate(): Promise<void> {
    console.log('🚀 Démarrage des migrations...')
    
    await this.ensureMigrationsTable()
    
    const executedMigrations = await this.getExecutedMigrations()
    const allMigrations = await this.loadMigrations()
    
    const pendingMigrations = allMigrations.filter(
      migration => !executedMigrations.includes(migration.version)
    )

    if (pendingMigrations.length === 0) {
      console.log('✅ Aucune migration en attente')
      return
    }

    console.log(`📋 ${pendingMigrations.length} migration(s) en attente`)

    for (const migration of pendingMigrations) {
      console.log(`⏳ Exécution de la migration ${migration.version}: ${migration.name}`)
      
      try {
        await db.transaction(async (client) => {
          // Exécuter la migration
          await client.query(migration.up)
          
          // Marquer comme exécutée
          await client.query(
            'INSERT INTO migrations (version, name) VALUES ($1, $2)',
            [migration.version, migration.name]
          )
        })
        
        console.log(`✅ Migration ${migration.version} exécutée avec succès`)
      } catch (error) {
        console.error(`❌ Erreur lors de l'exécution de la migration ${migration.version}:`, error)
        throw error
      }
    }

    console.log('🎉 Toutes les migrations ont été exécutées avec succès')
  }

  // Revenir en arrière d'une migration
  async rollback(version?: string): Promise<void> {
    console.log('⏪ Démarrage du rollback...')
    
    const executedMigrations = await this.getExecutedMigrations()
    const allMigrations = await this.loadMigrations()
    
    if (executedMigrations.length === 0) {
      console.log('⚠️  Aucune migration à annuler')
      return
    }

    // Si pas de version spécifiée, annuler la dernière
    const targetVersion = version || executedMigrations[executedMigrations.length - 1]
    const migration = allMigrations.find(m => m.version === targetVersion)
    
    if (!migration) {
      throw new Error(`Migration ${targetVersion} introuvable`)
    }

    if (!migration.down) {
      throw new Error(`Pas de script de rollback pour la migration ${targetVersion}`)
    }

    console.log(`⏳ Rollback de la migration ${migration.version}: ${migration.name}`)

    try {
      await db.transaction(async (client) => {
        // Exécuter le rollback
        await client.query(migration.down!)
        
        // Supprimer de la table des migrations
        await client.query(
          'DELETE FROM migrations WHERE version = $1',
          [migration.version]
        )
      })
      
      console.log(`✅ Rollback de la migration ${migration.version} réussi`)
    } catch (error) {
      console.error(`❌ Erreur lors du rollback de la migration ${migration.version}:`, error)
      throw error
    }
  }

  // Statut des migrations
  async status(): Promise<void> {
    await this.ensureMigrationsTable()
    
    const executedMigrations = await this.getExecutedMigrations()
    const allMigrations = await this.loadMigrations()
    
    console.log('📊 Statut des migrations:')
    console.log('========================')
    
    for (const migration of allMigrations) {
      const status = executedMigrations.includes(migration.version) ? '✅ Exécutée' : '⏳ En attente'
      console.log(`${migration.version} - ${migration.name}: ${status}`)
    }
    
    console.log(`\nTotal: ${allMigrations.length} migrations, ${executedMigrations.length} exécutées`)
  }
}

// Instance par défaut
export const migrationManager = new MigrationManager()

// Fonctions utilitaires
export async function runMigrations(): Promise<void> {
  await migrationManager.migrate()
}

export async function rollbackMigration(version?: string): Promise<void> {
  await migrationManager.rollback(version)
}

export async function getMigrationStatus(): Promise<void> {
  await migrationManager.status()
}