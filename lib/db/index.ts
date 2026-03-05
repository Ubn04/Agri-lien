// Import du client et des fonctions nécessaires
import { db } from './client'
import { validateConfig } from './config'
import { runMigrations } from './migrations'

// Export du client et des utilitaires de base de données
export { db, PostgresClient } from './client'
export { config } from './config'

// Export des services PostgreSQL
export { 
  UserService, 
  ProductService, 
  OrderService, 
  StatsService,
  SessionService,
  type User,
  type Product,
  type Order 
} from './services'

export { 
  migrationManager, 
  runMigrations, 
  rollbackMigration, 
  getMigrationStatus,
  type Migration 
} from './migrations'
export type { PoolClient, QueryResult } from 'pg'

// Initialisation de la base de données
export async function initializeDatabase() {
  try {
    console.log('🔄 Initialisation de la base de données...')
    
    // Validation de la configuration
    validateConfig()
    
    // Test de connexion
    const isHealthy = await db.healthCheck()
    if (!isHealthy) {
      throw new Error('Impossible de se connecter à la base de données')
    }
    
    console.log('✅ Connexion à la base de données établie')
    
    // Exécuter les migrations en mode développement
    if (process.env.NODE_ENV !== 'production') {
      await runMigrations()
    }
    
    console.log('🎉 Base de données initialisée avec succès')
    return true
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error)
    throw error
  }
}

// Fermeture propre de la base de données
export async function closeDatabase() {
  try {
    await db.close()
    console.log('✅ Connexion à la base de données fermée')
  } catch (error) {
    console.error('❌ Erreur lors de la fermeture de la base de données:', error)
    throw error
  }
}