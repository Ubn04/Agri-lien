# Déploiement Agri-Lien

## Prérequis

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn
- Git

## Déploiement Local

### 1. Cloner le repository

```bash
git clone https://github.com/your-username/agri-lien.git
cd agri-lien
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration des variables d'environnement

```bash
cp .env.example .env.local
```

Éditer `.env.local` avec vos configurations.

### 4. Configuration de la base de données

```bash
# Créer la base de données
createdb agrilien

# Appliquer le schéma
psql agrilien < database/schema.sql

# Ou utiliser Prisma
npx prisma migrate dev
```

### 5. Peupler la base de données (optionnel)

```bash
npm run seed
```

### 6. Lancer le serveur de développement

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

## Déploiement sur Vercel

### 1. Préparer le projet

Assurez-vous que votre code est sur GitHub.

### 2. Importer sur Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer sur "Import Project"
3. Sélectionner votre repository GitHub
4. Configurer les variables d'environnement
5. Déployer

### 3. Configurer la base de données

Utiliser un service PostgreSQL hébergé comme:
- Supabase
- Railway
- Neon
- AWS RDS

### 4. Variables d'environnement sur Vercel

Ajouter toutes les variables de `.env.example` dans les paramètres du projet Vercel.

## Déploiement sur Railway

### 1. Installer Railway CLI

```bash
npm install -g @railway/cli
```

### 2. Login

```bash
railway login
```

### 3. Initialiser

```bash
railway init
```

### 4. Ajouter PostgreSQL

```bash
railway add postgresql
```

### 5. Déployer

```bash
railway up
```

## Déploiement sur DigitalOcean

### 1. Créer un Droplet

- Ubuntu 22.04
- Au moins 2GB RAM
- Node.js pré-installé

### 2. SSH dans le Droplet

```bash
ssh root@your-droplet-ip
```

### 3. Installer les dépendances

```bash
apt update
apt install -y nodejs npm postgresql nginx
```

### 4. Cloner et configurer

```bash
git clone https://github.com/your-username/agri-lien.git
cd agri-lien
npm install
npm run build
```

### 5. Configurer Nginx

```nginx
server {
    listen 80;
    server_name agrilien.bj;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 6. Configurer PM2

```bash
npm install -g pm2
pm2 start npm --name "agri-lien" -- start
pm2 startup
pm2 save
```

### 7. SSL avec Let's Encrypt

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d agrilien.bj
```

## Configuration DNS

Pointer votre domaine vers votre serveur:

```
A Record: @ -> [IP du serveur]
A Record: www -> [IP du serveur]
```

## Monitoring

### Logs

```bash
# Vercel
vercel logs

# Railway
railway logs

# DigitalOcean (PM2)
pm2 logs agri-lien
```

### Performance

Configurer Google Analytics et Sentry pour le monitoring.

## Backup

### Base de données

```bash
# Backup
pg_dump agrilien > backup.sql

# Restore
psql agrilien < backup.sql
```

### Automatiser les backups

```bash
# Crontab
0 2 * * * pg_dump agrilien > /backups/agrilien-$(date +\%Y\%m\%d).sql
```

## Sécurité

- Activer HTTPS
- Configurer les CORS
- Rate limiting
- Firewall (UFW sur Ubuntu)
- Mettre à jour régulièrement

## Rollback

### Vercel

```bash
vercel rollback [deployment-url]
```

### Railway

Utiliser l'interface web pour revenir à un déploiement précédent.

### DigitalOcean

```bash
git checkout previous-commit
npm run build
pm2 restart agri-lien
```

## Troubleshooting

### Problème de build

```bash
rm -rf node_modules .next
npm install
npm run build
```

### Problème de base de données

Vérifier les connexions et les credentials.

### Performance lente

- Vérifier les logs
- Optimiser les requêtes
- Ajouter du caching
- Scaler le serveur

## Support

Pour toute question, contactez: support@agrilien.bj
