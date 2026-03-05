import type { Config } from 'tailwindcss'

const config: Config = {
  APP_NAME: 'Agri-Lien',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  WS_URL: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001',
}

export default config
