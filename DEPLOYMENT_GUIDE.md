# 🚀 Guide de déploiement Agri-Lien sur Render

## Étapes de déploiement

### 1. Préparation du code

Assurez-vous que votre code est poussé sur un repository Git (GitHub, GitLab, ou Bitbucket).

### 2. Création du service web sur Render

1. Connectez-vous à [Render](https://render.com)
2. Cliquez sur **"New +"** → **"Web Service"**
3. Connectez votre repository Git
4. Configurez comme suit :
   - **Name**: `agri-lien-web`
   - **Runtime**: `Node`
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Starter (gratuit) ou Standard selon vos besoins

### 3. Configuration des variables d'environnement

Dans les paramètres de votre service web, ajoutez ces variables :

#### Variables essentielles :

```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://votre-app.onrender.com
NEXT_PUBLIC_API_URL=https://votre-app.onrender.com/api
```

#### Variables de base de données :

```
DATABASE_URL=postgresql://username:password@host:port/database
DATABASE_POOL_SIZE=10
```

#### Variables d'authentification :

```
JWT_SECRET=votre-clé-jwt-secrète-très-sécurisée
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=votre-refresh-token-secret
REFRESH_TOKEN_EXPIRES_IN=30d
```

#### Variables de paiement mobile (à configurer avec vos fournisseurs) :

```
MOMO_API_KEY=votre-clé-momo-api
MOMO_API_SECRET=votre-secret-momo-api
MOMO_CALLBACK_URL=https://votre-app.onrender.com/api/payments/callback
```

#### Variables USSD :

```
USSD_API_KEY=votre-clé-ussd
USSD_SHORT_CODE=*123*456#
USSD_GATEWAY_URL=https://votre-gateway-ussd.com
```

#### Variables SMS :

```
SMS_API_KEY=votre-clé-sms
SMS_SENDER_ID=AGRILIEN
```

#### Variables Email :

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=votre-mot-de-passe-app
EMAIL_FROM=noreply@agrilien.com
```

#### Variables de stockage :

```
STORAGE_TYPE=local
# Si vous utilisez AWS S3 :
AWS_ACCESS_KEY_ID=votre-aws-key
AWS_SECRET_ACCESS_KEY=votre-aws-secret
AWS_REGION=us-east-1
AWS_BUCKET=agrilien-uploads
```

#### Variables de géolocalisation :

```
MAPBOX_ACCESS_TOKEN=votre-token-mapbox
GOOGLE_MAPS_API_KEY=votre-clé-google-maps
```

### 4. Configuration de la base de données PostgreSQL

1. Sur Render, cliquez sur **"New +"** → **"PostgreSQL"**
2. Configurez :
   - **Name**: `agri-lien-db`
   - **Database Name**: `agrilien`
   - **User**: `agrilien_user`
   - **Plan**: Starter (gratuit) ou Standard

3. Une fois créée, copiez l'**External Database URL** et ajoutez-la comme variable `DATABASE_URL` dans votre service web.

### 5. Déploiement

1. Render va automatiquement construire et déployer votre application
2. Le déploiement prend généralement 5-15 minutes
3. Une fois terminé, vous obtiendrez une URL : `https://votre-app.onrender.com`

### 6. Configuration post-déploiement

#### A. Initialisation de la base de données

Vous pouvez exécuter vos scripts d'initialisation via le shell Render :

1. Dans votre service web → **"Shell"**
2. Exécutez : `npm run seed` (si vous avez ce script)

#### B. Configuration des domaines personnalisés

1. Dans les paramètres de votre service → **"Custom Domains"**
2. Ajoutez votre domaine personnalisé
3. Configurez les enregistrements DNS selon les instructions

### 7. Surveillance et logs

- **Logs** : Consultables dans l'interface Render
- **Metrics** : CPU, mémoire, requêtes disponibles
- **Health checks** : Endpoint `/api/health` configuré

## 🔧 Optimisations pour la production

### Performance :

- Activez la mise en cache statique Next.js
- Configurez un CDN pour les assets
- Optimisez les images avec next/image

### Sécurité :

- Utilisez HTTPS (automatique sur Render)
- Configurez les CORS appropriés
- Validez toutes les entrées utilisateur

### Monitoring :

- Configurez des alertes sur Render
- Intégrez des outils de monitoring externes
- Surveillez les performances de la base de données

## 📱 Services externes à configurer

### Paiements Mobile Money :

- Contactez votre opérateur (MTN, Moov, etc.)
- Obtenez vos clés API de production
- Configurez les URL de callback

### Gateway USSD :

- Configurez avec votre opérateur télécom
- Testez les codes courts
- Vérifiez la connectivité

### Services SMS :

- Configurez un fournisseur SMS (Twilio, etc.)
- Testez l'envoi de notifications

## 🚨 Points d'attention

1. **Coûts** : Surveillez l'utilisation pour éviter les frais inattendus
2. **Limites** : Le plan gratuit a des limitations (750h/mois)
3. **Backup** : Configurez des sauvegardes automatiques de la DB
4. **Monitoring** : Surveillez les performances et erreurs
5. **SSL** : Automatiquement configuré sur Render

## 📞 Support

- Documentation Render : https://render.com/docs
- Support Render : https://render.com/support
- Logs détaillés disponibles via l'interface web
