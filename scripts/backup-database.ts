#!/usr/bin/env ts-node

/**
 * Script de sauvegarde de la base de données
 * Usage: npm run backup
 */

import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import fs from 'fs/promises'
import { config } from '../lib/db/config'

const execAsync = promisify(exec)

async function createBackup() {
  try {
    console.log('🔄 Démarrage de la sauvegarde...')
    
    // Créer le dossier de sauvegarde s'il n'existe pas
    const backupDir = path.join(process.cwd(), 'backups')
    
    try {
      await fs.access(backupDir)
    } catch {
      await fs.mkdir(backupDir, { recursive: true })
      console.log('📁 Dossier de sauvegarde créé')
    }
    
    // Générer le nom du fichier avec timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `backup-agrilien-${timestamp}.sql`
    const filepath = path.join(backupDir, filename)
    
    // Construire la commande pg_dump
    const dbConfig = config.database
    
    if (!dbConfig) {
      throw new Error('Configuration de base de données non trouvée')
    }
    
    const pgDumpCommand = [
      'pg_dump',
      `--host=${dbConfig.host}`,
      `--port=${dbConfig.port}`,
      `--username=${dbConfig.user}`,
      `--dbname=${dbConfig.database}`,
      '--verbose',
      '--clean',
      '--no-owner',
      '--no-privileges',
      '--format=custom',
      `--file=${filepath}`
    ].join(' ')
    
    // Obtenir le mot de passe (peut être une string ou une fonction)
    const password = typeof dbConfig.password === 'function' 
      ? await dbConfig.password() 
      : dbConfig.password
    
    // Définir le mot de passe via variable d'environnement
    const env = {
      ...process.env,
      PGPASSWORD: password
    }
    
    console.log('💾 Création de la sauvegarde...')
    console.log(`📍 Fichier: ${filename}`)
    
    // Exécuter pg_dump
    const { stdout, stderr } = await execAsync(pgDumpCommand, { env })
    
    if (stderr && !stderr.includes('pg_dump:')) {
      throw new Error(stderr)
    }
    
    // Vérifier que le fichier a été créé
    const stats = await fs.stat(filepath)
    const sizeInMB = (stats.size / 1024 / 1024).toFixed(2)
    
    console.log('✅ Sauvegarde terminée avec succès!')
    console.log(`📊 Taille: ${sizeInMB} MB`)
    console.log(`📍 Emplacement: ${filepath}`)
    
    // Créer une sauvegarde texte lisible aussi
    const textFilename = `backup-agrilien-${timestamp}.sql`
    const textFilepath = path.join(backupDir, textFilename.replace('.sql', '-readable.sql'))
    
    const pgDumpTextCommand = [
      'pg_dump',
      `--host=${dbConfig.host}`,
      `--port=${dbConfig.port}`,
      `--username=${dbConfig.user}`,
      `--dbname=${dbConfig.database}`,
      '--clean',
      '--no-owner',
      '--no-privileges',
      '--inserts',
      `--file=${textFilepath}`
    ].join(' ')
    
    await execAsync(pgDumpTextCommand, { env })
    
    const textStats = await fs.stat(textFilepath)
    const textSizeInMB = (textStats.size / 1024 / 1024).toFixed(2)
    
    console.log(`📄 Sauvegarde texte créée: ${textSizeInMB} MB`)
    
    return {
      customBackup: filepath,
      textBackup: textFilepath,
      size: stats.size,
      timestamp
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde:', error.message)
    
    if (error.message.includes('pg_dump')) {
      console.error('💡 Assurez-vous que PostgreSQL client (pg_dump) est installé')
      console.error('   Ubuntu/Debian: sudo apt install postgresql-client')
      console.error('   macOS: brew install postgresql')
    }
    
    throw error
  }
}

async function listBackups() {
  try {
    const backupDir = path.join(process.cwd(), 'backups')
    const files = await fs.readdir(backupDir)
    
    const backups = files
      .filter(file => file.startsWith('backup-agrilien-') && file.endsWith('.sql'))
      .sort()
      .reverse() // Plus récents en premier
    
    if (backups.length === 0) {
      console.log('📭 Aucune sauvegarde trouvée')
      return
    }
    
    console.log('📋 Sauvegardes disponibles:')
    console.log('========================')
    
    for (const backup of backups) {
      const filepath = path.join(backupDir, backup)
      const stats = await fs.stat(filepath)
      const sizeInMB = (stats.size / 1024 / 1024).toFixed(2)
      const date = stats.mtime.toLocaleDateString('fr-FR')
      const time = stats.mtime.toLocaleTimeString('fr-FR')
      
      console.log(`${backup}`)
      console.log(`   📅 ${date} ${time}`)
      console.log(`   📊 ${sizeInMB} MB`)
      console.log('')
    }
    
    return backups
    
  } catch (error) {
    console.error('❌ Erreur lors du listing des sauvegardes:', error.message)
    throw error
  }
}

async function restoreBackup(backupFile?: string) {
  try {
    const backupDir = path.join(process.cwd(), 'backups')
    
    if (!backupFile) {
      // Prendre la sauvegarde la plus récente
      const backups = await listBackups()
      if (!backups || backups.length === 0) {
        throw new Error('Aucune sauvegarde trouvée')
      }
      backupFile = backups[0]
    }
    
    const filepath = path.join(backupDir, backupFile)
    
    // Vérifier que le fichier existe
    await fs.access(filepath)
    
    console.log(`🔄 Restauration depuis: ${backupFile}`)
    console.log('⚠️  ATTENTION: Cela remplacera toutes les données actuelles!')
    
    // En production, on devrait demander confirmation
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Restauration en production nécessite une confirmation manuelle')
    }
    
    const dbConfig = config.database
    
    if (!dbConfig) {
      throw new Error('Configuration de base de données non trouvée')
    }
    
    // Construire la commande pg_restore
    const pgRestoreCommand = [
      'pg_restore',
      `--host=${dbConfig.host}`,
      `--port=${dbConfig.port}`,
      `--username=${dbConfig.user}`,
      `--dbname=${dbConfig.database}`,
      '--verbose',
      '--clean',
      '--if-exists',
      '--no-owner',
      '--no-privileges',
      filepath
    ].join(' ')
    
    // Obtenir le mot de passe (peut être une string ou une fonction)
    const password = typeof dbConfig.password === 'function' 
      ? await dbConfig.password() 
      : dbConfig.password
    
    const env = {
      ...process.env,
      PGPASSWORD: password
    }
    
    console.log('💾 Restauration en cours...')
    
    const { stdout, stderr } = await execAsync(pgRestoreCommand, { env })
    
    if (stderr && !stderr.includes('pg_restore:')) {
      throw new Error(stderr)
    }
    
    console.log('✅ Restauration terminée avec succès!')
    
  } catch (error) {
    console.error('❌ Erreur lors de la restauration:', error.message)
    throw error
  }
}

// Nettoyage des anciennes sauvegardes (garder les 10 plus récentes)
async function cleanupBackups(keepCount: number = 10) {
  try {
    const backupDir = path.join(process.cwd(), 'backups')
    const files = await fs.readdir(backupDir)
    
    const backups = files
      .filter(file => file.startsWith('backup-agrilien-'))
      .map(file => ({
        name: file,
        path: path.join(backupDir, file),
        stats: null as any
      }))
    
    // Obtenir les stats de chaque fichier
    for (const backup of backups) {
      backup.stats = await fs.stat(backup.path)
    }
    
    // Trier par date de modification (plus récents en premier)
    backups.sort((a, b) => b.stats.mtime.getTime() - a.stats.mtime.getTime())
    
    // Supprimer les anciennes sauvegardes
    const toDelete = backups.slice(keepCount)
    
    if (toDelete.length > 0) {
      console.log(`🗑️ Suppression de ${toDelete.length} ancienne(s) sauvegarde(s)...`)
      
      for (const backup of toDelete) {
        await fs.unlink(backup.path)
        console.log(`   ❌ ${backup.name}`)
      }
    }
    
    console.log(`📊 ${backups.length - toDelete.length} sauvegarde(s) conservée(s)`)
    
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error.message)
  }
}

// Script principal
async function main() {
  const command = process.argv[2]
  
  switch (command) {
    case 'create':
      await createBackup()
      await cleanupBackups()
      break
      
    case 'list':
      await listBackups()
      break
      
    case 'restore':
      const backupFile = process.argv[3]
      await restoreBackup(backupFile)
      break
      
    case 'cleanup':
      const keepCount = parseInt(process.argv[3]) || 10
      await cleanupBackups(keepCount)
      break
      
    default:
      console.log('Usage:')
      console.log('  npm run backup create    # Créer une sauvegarde')
      console.log('  npm run backup list      # Lister les sauvegardes')
      console.log('  npm run backup restore   # Restaurer la dernière sauvegarde')
      console.log('  npm run backup cleanup   # Nettoyer les anciennes sauvegardes')
  }
}

// Exécuter si le script est appelé directement
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Erreur fatale:', error)
    process.exit(1)
  })
}

export { createBackup, listBackups, restoreBackup, cleanupBackups }