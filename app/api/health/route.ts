import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Test de santé complet pour Render
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
      },
      database: {
        status: 'unknown',
        connected: false,
        users: 0,
        error: undefined as string | undefined
      }
    }

    // Test de connexion PostgreSQL
    try {
      const dbHealthy = await db.healthCheck()
      health.database.status = dbHealthy ? 'healthy' : 'unhealthy'
      health.database.connected = dbHealthy
      
      if (dbHealthy) {
        // Stats rapides
        const userCount = await db.query('SELECT COUNT(*) as count FROM users')
        health.database.users = parseInt(userCount.rows[0].count)
      }
    } catch (dbError) {
      health.database.status = 'error'
      health.database.error = dbError instanceof Error ? dbError.message : 'DB failed'
    }

    // Statut global
    const overallStatus = health.database.connected ? 'healthy' : 'degraded'
    
    return NextResponse.json(
      { ...health, status: overallStatus },
      { 
        status: health.database.connected ? 200 : 503,
        headers: { 'Cache-Control': 'no-cache' }
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Health check failed'
      },
      { status: 503 }
    )
  }
}