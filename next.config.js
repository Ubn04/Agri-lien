/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  experimental: {
    skipTrailingSlashRedirect: true,
    skipMiddlewareUrlNormalize: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Configuration webpack pour ignorer les modules optionnels
  webpack: (config, { isServer }) => {
    // Ignorer les modules optionnels de PostgreSQL
    config.externals = config.externals || []
    config.externals.push({
      'pg-native': 'pg-native',
      'cpu-features': 'cpu-features',
    })
    
    if (isServer) {
      config.ignoreWarnings = [
        { module: /node_modules\/pg/ },
        { file: /node_modules\/pg/ },
      ]
    }
    
    return config
  },
  
  images: {
    domains: [
      'localhost', 
      'images.unsplash.com',
      // Ajouter les domaines Render
      'onrender.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.onrender.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
  },
  // Configuration pour Render
  output: 'standalone',
}

module.exports = nextConfig
