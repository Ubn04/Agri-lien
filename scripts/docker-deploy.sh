#!/bin/bash

# Script de build et déploiement Docker pour Render
# Usage: ./scripts/docker-deploy.sh

echo "🐳 Préparation du déploiement Docker pour Render..."

# Vérifications préalables
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé. Exécutez ce script depuis la racine du projet."
    exit 1
fi

if [ ! -f "Dockerfile" ]; then
    echo "❌ Erreur: Dockerfile non trouvé."
    exit 1
fi

# Variables
PROJECT_NAME="agri-lien"
DOCKER_TAG="${PROJECT_NAME}:latest"

echo "📦 Construction de l'image Docker..."

# Build de l'image Docker
docker build \
    --tag $DOCKER_TAG \
    --build-arg NODE_ENV=production \
    --platform linux/amd64 \
    .

if [ $? -eq 0 ]; then
    echo "✅ Image Docker construite avec succès: $DOCKER_TAG"
else
    echo "❌ Erreur lors de la construction de l'image Docker"
    exit 1
fi

# Test local de l'image (optionnel)
echo ""
echo "🧪 Test local de l'image Docker..."
echo "Pour tester localement:"
echo ""
echo "docker run -p 3000:3000 \\"
echo "  -e NODE_ENV=production \\"
echo "  -e DATABASE_URL=your_database_url \\"
echo "  -e JWT_SECRET=your_jwt_secret \\"
echo "  $DOCKER_TAG"
echo ""

# Informations pour Render
echo "🚀 Instructions pour Render:"
echo ""
echo "1. Connecter votre repository Git à Render"
echo "2. Créer un nouveau Web Service"
echo "3. Sélectionner 'Docker' comme environnement"
echo "4. Render détectera automatiquement le Dockerfile"
echo "5. Configurer les variables d'environnement:"
echo "   - NODE_ENV=production"
echo "   - DATABASE_URL=[URL PostgreSQL Render]"
echo "   - JWT_SECRET=[Clé secrète sécurisée]"
echo ""
echo "📋 Variables d'environnement essentielles:"
cat << 'EOF'
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:port/db
JWT_SECRET=votre-cle-secrete-32-caracteres-minimum
NEXT_PUBLIC_APP_URL=https://votre-app.onrender.com
NEXT_PUBLIC_API_URL=https://votre-app.onrender.com/api
EOF

echo ""
echo "🎉 Préparation terminée ! Votre application est prête pour Render."