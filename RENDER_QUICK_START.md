# 🚀 Agri-Lien - Déploiement Render (Résumé)

## ✅ Étapes rapides

### 1. Sur Render.com

1. **Nouveau Web Service** → Connecter votre repository Git
2. **Configuration** :
   ```
   Build Command: npm ci && npm run build
   Start Command: npm start
   ```

### 2. Variables d'environnement essentielles

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://votre-app.onrender.com
NEXT_PUBLIC_API_URL=https://votre-app.onrender.com/api
DATABASE_URL=postgresql://[render-vous-donnera-cette-url]
JWT_SECRET=votre-clé-secrète-de-32-caractères-minimum
```

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
```

## 💰 Coûts estimés

- **Starter Plan** (Gratuit) : 750h/mois
- **Standard Plan** (~7$/mois) : Illimité + meilleures performances
- **PostgreSQL** : Plan gratuit disponible

## 🎯 URL finale

`https://votre-nom-app.onrender.com`

---

**📖 Guide complet** : Voir `DEPLOYMENT_GUIDE.md`
