#!/bin/bash

# Script automatique de push vers GitHub
# Usage: ./push-to-github.sh

echo "🚀 Script de push automatique vers GitHub..."
echo "Repository: https://github.com/Ubn04/agri-lien.git"
echo ""

# Test de connectivité
echo "🌐 Test de connectivité GitHub..."
if ping -c 1 github.com > /dev/null 2>&1; then
    echo "✅ Connexion GitHub OK"
else
    echo "❌ Problème de connexion GitHub"
    echo "Vérifiez votre connexion internet et réessayez"
    exit 1
fi

# Configuration Git optimisée pour connexions lentes
echo "⚙️ Configuration Git pour connexions lentes..."
git config http.postBuffer 524288000
git config http.lowSpeedLimit 1000
git config http.lowSpeedTime 600

# Vérification du statut Git
echo "📊 Status Git actuel:"
git status --short

# Vérification du remote
echo "🔗 Remote configuré:"
git remote -v

# Tentative de push avec retry
echo ""
echo "📤 Tentative de push vers GitHub..."

MAX_RETRIES=3
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    echo "Tentative $(($RETRY_COUNT + 1))/$MAX_RETRIES..."
    
    if git push -u origin main --verbose; then
        echo ""
        echo "🎉 Push réussi ! Votre code est maintenant sur GitHub !"
        echo "🌐 Votre repository: https://github.com/Ubn04/agri-lien"
        echo ""
        echo "🚀 Prochaines étapes pour Render:"
        echo "1. Aller sur render.com"
        echo "2. New → Web Service"
        echo "3. Connecter ce repository GitHub"
        echo "4. Sélectionner 'Docker' comme environnement"
        echo "5. Configurer les variables d'environnement"
        echo ""
        exit 0
    elif git pull origin main --allow-unrelated-histories && git push -u origin main; then
        echo ""
        echo "🎉 Push réussi après merge ! Votre code est maintenant sur GitHub !"
        echo "🌐 Votre repository: https://github.com/Ubn04/agri-lien"
        exit 0
    else
        RETRY_COUNT=$(($RETRY_COUNT + 1))
        if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
            echo "⏳ Échec - retry dans 10 secondes..."
            sleep 10
        fi
    fi
done

echo ""
echo "❌ Échec après $MAX_RETRIES tentatives"
echo ""
echo "🔧 Solutions alternatives:"
echo "1. Vérifier votre connexion internet"
echo "2. Essayer plus tard quand la connexion sera stable"
echo "3. Utiliser GitHub Desktop ou une autre interface Git"
echo "4. Push manuel avec: git push -u origin main"
echo ""
echo "📋 Commandes manuelles à essayer:"
echo "git remote -v"
echo "git status"
echo "git push -u origin main"