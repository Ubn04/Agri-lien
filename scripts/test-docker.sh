#!/bin/bash

# Script de test Docker local pour Agri-Lien
echo "🐳 Test de construction Docker..."

# Variables
IMAGE_NAME="agri-lien"
CONTAINER_NAME="agri-lien-test"

# Nettoyer les containers existants
echo "🧹 Nettoyage des containers existants..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# Build de l'image
echo "🔨 Construction de l'image Docker..."
docker build -t $IMAGE_NAME . --platform linux/amd64

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build Docker"
    exit 1
fi

echo "✅ Image construite avec succès!"
echo "📊 Taille de l'image:"
docker images $IMAGE_NAME

# Test de lancement
echo ""
echo "🚀 Test de lancement du container..."
docker run -d \
  --name $CONTAINER_NAME \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e JWT_SECRET=test-secret-key-32-characters-long \
  -e NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:3000/api \
  $IMAGE_NAME

if [ $? -eq 0 ]; then
    echo "✅ Container démarré avec succès!"
    echo ""
    echo "🌐 Application accessible sur: http://localhost:3000"
    echo ""
    echo "📋 Commandes utiles:"
    echo "  docker logs $CONTAINER_NAME -f  # Voir les logs"
    echo "  docker stop $CONTAINER_NAME     # Arrêter"
    echo "  docker rm $CONTAINER_NAME       # Supprimer"
    echo ""
    
    # Attendre que l'app démarre
    echo "⏳ Attente du démarrage de l'application..."
    sleep 5
    
    # Test de santé
    if curl -f http://localhost:3000/api/health -s > /dev/null 2>&1; then
        echo "✅ Health check réussi! L'application fonctionne."
    else
        echo "⚠️ Health check échoué. Vérifiez les logs:"
        echo "  docker logs $CONTAINER_NAME"
    fi
    
else
    echo "❌ Erreur lors du démarrage du container"
    exit 1
fi