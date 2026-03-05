# 🚀 Guide de Démarrage Rapide - PostgreSQL

## ⚡ Option 1: Démarrage avec Docker (Recommandé)

### Si vous avez Docker Compose:

```bash
# Démarrer les services
npm run docker:db
```

### Si vous n'avez que Docker:

```bash
# Démarrer avec nos scripts personnalisés
npm run services:start
```

## 📋 Option 2: PostgreSQL Local

### Installation PostgreSQL Ubuntu/Debian:

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo -u postgres createuser --interactive
sudo -u postgres createdb agrilien
```

### Installation PostgreSQL macOS:

```bash
brew install postgresql
brew services start postgresql
createdb agrilien
```

## 🔧 Configuration

1. **Copier le fichier d'environnement:**

```bash
cp .env.example .env
```

2. **Modifier .env selon votre installation:**

```bash
# Pour Docker
DB_HOST=localhost
DB_PORT=5432
DB_NAME=agrilien
DB_USER=postgres
DB_PASSWORD=postgres123

# Pour PostgreSQL local (ajustez selon votre config)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=agrilien
DB_USER=votre_user
DB_PASSWORD=votre_password
```

## 🗄️ Migration de la Base de Données

### 1. Exécuter les migrations:

```bash
npm run db:migrate
```

### 2. Migrer les données mock:

```bash
npm run migrate-data
```

### 3. Vérifier:

```bash
npm run db:health
```

## 🛠️ Commandes Disponibles

### Services Docker:

```bash
npm run services:start    # Démarrer PostgreSQL + Redis + pgAdmin
npm run services:stop     # Arrêter les services
npm run services:clean    # Arrêter et nettoyer les volumes
```

### Base de données:

```bash
npm run db:migrate        # Migrations
npm run db:status         # Statut
npm run db:health         # Santé
npm run migrate-data      # Migrer données mock
```

### Sauvegarde:

```bash
npm run backup:create     # Créer sauvegarde
npm run backup:list       # Lister sauvegardes
```

## 🌐 Accès aux Outils

- **pgAdmin:** http://localhost:5050
  - Email: `admin@agrilien.bj`
  - Password: `admin123`

- **PostgreSQL direct:**

```bash
# Via Docker:
docker exec -it agrilien-postgres psql -U postgres -d agrilien

# Local:
psql -h localhost -U postgres -d agrilien
```

## 🚨 Dépannage

### Erreur "docker-compose: not found"

```bash
# Installer Docker Compose:
sudo apt install docker-compose-plugin

# Ou utiliser nos scripts:
npm run services:start
```

### Erreur TypeScript dans les scripts

Les scripts ont été corrigés pour fonctionner avec la configuration TypeScript + CommonJS.

### PostgreSQL refuse la connexion

```bash
# Vérifier que le service fonctionne:
npm run services:start

# Ou vérifier les logs:
docker logs agrilien-postgres
```

## ✅ Test rapide

Une fois tout configuré:

```bash
# 1. Démarrer les services
npm run services:start

# 2. Attendre quelques secondes puis migrer
npm run db:migrate

# 3. Migrer les données
npm run migrate-data

# 4. Vérifier
npm run db:health

# 5. Démarrer l'application
npm run dev
```

Votre plateforme Agri-Lien est maintenant prête avec PostgreSQL ! 🎉
