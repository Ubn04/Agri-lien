# 🐳 Guide Docker - Déploiement Agri-Lien sur Render

## 📦 Déploiement avec Docker sur Render

### 🚀 Étapes rapides

1. **Pusher votre code vers Git** (GitHub/GitLab)

   ```bash
   git add .
   git commit -m "Ajout configuration Docker pour Render"
   git push origin main
   ```

2. **Créer un Web Service sur Render**
   - Aller sur [render.com](https://render.com)
   - New → Web Service
   - Connecter votre repository
   - Sélectionner **Docker** comme environnement
   
3. **Configuration automatique**
   - Render détecte automatiquement votre `Dockerfile`
   - Pas besoin de build/start commands

4. **Variables d'environnement essentielles**
   ```env
   NODE_ENV=production
   DATABASE_URL=postgresql://[render-postgres-url]
   JWT_SECRET=votre-cle-secrete-32-caracteres-minimum
   NEXT_PUBLIC_APP_URL=https://votre-app.onrender.com
   NEXT_PUBLIC_API_URL=https://votre-app.onrender.com/api
   ```

## 🗄️ Base de données PostgreSQL

### Option 1: PostgreSQL Render (Recommandé)

1. Créer une base PostgreSQL sur Render
2. Copier l'**External Database URL**
3. L'ajouter comme `DATABASE_URL` dans votre Web Service

### Option 2: PostgreSQL externe

Utiliser une base de données externe (AWS RDS, Railway, etc.)

## 🧪 Test local avec Docker

### Build et run local

```bash
# Construire l'image
docker build -t agri-lien .

# Lancer avec variables d'environnement
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=postgresql://user:pass@host:port/db \
  -e JWT_SECRET=your-secret-key \
  agri-lien
```

### Développement avec Docker Compose

```bash
# Lancer PostgreSQL + App
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down
```

## ⚙️ Configuration Docker optimisée

### Dockerfile multi-stage

- **Stage 1**: Build des dépendances et de l'app
- **Stage 2**: Image de production minimale
- **Sécurité**: Utilisateur non-root
- **Performance**: Image Alpine Linux

### Variables d'environnement

#### Essentielles pour la production:

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=cle-secrete-32-caracteres-minimum
REFRESH_TOKEN_SECRET=autre-cle-secrete-32-caracteres
```

#### URLs publiques:

```env
NEXT_PUBLIC_APP_URL=https://votre-app.onrender.com
NEXT_PUBLIC_API_URL=https://votre-app.onrender.com/api
NEXT_PUBLIC_WS_URL=wss://votre-app.onrender.com
```

#### Services externes (optionnels):

```env
# Mobile Money
MOMO_API_KEY=your-momo-key
MOMO_API_SECRET=your-momo-secret
MOMO_CALLBACK_URL=https://votre-app.onrender.com/api/payments/callback

# Email SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@agrilien.bj

# Stockage (AWS S3)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
AWS_BUCKET=agrilien-uploads
```

## 🚨 Points importants

### Sécurité

- ✅ Image Alpine (plus sécurisée)
- ✅ Utilisateur non-root
- ✅ Variables d'environnement sécurisées
- ✅ Pas de secrets dans le code

### Performance

- ✅ Build multi-stage (image plus petite)
- ✅ Cache Docker optimisé
- ✅ Next.js standalone output
- ✅ PostgreSQL avec pool de connexions

### Monitoring

- ✅ Health check endpoint `/api/health`
- ✅ Logs structurés
- ✅ Métriques runtime disponibles

## 🛠️ Commandes utiles

### Docker local

```bash
# Build avec script
./scripts/docker-deploy.sh

# Logs de l'application
docker logs agri-lien-app -f

# Se connecter au container
docker exec -it agri-lien-app sh

# Nettoyer Docker
docker system prune -a
```

### Base de données

```bash
# Se connecter à PostgreSQL dans Docker
docker exec -it agri-lien-postgres psql -U postgres -d agrilien

# Dump de la base
docker exec agri-lien-postgres pg_dump -U postgres agrilien > backup.sql

# Restaurer un dump
docker exec -i agri-lien-postgres psql -U postgres agrilien < backup.sql
```

## 🔧 Dépannage

### Erreurs communes

**Build échoue:**

```bash
# Nettoyer le cache Docker
docker builder prune -a

# Rebuild sans cache
docker build --no-cache -t agri-lien .
```

**Container ne démarre pas:**

```bash
# Vérifier les logs
docker logs agri-lien-app

# Variables d'environnement
docker exec agri-lien-app env
```

**Problème PostgreSQL:**

```bash
# Vérifier la connexion
docker exec agri-lien-app nc -z postgres 5432
```

## 💰 Coûts Render

- **Docker Web Service**:
  - Starter (gratuit): 750h/mois, 512MB RAM
  - Standard ($7/mois): Illimité, 1GB RAM
- **PostgreSQL**: Plan gratuit disponible

---

**🎯 Résultat**: Votre application Agri-Lien sera accessible sur `https://votre-nom.onrender.com` avec Docker ! 🚀
