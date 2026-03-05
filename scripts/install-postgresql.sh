#!/bin/bash

# Installation et configuration PostgreSQL local

echo "🐘 Installation de PostgreSQL local..."

# Installation PostgreSQL
sudo apt update
sudo apt install -y postgresql postgresql-contrib

# Démarrer le service PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

echo "✅ PostgreSQL installé!"

# Configuration de base
echo "🔧 Configuration de PostgreSQL..."

# Créer l'utilisateur et la base de données
sudo -u postgres psql -c "CREATE USER agrilien WITH PASSWORD 'postgres123';"
sudo -u postgres psql -c "CREATE DATABASE agrilien OWNER agrilien;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE agrilien TO agrilien;"

# Optionnel: Créer un superutilisateur avec le nom de l'utilisateur courant
sudo -u postgres createuser --superuser $USER 2>/dev/null || true
sudo -u postgres createdb $USER 2>/dev/null || true

echo "✅ Base de données 'agrilien' créée!"

# Vérifier la connexion
echo "🧪 Test de connexion..."
if sudo -u postgres psql -d agrilien -c "SELECT version();" > /dev/null 2>&1; then
    echo "✅ Connexion PostgreSQL réussie!"
else
    echo "❌ Problème de connexion PostgreSQL"
fi

echo ""
echo "📋 Informations de connexion:"
echo "Host: localhost"
echo "Port: 5432"
echo "Database: agrilien"
echo "User: agrilien"
echo "Password: postgres123"
echo ""
echo "🔧 Variables d'environnement pour .env:"
echo "DB_HOST=localhost"
echo "DB_PORT=5432"
echo "DB_NAME=agrilien"
echo "DB_USER=agrilien"
echo "DB_PASSWORD=postgres123"
echo ""
echo "🧪 Test manuel:"
echo "psql -h localhost -U agrilien -d agrilien"