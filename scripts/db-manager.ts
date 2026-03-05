#!/usr/bin/env ts-node

/**
 * Script de gestion des migrations de base de données
 * Usage: 
 *   npm run db:migrate       # Exécuter toutes les migrations
 *   npm run db:rollback      # Annuler la dernière migration
 *   npm run db:status        # Voir le statut des migrations
 *   npm run db:reset         # Reset complet de la DB
 */

import { program } from 'commander'
import { initializeDatabase, runMigrations, rollbackMigration, getMigrationStatus, db } from '../lib/db'
import { config } from '../lib/db/config'
import readline from 'readline'

// Interface pour les réponses utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

async function migrateCommand() {
  try {
    console.log('🚀 Exécution des migrations...')
    await initializeDatabase()
    console.log('✅ Migrations terminées avec succès')
  } catch (error) {
    console.error('❌ Erreur lors des migrations:', error)
    process.exit(1)
  } finally {
    await db.close()
    rl.close()
  }
}

async function rollbackCommand(version?: string) {
  try {
    console.log('⏪ Rollback des migrations...')
    
    if (version) {
      console.log(`📍 Rollback vers la version: ${version}`)
    } else {
      console.log('📍 Rollback de la dernière migration')
    }
    
    const answer = await askQuestion('⚠️  Êtes-vous sûr ? Cette action est irréversible. (y/N): ')
    
    if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
      console.log('❌ Rollback annulé')
      return
    }
    
    await initializeDatabase()
    await rollbackMigration(version)
    console.log('✅ Rollback terminé avec succès')
    
  } catch (error) {
    console.error('❌ Erreur lors du rollback:', error)
    process.exit(1)
  } finally {
    await db.close()
    rl.close()
  }
}

async function statusCommand() {
  try {
    console.log('📊 Statut des migrations:')
    await initializeDatabase()
    await getMigrationStatus()
  } catch (error) {
    console.error('❌ Erreur lors de la vérification du statut:', error)
    process.exit(1)
  } finally {
    await db.close()
    rl.close()
  }
}

async function resetCommand() {
  try {
    console.log('🔥 ATTENTION: Reset complet de la base de données!')
    console.log('⚠️  Cette action supprimera TOUTES les données!')
    
    const answer1 = await askQuestion('Tapez "RESET" pour confirmer: ')
    
    if (answer1 !== 'RESET') {
      console.log('❌ Reset annulé')
      return
    }
    
    const answer2 = await askQuestion('Êtes-vous vraiment sûr ? (y/N): ')
    
    if (answer2.toLowerCase() !== 'y' && answer2.toLowerCase() !== 'yes') {
      console.log('❌ Reset annulé')
      return
    }
    
    await initializeDatabase()
    
    // Supprimer toutes les tables dans le bon ordre
    const dropQueries = [
      'DROP TABLE IF EXISTS reviews CASCADE',
      'DROP TABLE IF EXISTS notifications CASCADE',
      'DROP TABLE IF EXISTS payments CASCADE', 
      'DROP TABLE IF EXISTS orders CASCADE',
      'DROP TABLE IF EXISTS products CASCADE',
      'DROP TABLE IF EXISTS logistics_profiles CASCADE',
      'DROP TABLE IF EXISTS buyer_profiles CASCADE',
      'DROP TABLE IF EXISTS farmer_profiles CASCADE',
      'DROP TABLE IF EXISTS users CASCADE',
      'DROP TABLE IF EXISTS migrations CASCADE'
    ]
    
    for (const query of dropQueries) {
      await db.query(query)
    }
    
    console.log('🗑️ Tables supprimées')
    
    // Re-exécuter les migrations
    await runMigrations()
    
    console.log('✅ Reset terminé, base de données réinitialisée')
    
  } catch (error) {
    console.error('❌ Erreur lors du reset:', error)
    process.exit(1)
  } finally {
    await db.close()
    rl.close()
  }
}

async function healthCommand() {
  try {
    console.log('🩺 Vérification de la santé de la base de données...')
    
    const isHealthy = await db.healthCheck()
    
    if (isHealthy) {
      console.log('✅ Base de données en bonne santé')
      
      // Statistiques additionnelles
      const stats = await Promise.all([
        db.query('SELECT COUNT(*) as count FROM users'),
        db.query('SELECT COUNT(*) as count FROM products'), 
        db.query('SELECT COUNT(*) as count FROM orders'),
        db.query('SELECT pg_size_pretty(pg_database_size(current_database())) as size')
      ])
      
      console.log('📊 Statistiques:')
      console.log(`   👥 Utilisateurs: ${stats[0].rows[0].count}`)
      console.log(`   📦 Produits: ${stats[1].rows[0].count}`)
      console.log(`   🛒 Commandes: ${stats[2].rows[0].count}`)
      console.log(`   💾 Taille DB: ${stats[3].rows[0].size}`)
      
    } else {
      console.log('❌ Problème de connexion à la base de données')
      process.exit(1)
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du health check:', error)
    process.exit(1)
  } finally {
    await db.close()
    rl.close()
  }
}

// Configuration du CLI
program
  .name('db-manager')
  .description('Gestionnaire de base de données Agri-Lien')
  .version('1.0.0')

program
  .command('migrate')
  .description('Exécuter toutes les migrations en attente')
  .action(migrateCommand)

program
  .command('rollback')
  .description('Annuler la dernière migration')
  .argument('[version]', 'Version spécifique à rollback')
  .action(rollbackCommand)

program
  .command('status')
  .description('Afficher le statut des migrations')
  .action(statusCommand)

program
  .command('reset')
  .description('Reset complet de la base de données (DANGEREUX)')
  .action(resetCommand)

program
  .command('health')
  .description('Vérifier la santé de la base de données')
  .action(healthCommand)

// Exécuter si le script est appelé directement
if (require.main === module) {
  program.parse()
}

export { migrateCommand, rollbackCommand, statusCommand, resetCommand, healthCommand }