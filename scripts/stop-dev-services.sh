#!/bin/bash

# Script d'arrêt des services de développement

echo "🛑 Arrêt des services de développement..."

# Arrêter et supprimer les conteneurs
docker stop agrilien-postgres agrilien-redis agrilien-pgadmin 2>/dev/null || true
docker rm agrilien-postgres agrilien-redis agrilien-pgadmin 2>/dev/null || true

echo "✅ Services arrêtés"

# Optionnel: supprimer le réseau
# docker network rm agrilien-network 2>/dev/null || true

# Optionnel: supprimer les volumes (ATTENTION: efface les données)
if [ "$1" = "--clean" ]; then
  echo "🗑️ Suppression des volumes de données..."
  docker volume rm postgres_data redis_data pgadmin_data 2>/dev/null || true
  echo "✅ Volumes supprimés"
fi