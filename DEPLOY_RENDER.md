# 🚀 Guide de Déploiement Render

## 📋 Étapes Rapides

### 1. **Connecter GitHub**

```bash
# Push votre code sur GitHub
git add .
git commit -m "Prêt pour deploy Render"
git push origin main
```

### 2. **Créer un compte Render**

- Allez sur [render.com](https://render.com)
- Connectez votre compte GitHub
- Cliquez "New +" → "Blueprint"

### 3. **Configurer le Blueprint**

- Sélectionnez votre repository `agri-lien-main`
- Render détectera automatiquement `render.yaml`
- Cliquez "Create New Resources"

### 4. **Variables d'environnement manuelles**

Dans le dashboard Render, ajoutez:

#### Secrets Payment (Mobile Money):

```
MOMO_API_KEY=votre_clé_momo
MOMO_API_SECRET=votre_secret_momo
MOMO_CALLBACK_URL=https://votre-app.onrender.com/api/payments/callback
```

#### Email SMTP (optionnel):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre@email.com
SMTP_PASSWORD=votre_mot_de_passe_app
FROM_EMAIL=noreply@agrilien.bj
```

## 🔧 Configuration Automatique

✅ **PostgreSQL** - Base créée automatiquement  
✅ **Variables DB** - Auto-configurées  
✅ **JWT Secrets** - Générés automatiquement  
✅ **URL App** - Auto-détectée  
✅ **Build & Deploy** - Automatisé

## 📊 Ressources Créées

### Web Service:

- **URL**: `https://agri-lien-xxx.onrender.com`
- **Plan**: Starter (gratuit avec limitations)
- **Build**: Automatique à chaque push

### PostgreSQL Database:

- **Plan**: Starter (1GB gratuit)
- **Connexions**: Auto-configurées
- **Migrations**: Exécutées au build

## 🚀 Commandes Render

### Build local pour tester:

```bash
# Test du build
npm ci --production=false
npm run build
npm start
```

### Vérifier la santé:

```bash
curl https://votr-app.onrender.com/api/health
```

## ⚡ Optimisations

### Performance:

```yaml
# Dans render.yaml, ajustez:
plan: standard # Si besoin de plus de performance
region: frankfurt # Plus proche de l'Afrique
```

### Base de données:

```yaml
# Upgrade DB si nécessaire:
plan: standard # 10GB, meilleure performance
```

## 🔒 Sécurité Production

### 1. Après déploiement, mettez à jour:

```
# Variables d'environnement Render
JWT_SECRET=nouveu-secret-production-fort
REFRESH_TOKEN_SECRET=nouveau-refresh-secret-fort
```

### 2. Configurez domaine personnalisé:

- Dans Render Dashboard → Settings → Custom Domains
- Ajoutez `www.agrilien.bj` (exemple)

## 🐛 Debug Déploiement

### Voir les logs:

- Dashboard Render → Votre service → Logs
- Ou en temps réel: `render logs --service=agri-lien`

### Erreurs courantes:

#### Build échoue:

```
# Vérifiez package.json
npm run build  # Test local
```

#### DB connexion échoue:

```
# Variables mal configurées
# Vérifiez les variables d'environnement DB_*
```

#### Migration échoue:

```
# Première migration manuelle
render shell --service=agri-lien
npm run db:migrate
```

## 📱 Post-Déploiement

### 1. Migrer les données:

```bash
# Via Render Shell
render shell --service=agri-lien
npm run migrate-data
```

### 2. Test complet:

- Inscription utilisateur
- Connexion
- Création produit
- Passage commande

### 3. Monitoring:

- Health checks automatiques
- Alertes Render Dashboard
- Logs en temps réel

## 💰 Coûts

- **Plan gratuit**: 0$/mois
  - 512MB RAM, CPU partagé
  - Sommeil après inactivité
  - 750h/mois

- **Plan Starter**: 7$/mois
  - 512MB RAM, CPU dédié
  - Toujours actif
  - Illimité

## 🔄 CI/CD Automatique

✅ **Auto-deploy** activé  
✅ **GitHub webhook** configuré  
✅ **Build** à chaque push  
✅ **Rollback** automatique si erreur

Votre app Agri-Lien sera disponible à: `https://agri-lien-xxx.onrender.com`
