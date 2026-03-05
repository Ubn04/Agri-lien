# 💰 Guide Prix & Performance - Render

## 🆓 Plan Gratuit

- **Prix**: 0$/mois
- **RAM**: 512MB
- **CPU**: Partagé
- **Limitation**: Sommeil après 15min d'inactivité
- **Durée**: 750h/mois max
- **Perfect pour**: Tests, démos, développement

## 💎 Plan Starter

- **Prix**: 7$/mois
- **RAM**: 512MB
- **CPU**: Dédié
- **Avantages**: Toujours actif, pas de sommeil
- **Perfect pour**: Applications pequenas, MVP

## ⚡ Plan Standard

- **Prix**: 25$/mois
- **RAM**: 2GB
- **CPU**: Plus performant
- **Perfect pour**: Applications en production

## 🗄️ Base de Données PostgreSQL

### Plan Gratuit:

- **Prix**: 0$/mois
- **Stockage**: 1GB
- **Connexions**: 97 simultanées
- **Perfect pour**: Développement

### Plan Starter:

- **Prix**: 7$/mois
- **Stockage**: 10GB
- **Connexions**: 200 simultanées
- **Backup**: Daily automated backups

### Plan Standard:

- **Prix**: 20$/mois
- **Stockage**: 100GB
- **Connexions**: 500 simultanées
- **Performance**: SSD haute performance

## 📊 Recommandations Agri-Lien

### Phase de Test (0$/mois):

```yaml
# render.yaml
services:
  - type: web
    plan: free
databases:
  - plan: free
```

### MVP / Lancement (14$/mois):

```yaml
services:
  - type: web
    plan: starter # 7$/mois
databases:
  - plan: starter # 7$/mois
```

### Production (45$/mois):

```yaml
services:
  - type: web
    plan: standard # 25$/mois
databases:
  - plan: standard # 20$/mois
```

## 🌍 Régions Disponibles

### Oregon (USA West):

- **Latence Afrique**: ~200-300ms
- **Avantages**: Plus stable, plus d'options

### Frankfurt (Europe):

- **Latence Afrique**: ~100-150ms
- **Avantages**: Plus proche du Bénin
- **Configuration**: `region: frankfurt` dans render.yaml

## ⚡ Optimisations Gratuites

### 1. CDN Automatique:

- Images optimisées
- Cache global
- HTTPS automatique

### 2. Auto-scaling:

- Redémarre automatiquement si crash
- Health checks intégrés

### 3. Git Deploy:

- Deploy automatique à chaque push
- Rollback instantané

## 📈 Estimation Trafic

### Plan Gratuit (750h/mois):

- **~25h/jour** d'utilisation
- **Perfect pour**: Démos, tests
- **Utilisateurs**: 10-50/jour

### Plan Starter (Always-on):

- **24h/24 7j/7**
- **Utilisateurs**: 100-500/jour
- **Requêtes**: Jusqu'à 1000/heure

### Plan Standard:

- **Utilisateurs**: 1000+/jour
- **Performance**: Applications complexes

## 🔧 Migration Entre Plans

### Upgrade automatique:

```bash
# Dans render.yaml, changez:
plan: starter  # ou standard

# Push sur Git, redéployment automatique
git add render.yaml
git commit -m "Upgrade to starter plan"
git push
```

### Downgrade:

- Possible via dashboard Render
- Attention aux limitations (RAM, sommeil)

## 📊 Monitoring Inclus

### Gratuit avec tous les plans:

- **Logs en temps réel**
- **Métriques CPU/RAM**
- **Health checks**
- **Uptime monitoring**
- **Deploy notifications**

### Dashboard complet:

- Graphiques performance
- Alertes email
- Historique deployments
- Usage bandwidth

## 🚀 Commandes Rapides

```bash
# Test local avant deploy
npm run render:prepare

# Deploy rapide
git add .
git commit -m "Deploy to Render"
git push origin main

# Monitoring
curl https://votre-app.onrender.com/api/health
```

## 💡 Conseils Économiques

### 1. Commencez gratuit:

- Testez votre app
- Validez le marché
- Montez en gamme selon usage

### 2. Utilisez le sommeil:

- Plan gratuit parfait pour démos
- Réveil automatique en <30s

### 3. Monitoring:

- Surveillez l'usage
- Upgrade seulement si nécessaire

**🎯 Pour Agri-Lien**: Commencez **gratuit**, passez **Starter** (14$/mois) au lancement, **Standard** (45$/mois) si +1000 users/jour.
