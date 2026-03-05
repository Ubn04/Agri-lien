// import jwt from 'jsonwebtoken' // Temporairement désactivé
import { config } from '../db/config'
import UserService, { CreateUserData, CreateFarmerProfileData, CreateBuyerProfileData } from './userService'
import { User, UserRole } from '../types/user'

// JWT Mock temporaire simplifiée pour compatibilité edge runtime
const jwt = {
  sign: (payload: any, secret: string, options?: any) => {
    // Version ultra-simplifiée sans Buffer pour edge runtime
    const payloadStr = JSON.stringify(payload)
    return `dev_token_${payloadStr.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}`
  },
  verify: (token: string, secret: string) => {
    // Version ultra-simplifiée sans Buffer pour edge runtime
    if (token.startsWith('dev_token_')) {
      // Pour le développement, on retourne un payload basique
      return {
        userId: '1',
        email: 'dev@test.com',
        role: 'ADMIN'
      }
    }
    throw new Error('Invalid token')
  }
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  user: User
}

export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

export class AuthService {
  // Inscription d'un utilisateur
  static async register(userData: CreateUserData): Promise<User> {
    // Vérifier si l'email existe déjà
    const existingUser = await UserService.findByEmail(userData.email)
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà')
    }

    // Créer l'utilisateur
    const user = await UserService.createUser(userData)
    return user
  }

  // Inscription d'un fermier avec profil complet
  static async registerFarmer(profileData: CreateFarmerProfileData): Promise<any> {
    // Vérifier si l'email existe déjà
    const existingUser = await UserService.findByEmail(profileData.email)
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà')
    }

    // Créer le profil fermier complet
    const farmerProfile = await UserService.createFarmerProfile(profileData)
    return farmerProfile
  }

  // Inscription d'un acheteur avec profil complet
  static async registerBuyer(profileData: CreateBuyerProfileData): Promise<any> {
    // Vérifier si l'email existe déjà
    const existingUser = await UserService.findByEmail(profileData.email)
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà')
    }

    // Créer le profil acheteur complet
    const buyerProfile = await UserService.createBuyerProfile(profileData)
    return buyerProfile
  }

  // Connexion
  static async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const { email, password } = credentials

    // Trouver l'utilisateur
    const user = await UserService.findByEmail(email)
    if (!user) {
      throw new Error('Email ou mot de passe incorrect')
    }

    // Vérifier le mot de passe
    const isPasswordValid = await UserService.verifyPassword(password, user.password_hash)
    if (!isPasswordValid) {
      throw new Error('Email ou mot de passe incorrect')
    }

    // Vérifier le statut du compte
    if (user.status === 'SUSPENDED') {
      throw new Error('Votre compte a été suspendu. Contactez l\'administration.')
    }

    if (user.status === 'INACTIVE') {
      throw new Error('Votre compte a été désactivé.')
    }

    // Générer les tokens
    const tokens = this.generateTokens(user)

    // Obtenir le profil complet
    const userWithProfile = await UserService.findByIdWithProfile(user.id)

    return {
      ...tokens,
      user: userWithProfile
    }
  }

  // Générer les tokens JWT
  static generateTokens(user: User): { accessToken: string; refreshToken: string } {
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role
    }

    const accessToken = jwt.sign(
      payload,
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    )

    const refreshToken = jwt.sign(
      payload,
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiresIn }
    )

    return { accessToken, refreshToken }
  }

  // Vérifier un token d'accès
  static verifyAccessToken(token: string): JWTPayload {
    try {
      const decoded = jwt.verify(token, config.jwt.secret) as JWTPayload
      return decoded
    } catch (error) {
      throw new Error('Token d\'accès invalide ou expiré')
    }
  }

  // Vérifier un token de rafraîchissement
  static verifyRefreshToken(token: string): JWTPayload {
    try {
      const decoded = jwt.verify(token, config.jwt.refreshSecret) as JWTPayload
      return decoded
    } catch (error) {
      throw new Error('Token de rafraîchissement invalide ou expiré')
    }
  }

  // Rafraîchir les tokens
  static async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    try {
      // Vérifier le refresh token
      const decoded = this.verifyRefreshToken(refreshToken)

      // Obtenir l'utilisateur actuel
      const user = await UserService.findByIdWithProfile(decoded.userId)
      if (!user) {
        throw new Error('Utilisateur introuvable')
      }

      if (user.status !== 'ACTIVE') {
        throw new Error('Compte utilisateur inactif')
      }

      // Générer de nouveaux tokens
      const tokens = this.generateTokens(user)

      return {
        ...tokens,
        user
      }
    } catch (error) {
      throw new Error('Token de rafraîchissement invalide')
    }
  }

  // Obtenir l'utilisateur actuel depuis le token
  static async getCurrentUser(token: string): Promise<User | null> {
    try {
      const decoded = this.verifyAccessToken(token)
      const user = await UserService.findByIdWithProfile(decoded.userId)
      
      if (!user || user.status !== 'ACTIVE') {
        return null
      }

      return user
    } catch (error) {
      return null
    }
  }

  // Changer le mot de passe
  static async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> {
    // Obtenir l'utilisateur
    const user = await UserService.findByIdWithProfile(userId)
    if (!user) {
      throw new Error('Utilisateur introuvable')
    }

    // Vérifier le mot de passe actuel
    const isCurrentPasswordValid = await UserService.verifyPassword(
      currentPassword,
      user.password_hash
    )
    
    if (!isCurrentPasswordValid) {
      throw new Error('Mot de passe actuel incorrect')
    }

    // TODO: Implémenter la fonction de mise à jour du mot de passe dans UserService
    // Pour l'instant, on retourne true
    console.log(`Changement de mot de passe pour l'utilisateur ${userId}`)
    return true
  }

  // Demander une réinitialisation de mot de passe
  static async requestPasswordReset(email: string): Promise<boolean> {
    const user = await UserService.findByEmail(email)
    if (!user) {
      // On retourne true même si l'utilisateur n'existe pas pour des raisons de sécurité
      return true
    }

    // Générer un token de réinitialisation
    const resetToken = jwt.sign(
      { userId: user.id, email: user.email, type: 'password_reset' },
      config.jwt.secret,
      { expiresIn: '1h' }
    )

    // TODO: Envoyer l'email avec le lien de réinitialisation
    console.log(`Token de réinitialisation généré pour ${email}: ${resetToken}`)
    
    return true
  }

  // Réinitialiser le mot de passe
  static async resetPassword(
    resetToken: string,
    newPassword: string
  ): Promise<boolean> {
    try {
      // Vérifier le token de réinitialisation
      const decoded = jwt.verify(resetToken, config.jwt.secret) as any
      
      if (decoded.type !== 'password_reset') {
        throw new Error('Token invalide')
      }

      // TODO: Implémenter la fonction de mise à jour du mot de passe dans UserService
      console.log(`Réinitialisation du mot de passe pour l'utilisateur ${decoded.userId}`)
      
      return true
    } catch (error) {
      throw new Error('Token de réinitialisation invalide ou expiré')
    }
  }

  // Valider les permissions d'accès
  static validateAccess(userRole: string, requiredRoles: string[]): boolean {
    return requiredRoles.includes(userRole) || requiredRoles.includes('*')
  }

  // Middleware d'authentification pour les API routes
  static createAuthMiddleware(requiredRoles: string[] = ['*']) {
    return async (request: any): Promise<{ user: User | null; error?: string }> => {
      try {
        const authHeader = request.headers.authorization
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return { user: null, error: 'Token d\'authentification manquant' }
        }

        const token = authHeader.substring(7) // Remove "Bearer "
        const decoded = this.verifyAccessToken(token)
        
        // Vérifier les permissions
        if (!this.validateAccess(decoded.role, requiredRoles)) {
          return { user: null, error: 'Permissions insuffisantes' }
        }

        const user = await UserService.findByIdWithProfile(decoded.userId)
        
        if (!user || user.status !== 'ACTIVE') {
          return { user: null, error: 'Utilisateur inactif ou introuvable' }
        }

        return { user }
      } catch (error) {
        return { user: null, error: 'Token invalide ou expiré' }
      }
    }
  }
}

export default AuthService