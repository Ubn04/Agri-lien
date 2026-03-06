import { db } from '../db'
import { User, UserRole, UserStatus, FarmerProfile, BuyerProfile } from '../types/user'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

export interface CreateUserData {
  email: string
  phone: string
  password: string
  firstName: string
  lastName: string
  role: UserRole
}

export interface CreateFarmerProfileData extends CreateUserData {
  farmName: string
  farmLocation: {
    address: string
    city: string
    coordinates?: { lat: number; lng: number }
  }
  farmSize?: number
  certifications?: string[]
  specialties?: string[]
}

export interface CreateBuyerProfileData extends CreateUserData {
  businessName: string
  businessType: string
  location: {
    address: string
    city: string
    coordinates?: { lat: number; lng: number }
  }
  taxId?: string
}

export class UserService {
  // Créer un utilisateur
  static async createUser(userData: CreateUserData): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 12)
    
    const query = `
      INSERT INTO users (email, phone, password_hash, first_name, last_name, role, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `
    
    const values = [
      userData.email,
      userData.phone,
      hashedPassword,
      userData.firstName,
      userData.lastName,
      userData.role.toUpperCase(),
      UserStatus.PENDING.toUpperCase()
    ]
    
    const result = await db.query<User>(query, values)
    return result.rows[0]
  }

  // Créer un profil fermier complet
  static async createFarmerProfile(profileData: CreateFarmerProfileData): Promise<FarmerProfile> {
    return await db.transaction(async (client) => {
      // Créer l'utilisateur d'abord
      const hashedPassword = await bcrypt.hash(profileData.password, 12)
      
      const userQuery = `
        INSERT INTO users (email, phone, password_hash, first_name, last_name, role, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `
      
      const userValues = [
        profileData.email,
        profileData.phone,
        hashedPassword,
        profileData.firstName,
        profileData.lastName,
        UserRole.FARMER.toUpperCase(),
        UserStatus.PENDING.toUpperCase()
      ]
      
      const userResult = await client.query<User>(userQuery, userValues)
      const user = userResult.rows[0]
      
      // Créer le profil fermier
      const profileQuery = `
        INSERT INTO farmer_profiles (user_id, farm_name, farm_location, farm_size, certifications, specialties)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `
      
      const profileValues = [
        user.id,
        profileData.farmName,
        JSON.stringify(profileData.farmLocation),
        profileData.farmSize || null,
        profileData.certifications || [],
        profileData.specialties || []
      ]
      
      const profileResult = await client.query(profileQuery, profileValues)
      
      return {
        ...user,
        farmName: profileData.farmName,
        farmLocation: profileData.farmLocation,
        farmSize: profileData.farmSize || 0,
        certifications: profileData.certifications || [],
        specialties: profileData.specialties || [],
        rating: 0,
        totalSales: 0
      } as FarmerProfile
    })
  }

  // Créer un profil acheteur complet
  static async createBuyerProfile(profileData: CreateBuyerProfileData): Promise<BuyerProfile> {
    return await db.transaction(async (client) => {
      // Créer l'utilisateur d'abord
      const hashedPassword = await bcrypt.hash(profileData.password, 12)
      
      const userQuery = `
        INSERT INTO users (email, phone, password_hash, first_name, last_name, role, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `
      
      const userValues = [
        profileData.email,
        profileData.phone,
        hashedPassword,
        profileData.firstName,
        profileData.lastName,
        UserRole.BUYER.toUpperCase(),
        UserStatus.PENDING.toUpperCase()
      ]
      
      const userResult = await client.query<User>(userQuery, userValues)
      const user = userResult.rows[0]
      
      // Créer le profil acheteur
      const profileQuery = `
        INSERT INTO buyer_profiles (user_id, business_name, business_type, location, tax_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `
      
      const profileValues = [
        user.id,
        profileData.businessName,
        profileData.businessType,
        JSON.stringify(profileData.location),
        profileData.taxId || null
      ]
      
      await client.query(profileQuery, profileValues)
      
      return {
        ...user,
        businessName: profileData.businessName,
        businessType: profileData.businessType as any,
        location: profileData.location,
        taxId: profileData.taxId
      } as BuyerProfile
    })
  }

  // Trouver un utilisateur par email
  static async findByEmail(email: string): Promise<User | null> {
    const query = `
      SELECT * FROM users WHERE email = $1 AND status != 'INACTIVE'
    `
    
    const result = await db.query<User>(query, [email])
    return result.rows[0] || null
  }

  // Trouver un utilisateur par ID avec profil
  static async findByIdWithProfile(id: string): Promise<any | null> {
    const userQuery = `SELECT * FROM users WHERE id = $1`
    const userResult = await db.query<User>(userQuery, [id])
    
    if (userResult.rows.length === 0) {
      return null
    }
    
    const user = userResult.rows[0]
    
    // Charger le profil selon le rôle
    if (user.role === 'FARMER') {
      const profileQuery = `
        SELECT * FROM farmer_profiles WHERE user_id = $1
      `
      const profileResult = await db.query(profileQuery, [id])
      
      if (profileResult.rows.length > 0) {
        const profile = profileResult.rows[0]
        return {
          ...user,
          farmName: profile.farm_name,
          farmLocation: profile.farm_location,
          farmSize: profile.farm_size,
          certifications: profile.certifications,
          specialties: profile.specialties,
          rating: parseFloat(profile.rating),
          totalSales: profile.total_sales
        }
      }
    } else if (user.role === 'BUYER') {
      const profileQuery = `
        SELECT * FROM buyer_profiles WHERE user_id = $1
      `
      const profileResult = await db.query(profileQuery, [id])
      
      if (profileResult.rows.length > 0) {
        const profile = profileResult.rows[0]
        return {
          ...user,
          businessName: profile.business_name,
          businessType: profile.business_type,
          location: profile.location,
          taxId: profile.tax_id
        }
      }
    }
    
    return user
  }

  // Vérifier le mot de passe
  static async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }

  // Obtenir tous les utilisateurs avec pagination
  static async getAllUsers(
    page: number = 1,
    limit: number = 10,
    role?: UserRole
  ): Promise<{ users: User[]; total: number }> {
    const offset = (page - 1) * limit
    
    let whereClause = "WHERE status != 'INACTIVE'"
    const values: any[] = [limit, offset]
    
    if (role) {
      whereClause += " AND role = $3"
      values.push(role.toUpperCase())
    }
    
    const query = `
      SELECT * FROM users 
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `
    
    const countQuery = `
      SELECT COUNT(*) as total FROM users ${whereClause.replace('LIMIT $1 OFFSET $2', '')}
    `
    
    const [usersResult, countResult] = await Promise.all([
      db.query<User>(query, values),
      db.query<{ total: string }>(countQuery, role ? [role.toUpperCase()] : [])
    ])
    
    return {
      users: usersResult.rows,
      total: parseInt(countResult.rows[0].total)
    }
  }

  // Mettre à jour le statut d'un utilisateur
  static async updateUserStatus(id: string, status: UserStatus): Promise<User | null> {
    const query = `
      UPDATE users 
      SET status = $1, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $2 
      RETURNING *
    `
    
    const result = await db.query<User>(query, [status.toUpperCase(), id])
    return result.rows[0] || null
  }

  // Suppression douce d'un utilisateur
  static async softDeleteUser(id: string): Promise<boolean> {
    const query = `
      UPDATE users 
      SET status = 'INACTIVE', updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1
    `
    
    const result = await db.query(query, [id])
    return result.rowCount !== null && result.rowCount > 0
  }

  // Obtenir les fermiers avec leurs statistiques
  static async getFarmersWithStats(limit: number = 10): Promise<any[]> {
    const query = `
      SELECT 
        u.*,
        fp.farm_name,
        fp.farm_location,
        fp.farm_size,
        fp.rating,
        fp.total_sales,
        COUNT(p.id) as total_products
      FROM users u
      INNER JOIN farmer_profiles fp ON u.id = fp.user_id
      LEFT JOIN products p ON u.id = p.farmer_id AND p.status = 'AVAILABLE'
      WHERE u.role = 'FARMER' AND u.status = 'ACTIVE'
      GROUP BY u.id, fp.id
      ORDER BY fp.rating DESC, fp.total_sales DESC
      LIMIT $1
    `
    
    const result = await db.query(query, [limit])
    return result.rows
  }
}

export default UserService