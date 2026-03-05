#!/bin/bash

# Script de préparation pour déploiement Render

echo "🚀 Préparation pour déploiement Render..."

# 1. Vérifier les fichiers requis
echo "📋 Vérification des fichiers..."

required_files=(
  "package.json"
  "render.yaml" 
  "app/api/health/route.ts"
  ".env.example"
)

for file in "${required_files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "❌ Fichier manquant: $file"
    exit 1
  else
    echo "✅ $file"
  fi
done

# 2. Test du build local
echo "🔨 Test du build local..."
if npm run build; then
  echo "✅ Build réussi"
else
  echo "❌ Erreur de build"
  exit 1
fi

# 3. Vérifier l'endpoint de santé
echo "🩺 Test endpoint santé..."
if npm run dev &
then
  # Attendre que le serveur démarre
  sleep 10
  
  # Tester l'endpoint
  if curl -s http://localhost:3000/api/health > /dev/null; then
    echo "✅ Endpoint santé accessible"
  else
    echo "⚠️ Endpoint santé non accessible (normal si DB non connectée)"
  fi
  
  # Arrêter le serveur
  pkill -f "next dev" 2>/dev/null || true
fi

# 4. Vérifier les variables d'environnement
echo "🔧 Variables d'environnement requises pour Render:"
echo "   - JWT_SECRET (généré auto)"
echo "   - REFRESH_TOKEN_SECRET (généré auto)"
echo "   - MOMO_API_KEY (à configurer)"
echo "   - MOMO_API_SECRET (à configurer)"
echo "   - SMTP_* (optionnel)"

# 5. Optimisations
echo "⚡ Optimisations pour Render..."

# Nettoyer node_modules si présent
if [[ -d "node_modules" ]]; then
  echo "🧹 Nettoyage node_modules..."
  rm -rf node_modules
fi

# Vérifier taille du projet
project_size=$(du -sh . | cut -f1)
echo "📊 Taille du projet: $project_size"

if [[ $(du -s . | cut -f1) -gt 500000 ]]; then
  echo "⚠️ Projet volumineux (>500MB). Considérez .gitignore"
fi

# 6. Vérifications Git
echo "📝 Préparation Git..."

# Vérifier si c'est un repo git
if [[ ! -d ".git" ]]; then
  echo "❌ Pas de repository Git. Initialisez avec:"
  echo "   git init"
  echo "   git add ."
  echo "   git commit -m 'Initial commit'"
  echo "   git branch -M main"
  exit 1
fi

# Vérifier les changements non commités
if [[ -n $(git status --porcelain) ]]; then
  echo "⚠️ Changements non commités détectés:"
  git status --short
  echo ""
  echo "💡 Commitez avant de déployer:"
  echo "   git add ."
  echo "   git commit -m 'Prêt pour deploy Render'"
  echo "   git push origin main"
fi

echo ""
echo "✅ Préparation terminée!"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Push sur GitHub: git push origin main"
echo "2. Allez sur render.com"
echo "3. New + → Blueprint" 
echo "4. Sélectionnez votre repo"
echo "5. Render détectera render.yaml automatiquement"
echo "6. Configurez les secrets MOMO_* dans l'interface"
echo ""
echo "🌐 Votre app sera disponible à: https://agri-lien-xxx.onrender.com"