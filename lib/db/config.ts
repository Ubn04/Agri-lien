import { PoolConfig } from 'pg'

// Parse DATABASE_URL pour Render/production ou utilisez les variables individuelles
function parseDbConfig(): PoolConfig | null {
  const databaseUrl = process.env.DATABASE_URL
  
  // En développement, on peut désactiver PostgreSQL si non configuré
  if (!databaseUrl && !process.env.DB_HOST && process.env.NODE_ENV === 'development') {
    console.log('🔧 Mode développement : utilisation des données mock')
    return null
  }
  
  if (databaseUrl) {
    // Utiliser DATABASE_URL (format PostgreSQL standard pour Render)
    return {
      connectionString: databaseUrl,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: parseInt(process.env.DATABASE_POOL_SIZE || '10'),
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    }
  }
  
  // Configuration locale avec variables séparées
  return {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'agrilien',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: parseInt(process.env.DATABASE_POOL_SIZE || '10'),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  }
}

// Configuration de la base de données
export const config = {
  database: parseDbConfig(),
  
  // Configuration JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.REFRESH_TOKEN_SECRET || 'your-refresh-token-secret',
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d',
  },

  // Configuration de l'application
  app: {
    port: parseInt(process.env.PORT || '3000'),
    nodeEnv: process.env.NODE_ENV || 'development',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },

  // Configuration Mobile Money
  momo: {
    apiKey: process.env.MOMO_API_KEY || '',
    apiSecret: process.env.MOMO_API_SECRET || '',
    callbackUrl: process.env.MOMO_CALLBACK_URL || 'http://localhost:3000/api/payments/callback',
  },

  // Configuration email
  email: {
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: parseInt(process.env.SMTP_PORT || '587'),
    smtpUser: process.env.SMTP_USER || '',
    smtpPassword: process.env.SMTP_PASSWORD || '',
    fromEmail: process.env.FROM_EMAIL || 'noreply@agrilien.bj',
  },

  // Configuration upload de fichiers
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB par défaut
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
    uploadDir: process.env.UPLOAD_DIR || 'public/uploads',
  },
}

// Validation de la configuration au démarrage
export function validateConfig() {
  const required = [
    'DB_HOST',
    'DB_NAME', 
    'DB_USER',
    'DB_PASSWORD',
    'JWT_SECRET'
  ]

  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0 && process.env.NODE_ENV === 'production') {
    throw new Error(`Variables d'environnement manquantes: ${missing.join(', ')}`)
  }

  return true
}