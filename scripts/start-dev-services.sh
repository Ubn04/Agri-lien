#!/bin/bash

# Script de démarrage PostgreSQL sans Docker Compose
# Alternative utilisant docker directement

set -e

# Configuration
POSTGRES_DB="agrilien"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres123"
POSTGRES_PORT="5432"
REDIS_PORT="6379"
PGADMIN_PORT="5050"

# Créer un réseau Docker si nécessaire
docker network create agrilien-network 2>/dev/null || true

echo "🚀 Démarrage des services de développement..."

# Démarrer PostgreSQL
echo "📦 Démarrage de PostgreSQL..."
docker run -d \
  --name agrilien-postgres \
  --network agrilien-network \
  -e POSTGRES_DB=$POSTGRES_DB \
  -e POSTGRES_USER=$POSTGRES_USER \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  -e POSTGRES_HOST_AUTH_METHOD=trust \
  -p $POSTGRES_PORT:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:15-alpine || echo "⚠️ PostgreSQL déjà en cours d'exécution"

# Démarrer Redis
echo "📦 Démarrage de Redis..."
docker run -d \
  --name agrilien-redis \
  --network agrilien-network \
  -p $REDIS_PORT:6379 \
  -v redis_data:/data \
  redis:7-alpine || echo "⚠️ Redis déjà en cours d'exécution"

# Démarrer pgAdmin
echo "📦 Démarrage de pgAdmin..."
docker run -d \
  --name agrilien-pgadmin \
  --network agrilien-network \
  -e PGADMIN_DEFAULT_EMAIL=admin@agrilien.bj \
  -e PGADMIN_DEFAULT_PASSWORD=admin123 \
  -e PGADMIN_CONFIG_SERVER_MODE=False \
  -p $PGADMIN_PORT:80 \
  -v pgadmin_data:/var/lib/pgadmin \
  dpage/pgadmin4:latest || echo "⚠️ pgAdmin déjà en cours d'exécution"

echo "⏳ Attente du démarrage de PostgreSQL..."
sleep 10

# Vérifier que PostgreSQL est prêt
until docker exec agrilien-postgres pg_isready -U $POSTGRES_USER > /dev/null 2>&1; do
  echo "⏳ En attente de PostgreSQL..."
  sleep 2
done

echo "✅ Services démarrés avec succès!"
echo ""
echo "📊 Services disponibles:"
echo "  🐘 PostgreSQL: localhost:$POSTGRES_PORT"
echo "  🔴 Redis: localhost:$REDIS_PORT"
echo "  🌐 pgAdmin: http://localhost:$PGADMIN_PORT"
echo "     Email: admin@agrilien.bj"
echo "     Mot de passe: admin123"
echo ""
echo "🔧 Variables d'environnement à utiliser:"
echo "  DB_HOST=localhost"
echo "  DB_PORT=$POSTGRES_PORT"
echo "  DB_NAME=$POSTGRES_DB"
echo "  DB_USER=$POSTGRES_USER"
echo "  DB_PASSWORD=$POSTGRES_PASSWORD"