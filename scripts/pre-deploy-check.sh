#!/bin/bash

# Script de vérification pré-déploiement
echo "🔍 Vérification pré-déploiement pour Render..."

# Vérifier que les fichiers essentiels existent
echo "📁 Vérification des fichiers essentiels..."

required_files=(
    "package.json"
    "next.config.js"
    "app/page.tsx"
    "app/api/health/route.ts"
    ".env.example"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file - OK"
    else
        echo "❌ $file - MANQUANT"
        exit 1
    fi
done

# Vérifier la syntaxe du package.json
echo "📦 Vérification du package.json..."
if node -e "require('./package.json')" 2>/dev/null; then
    echo "✅ package.json - Syntaxe OK"
else
    echo "❌ package.json - Erreur de syntaxe"
    exit 1
fi

# Vérifier les scripts essentiels dans package.json
echo "🔧 Vérification des scripts npm..."
required_scripts=("build" "start")

for script in "${required_scripts[@]}"; do
    if npm run-script "$script" --silent 2>/dev/null | grep -q "Missing script"; then
        echo "❌ Script npm '$script' manquant"
        exit 1
    else
        echo "✅ Script npm '$script' - OK"
    fi
done

# Test de build local (optionnel, peut être long)
if [ "$1" = "--test-build" ]; then
    echo "🔨 Test de build local..."
    if npm run build; then
        echo "✅ Build local - OK"
    else
        echo "❌ Build local - ÉCHEC"
        exit 1
    fi
fi

# Vérifier la structure des dossiers Next.js
echo "📂 Vérification de la structure Next.js..."
if [ -d "app" ]; then
    echo "✅ Dossier app/ - OK (App Router)"
elif [ -d "pages" ]; then
    echo "✅ Dossier pages/ - OK (Pages Router)"
else
    echo "❌ Structure Next.js invalide"
    exit 1
fi

# Vérifications de sécurité
echo "🔐 Vérifications de sécurité..."

# Vérifier qu'aucun .env avec de vraies clés n'est présent
if [ -f ".env" ] || [ -f ".env.local" ]; then
    echo "⚠️  Fichier .env détecté - Assurez-vous qu'il ne contient pas de vraies clés de production"
fi

# Vérifier le .gitignore
if grep -q ".env" .gitignore 2>/dev/null; then
    echo "✅ .gitignore protège les fichiers .env"
else
    echo "⚠️  Ajoutez .env* au .gitignore pour la sécurité"
fi

echo ""
echo "🎉 Vérifications terminées !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Pusher le code sur votre repository Git"
echo "2. Créer un service web sur Render"
echo "3. Configurer les variables d'environnement"
echo "4. Créer une base de données PostgreSQL sur Render"
echo "5. Déployer !"
echo ""
echo "📖 Consultez DEPLOYMENT_GUIDE.md pour les instructions détaillées."