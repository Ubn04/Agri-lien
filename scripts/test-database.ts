#!/usr/bin/env node

/**
 * Script de test de connexion PostgreSQL
 * Usage: npm run test-db
 * ou: node scripts/test-database.js
 */

import { db } from '../lib/db/client.js'
import { config } from '../lib/db/config.js'

async function testConnection() {
  console.log('🔍 Test de connexion PostgreSQL...')
  console.log('=' .repeat(40))
  
  try {
    // Afficher la configuration (sans mots de passe)
    console.log('📋 Configuration:')
    console.log(`- Environnement: ${config.app.nodeEnv}`)
    console.log(`- Base de données: ${process.env.DATABASE_URL ? 'DATABASE_URL configurée' : 'Variables locales'}`)
    console.log()
    
    // Test de base
    const healthCheck = await db.healthCheck()
    if (!healthCheck) {
      throw new Error('Health check échoué')
    }
    console.log('✅ Connexion de base réussie')
    
    // Test de requête simple
    const timeResult = await db.query('SELECT NOW() as current_time, version() as version')
    const { current_time, version } = timeResult.rows[0]
    
    console.log('🕒 Heure serveur:', current_time)
    console.log('📝 Version PostgreSQL:', version.split(' ')[0])
    
    // Test de schéma
    const tablesResult = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `)
    
    const tables = tablesResult.rows.map(row => row.table_name)
    
    if (tables.length === 0) {
      console.log('⚠️ Aucune table trouvée - schéma non initialisé')
      console.log('💡 Exécutez: npm run seed pour initialiser la base de données')
    } else {
      console.log(`📊 Tables trouvées (${tables.length}):`)
      tables.forEach(table => console.log(`   - ${table}`))
    }
    
    // Tester les tables principales si elles existent
    const requiredTables = ['users', 'products', 'orders', 'payments']
    const existingTables = tables.filter(table => requiredTables.includes(table))
    
    if (existingTables.length > 0) {
      console.log()
      console.log('📈 Comptage des données:')
      
      for (const table of existingTables) {
        const countResult = await db.query(`SELECT COUNT(*) as count FROM ${table}`)
        const count = countResult.rows[0].count
        console.log(`   - ${table}: ${count} enregistrement(s)`)
      }
    }
    
    console.log()
    console.log('🎉 Tous les tests de connexion ont réussi !')
    
  } catch (error) {
    console.error('❌ Erreur de connexion:', error)
    console.log()
    console.log('🔧 Vérifications suggérées:')
    console.log('1. PostgreSQL est-il démarré ?')
    console.log('2. Les variables d\'environnement sont-elles correctes ?')
    console.log('3. Les permissions de base de données sont-elles configurées ?')
    
    if (config.app.nodeEnv === 'development') {
      console.log()
      console.log('💡 Pour le développement local:')
      console.log('- Vérifiez le fichier .env')
      console.log('- Installez PostgreSQL localement ou utilisez Docker')
    } else {
      console.log()
      console.log('💡 Pour la production:')
      console.log('- Vérifiez la variable DATABASE_URL')
      console.log('- Confirmez la connectivité réseau')
    }
    
    process.exit(1)
  } finally {
    // Fermer la connexion
    await db.close()
  }
}

// Exécuter le test
if (import.meta.url === `file://${process.argv[1]}`) {
  testConnection()
}