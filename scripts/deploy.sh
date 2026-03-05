#!/bin/bash

# Script de déploiement pour Render
# Ce script sera exécuté automatiquement lors du déploiement

echo "🚀 Début du déploiement Agri-Lien sur Render..."

# Vérifier que nous sommes en environnement de production
if [ "$NODE_ENV" != "production" ]; then
    echo "⚠️  NODE_ENV n'est pas défini sur 'production'"
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm ci

# Construire l'application
echo "🔨 Construction de l'application Next.js..."
npm run build

# Vérifier que le build s'est bien passé
if [ $? -eq 0 ]; then
    echo "✅ Build réussi !"
else
    echo "❌ Erreur lors du build"
    exit 1
fi

echo "🎉 Déploiement terminé avec succès !"

# Afficher des informations utiles
echo "📊 Informations de déploiement :"
echo "- Node.js version: $(node --version)"
echo "- NPM version: $(npm --version)"
echo "- Environment: $NODE_ENV"
echo "- Timestamp: $(date)"