import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg'
import { config } from './config'

class PostgresClient {
  private static instance: PostgresClient | null = null
  private pool: Pool | null = null
  private mockMode: boolean = false

  private constructor() {
    if (config.database) {
      this.pool = new Pool(config.database)
      
      // Gestion des événements de pool
      this.pool.on('error', (err) => {
        console.error('Erreur PostgreSQL pool:', err)
      })

      this.pool.on('connect', () => {
        console.log('Nouvelle connexion établie avec PostgreSQL')
      })
    } else {
      console.log('🔧 Mode mock activé - PostgreSQL non configuré')
      this.mockMode = true
    }
  }

  static getInstance(): PostgresClient {
    if (!PostgresClient.instance) {
      PostgresClient.instance = new PostgresClient()
    }
    return PostgresClient.instance
  }

  async query<T extends QueryResultRow = any>(text: string, params?: any[]): Promise<QueryResult<T>> {
    if (this.mockMode) {
      console.log('🔧 Mode mock : requête simulée -', text)
      // Retourner une réponse mock basique
      return {
        rows: [] as T[],
        rowCount: 0,
        command: 'SELECT',
        oid: 0,
        fields: []
      } as QueryResult<T>
    }

    if (!this.pool) {
      throw new Error('Base de données non initialisée')
    }

    const client = await this.pool.connect()
    try {
      const start = Date.now()
      const result = await client.query(text, params)
      const duration = Date.now() - start
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Requête exécutée:', { text, duration, rows: result.rowCount })
      }
      
      return result
    } finally {
      client.release()
    }
  }

  async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    if (!this.pool) {
      throw new Error('Base de données non initialisée')
    }

    const client = await this.pool.connect()
    
    try {
      await client.query('BEGIN')
      const result = await callback(client)
      await client.query('COMMIT')
      return result
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  }

  async queryWithTransaction<T extends QueryResultRow = any>(
    text: string, 
    params?: any[], 
    client?: PoolClient
  ): Promise<QueryResult<T>> {
    if (client) {
      return client.query(text, params)
    }
    return this.query(text, params)
  }

  async healthCheck(): Promise<boolean> {
    if (this.mockMode) {
      console.log('🔧 Mode mock : health check simulé')
      return true
    }

    try {
      await this.query('SELECT 1')
      return true
    } catch (error) {
      console.error('Health check échoué:', error)
      return false
    }
  }

  async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end()
      this.pool = null
    }
  }

  getPool(): Pool | null {
    return this.pool
  }
}

// Instance singleton
const db = PostgresClient.getInstance()

export { db, PostgresClient }
export type { PoolClient, QueryResult }