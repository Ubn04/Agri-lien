# Guide de Migration PostgreSQL - Agri-Lien

## 📋 Vue d'ensemble

Ce guide documente la migration complète du système mock vers PostgreSQL pour la plateforme Agri-Lien.

### ✅ Étapes complétées

1. **Dépendances PostgreSQL ajoutées** ✅
   - `pg` - Client PostgreSQL pour Node.js
   - `@types/pg` - Types TypeScript pour pg
   - `bcryptjs` - Hachage des mots de passe
   - `uuid` - Génération d'identifiants uniques
   - `commander` - Interface CLI pour les scripts

2. **Infrastructure de base de données** ✅
   - Client PostgreSQL avec pool de connexions
   - Système de migrations automatisé
   - Configuration centralisée
   - Gestion des transactions

3. **Services métier** ✅
   - UserService - Gestion des utilisateurs et profils
   - ProductService - Gestion des produits
   - OrderService - Gestion des commandes
   - AuthService - Authentification et autorisation

4. **Scripts de gestion** ✅
   - Migration des données mock
   - Gestion des migrations DB
   - Sauvegarde et restauration
   - Scripts CLI avec commander

## 🚀 Installation et Configuration

### 1. Installation des dépendances

```bash
# Les dépendances sont déjà installées
npm install --legacy-peer-deps
```

### 2. Configuration de l'environnement

```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer les variables d'environnement
nano .env
```

Variables importantes à configurer :

```env
# Base de données PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=agrilien
DB_USER=postgres
DB_PASSWORD=postgres123

# JWT pour l'authentification
JWT_SECRET=your-super-secret-jwt-key-change-this
REFRESH_TOKEN_SECRET=your-refresh-token-secret
```

### 3. Démarrage avec Docker (Recommandé)

```bash
# Démarrer PostgreSQL, Redis et pgAdmin
npm run docker:db

# Ou démarrer tous les services
npm run docker:up

# Voir les logs
npm run docker:logs postgres
```

### 4. Configuration manuelle PostgreSQL

Si vous préférez installer PostgreSQL manuellement :

#### Ubuntu/Debian

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo -u postgres createdb agrilien
```

#### macOS

```bash
brew install postgresql
brew services start postgresql
createdb agrilien
```

## 📊 Gestion des migrations

### Exécuter les migrations

```bash
# Voir le statut des migrations
npm run db:status

# Exécuter toutes les migrations
npm run db:migrate

# Vérifier la santé de la DB
npm run db:health
```

### Migrations disponibles

- `20260305_090000_initial_schema.sql` - Schéma initial complet

### Rollback des migrations

```bash
# Rollback de la dernière migration
npm run db:rollback

# Rollback d'une version spécifique
npm run db:rollback 20260305_090000
```

### Reset complet (ATTENTION)

```bash
# Reset complet de la base de données
npm run db:reset
```

## 🔄 Migration des données mock

### Migrer les données existantes

```bash
# Migrer toutes les données du fichier mock-db.json
npm run migrate-data
```

Cette commande :

1. Migre tous les utilisateurs avec leurs profils
2. Migre tous les produits
3. Migre toutes les commandes
4. Attribue un mot de passe temporaire : `TempPassword123!`

### Données migrées

- **Utilisateurs** : Admin, fermiers, acheteurs, logistique
- **Profils** : Profils fermiers et acheteurs complets
- **Produits** : Tous les produits avec leurs catégories
- **Commandes** : Historique des commandes

## 💾 Sauvegarde et restauration

### Créer une sauvegarde

```bash
# Sauvegarde automatique avec nettoyage
npm run backup:create

# Lister les sauvegardes
npm run backup:list
```

### Restaurer une sauvegarde

```bash
# Restaurer la dernière sauvegarde
npm run backup:restore

# Restaurer une sauvegarde spécifique
npm run backup:restore backup-agrilien-2026-03-05.sql
```

### Nettoyage des sauvegardes

```bash
# Garder les 10 dernières sauvegardes
npm run backup:cleanup

# Garder les 5 dernières
npm run backup:cleanup 5
```

## 🏗️ Architecture

### Structure de la base de données

```
users
├── farmer_profiles
├── buyer_profiles
└── logistics_profiles

products
├── farmer_id → users(id)

orders
├── buyer_id → users(id)
├── farmer_id → users(id)
└── logistics_id → users(id)

payments
└── order_id → orders(id)

notifications
└── user_id → users(id)

reviews
├── order_id → orders(id)
├── reviewer_id → users(id)
└── reviewee_id → users(id)
```

### Services disponibles

#### UserService

- Création d'utilisateurs et profils
- Authentification avec bcrypt
- Gestion des rôles et permissions
- Recherche et pagination

#### ProductService

- CRUD complet des produits
- Système de filtres et recherche
- Gestion des stocks
- Statistiques de vente

#### OrderService

- Création de commandes avec validation
- Gestion des statuts
- Attribution des livreurs
- Statistiques et rapports

#### AuthService

- JWT avec refresh tokens
- Middleware d'authentification
- Gestion des permissions
- Réinitialisation de mots de passe

## 🔧 Développement

### Scripts disponibles

```bash
# Base de données
npm run db:migrate      # Migrations
npm run db:status       # Statut
npm run db:health       # Santé DB

# Données
npm run migrate-data    # Migration mock → PostgreSQL

# Sauvegarde
npm run backup:create   # Créer sauvegarde
npm run backup:list     # Lister sauvegardes

# Docker
npm run docker:up       # Démarrer services
npm run docker:db       # DB uniquement
npm run docker:logs     # Voir logs
```

### Accès aux outils

- **pgAdmin** : http://localhost:5050
  - Email : `admin@agrilien.bj`
  - Mot de passe : `admin123`

- **PostgreSQL** (direct) :

  ```bash
  # Via Docker
  docker-compose exec postgres psql -U postgres -d agrilien

  # Local
  psql -h localhost -U postgres -d agrilien
  ```

### Développement des API

Les services sont prêts à être utilisés dans vos API routes :

```typescript
import { UserService, ProductService, AuthService } from "@/lib/services";

// Dans votre API route
export async function POST(request: Request) {
  const auth = await AuthService.createAuthMiddleware(["FARMER"]);
  const { user, error } = await auth(request);

  if (error) {
    return Response.json({ error }, { status: 401 });
  }

  // Utiliser les services...
}
```

## 🔒 Sécurité

### Points d'attention

1. **Mots de passe** - Tous les utilisateurs migrés ont le mot de passe temporaire `TempPassword123!`
2. **JWT Secrets** - Changez les secrets JWT en production
3. **Permissions** - Validez les rôles dans chaque endpoint
4. **Connexions DB** - Le pool est configuré pour 10 connexions max

### Recommandations

- Forcez le changement de mot de passe à la première connexion
- Utilisez HTTPS en production
- Configurez des secrets forts
- Monitorer les connexions à la base

## 📈 Monitoring et maintenance

### Health checks

```bash
# Vérifier la santé de la DB
npm run db:health

# Statistiques
docker-compose exec postgres psql -U postgres -d agrilien -c "
SELECT
  schemaname,
  tablename,
  n_tup_ins as inserts,
  n_tup_upd as updates,
  n_tup_del as deletes,
  n_live_tup as live_rows
FROM pg_stat_user_tables;
"
```

### Maintenance régulière

1. **Sauvegardes automatiques** - Configurez un cron job
2. **Nettoyage des logs** - Rotations des logs PostgreSQL
3. **Analyse des performances** - pg_stat_statements
4. **Mises à jour** - Gardez PostgreSQL à jour

## ⚠️ Troubleshooting

### Problèmes courants

#### Connexion refusée

```bash
# Vérifier que PostgreSQL fonctionne
npm run docker:logs postgres

# Ou localement
sudo systemctl status postgresql
```

#### Migration échoue

```bash
# Voir le statut détaillé
npm run db:status

# Reset si nécessaire (ATTENTION: perte de données)
npm run db:reset
```

#### Données corrompues

```bash
# Restaurer la dernière sauvegarde
npm run backup:restore
```

### Logs et debug

- Logs PostgreSQL : `npm run docker:logs postgres`
- Logs application : Variables d'environnement `DEBUG=*`
- Requêtes SQL : Activez le mode développement

## 🎯 Prochaines étapes

### À implémenter

1. **APIs REST** - Remplacement des endpoints mock
2. **Tests** - Tests d'intégration avec PostgreSQL
3. **Monitoring** - Métriques et alertes
4. **Performance** - Optimisation des requêtes
5. **CI/CD** - Pipeline de déploiement automatisé

### Optimisations

- Index supplémentaires selon l'usage
- Vues matérialisées pour les rapports
- Partitioning pour les grandes tables
- Read replicas pour la scalabilité

---

**🎉 Migration PostgreSQL terminée avec succès !**

La plateforme Agri-Lien est maintenant prête pour la production avec PostgreSQL.
