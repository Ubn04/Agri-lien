import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Vérifications basiques de santé de l'application
    const healthCheck = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
    };

    return NextResponse.json(healthCheck, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'ERROR', 
        timestamp: new Date().toISOString(),
        error: 'Health check failed' 
      },
      { status: 500 }
    );
  }
}