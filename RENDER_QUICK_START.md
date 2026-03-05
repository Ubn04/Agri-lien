# ⚡ HÉBERGEMENT NODE.JS SUR RENDER - GUIDE EXPRESS

## 🚀 3 ÉTAPES SIMPLES

### 1. **PRÉPARER** (2 min)

```bash
# Test de préparation
npm run render:prepare

# Push sur GitHub
git add .
git commit -m "Ready for Render"
git push origin main
```

### 2. **DÉPLOYER** (3 min)

1. Allez sur **[render.com](https://render.com)**
2. Connectez GitHub
3. **New +** → **Blueprint**
4. Sélectionnez votre repo `agri-lien-main`
5. **Create New Resources**

### 3. **CONFIGURER** (1 min)

Dans l'interface Render, ajoutez:

```
MOMO_API_KEY=votre_clé
MOMO_API_SECRET=votre_secret
```

## ✅ **RÉSULTAT**

- ✅ **PostgreSQL** créée automatiquement
- ✅ **Variables** auto-configurées
- ✅ **HTTPS** activé
- ✅ **App disponible**: `https://agri-lien-xxx.onrender.com`
- ✅ **Deploy auto** à chaque push Git

## 💰 **PRIX**

- **Gratuit**: 0$/mois (avec sommeil après inactivité)
- **Starter**: 14$/mois (always-on, recommandé)
- **Standard**: 45$/mois (production)

## 🛠️ **COMMANDES UTILES**

```bash
npm run render:prepare    # Préparer deploy
npm run build            # Test build local
npm run db:health        # Test base de données
```

## 📱 **APRÈS DEPLOY**

```bash
# Migrer données (une fois)
render shell --service=agri-lien
npm run migrate-data

# Test santé
curl https://votre-app.onrender.com/api/health
```

## 🔧 **FICHIERS CRÉÉS**

- ✅ `render.yaml` - Configuration auto
- ✅ `DEPLOY_RENDER.md` - Guide complet
- ✅ `RENDER_PRICING.md` - Prix & plans
- ✅ `scripts/prepare-render.sh` - Préparation
- ✅ Health endpoint optimisé

---

**🎯 RENDER = La solution la plus simple pour héberger Node.js avec PostgreSQL !**

**📞 Besoin d'aide ? Tous les détails dans [DEPLOY_RENDER.md](DEPLOY_RENDER.md)**
JWT_SECRET=votre-clé-secrète-de-32-caractères-minimum

````

### 3. Base de données PostgreSQL

1. **Nouveau PostgreSQL** sur Render
2. Copier l'URL de connexion externe
3. L'ajouter comme `DATABASE_URL` dans le web service

### 4. Services à configurer après déploiement

- 📱 **Mobile Money** : APIs MTN/Moov (Bénin)
- 📞 **USSD** : Gateway avec opérateur telecom
- 📧 **Email** : SMTP (Gmail/SendGrid)
- 📍 **Maps** : Mapbox/Google Maps APIs

## 🔧 Commandes utiles

```bash
# Vérifier avant déploiement
./scripts/pre-deploy-check.sh

# Test de build local (optionnel)
./scripts/pre-deploy-check.sh --test-build
````

## 💰 Coûts estimés

- **Starter Plan** (Gratuit) : 750h/mois
- **Standard Plan** (~7$/mois) : Illimité + meilleures performances
- **PostgreSQL** : Plan gratuit disponible

## 🎯 URL finale

`https://votre-nom-app.onrender.com`

---

**📖 Guide complet** : Voir `DEPLOYMENT_GUIDE.md`
