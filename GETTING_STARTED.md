# 🚀 Guide de Démarrage Rapide - Agri-Lien

## Étape 1: Installer les dépendances

```bash
npm install
```

Les dépendances seront installées selon le `package.json`. Cela prendra quelques minutes.

## Étape 2: Configuration de l'environnement

Créer un fichier `.env.local` à la racine du projet:

```bash
cp .env.example .env.local
```

Puis éditer `.env.local` avec vos propres valeurs (pour le développement local, les valeurs par défaut fonctionneront).

## Étape 3: Installation de la base de données (optionnel pour commencer)

Si vous voulez tester avec une vraie base de données PostgreSQL:

```bash
# Créer la base de données
createdb agrilien

# Appliquer le schéma
psql agrilien < database/schema.sql
```

**Note**: Pour le développement initial, vous pouvez sauter cette étape. Les API routes utilisent des données mockées.

## Étape 4: Lancer le serveur de développement

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure Créée

Le projet contient maintenant:

### Configuration
- ✅ package.json avec toutes les dépendances
- ✅ tsconfig.json (TypeScript)
- ✅ next.config.js (Next.js)
- ✅ tailwind.config.js (Tailwind CSS)
- ✅ .env.example (Variables d'environnement)
- ✅ .gitignore

### Application
- ✅ app/layout.tsx (Layout principal)
- ✅ app/page.tsx (Page d'accueil)
- ✅ app/globals.css (Styles globaux)
- ✅ app/error.tsx, loading.tsx, not-found.tsx

### Pages d'authentification
- ✅ Login page
- ✅ Register pages (choix de rôle)
- ✅ Farmer registration page

### Composants UI
- ✅ Button, Input, Card, Badge, Avatar, Table
- ✅ Navigation, Footer
- ✅ Hero Section, Features, How It Works, Stats, CTA

### Providers
- ✅ AuthProvider
- ✅ ThemeProvider
- ✅ NotificationProvider

### Types TypeScript
- ✅ User, Product, Order, Payment, API types

### Utils
- ✅ Formatters (currency, dates, phone, etc.)
- ✅ Validators (email, phone, password)
- ✅ Helpers (debounce, slugify, etc.)
- ✅ Constants

### API Routes (avec données mockées)
- ✅ /api/auth/login
- ✅ /api/auth/register
- ✅ /api/products
- ✅ /api/orders

### Base de données
- ✅ database/schema.sql (Schéma PostgreSQL complet)

### Documentation
- ✅ docs/architecture.md
- ✅ docs/deployment.md
- ✅ README.md principal

## 🎯 Prochaines Étapes (À Implémenter)

Pour compléter le projet, vous devrez:

1. **Implémenter les services API** - Remplacer les données mockées par de vraies requêtes DB
2. **Ajouter les pages restantes**:
   - Dashboards (Farmer, Buyer, Logistics, Admin)
   - Marketplace avec filtres
   - Pages de profil
   - Gestion des produits
   - Gestion des commandes
   - USSD simulator

3. **Intégrations externes**:
   - Mobile Money API (MTN MoMo, Moov Money)
   - SMS Gateway
   - Email Service
   - Maps (Mapbox/Google Maps)

4. **Features avancées**:
   - Real-time notifications (WebSockets)
   - File upload pour images
   - Search & filters avancés
   - Analytics dashboard

## 🐛 Résolution des Erreurs TypeScript

Les erreurs TypeScript actuelles sont normales - elles disparaîtront une fois que vous aurez installé les dépendances avec `npm install`.

## 📦 Dépendances Principales

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **Radix UI** - Composants UI
- **React Query** - State management serveur
- **Zustand** - State management client
- **Zod** - Validation de schémas
- **date-fns** - Manipulation de dates
- **Lucide React** - Icônes

## 💡 Tips

1. Commencez par lancer `npm install && npm run dev`
2. Explorez la page d'accueil sur http://localhost:3000
3. Testez les pages de login/register
4. Consultez `docs/architecture.md` pour comprendre la structure
5. Les données sont mockées pour l'instant, pas besoin de DB immédiatement

## 🤝 Besoin d'Aide?

- Consultez la documentation dans `/docs`
- Lisez les commentaires `// TODO` dans le code pour voir ce qui reste à implémenter
- Les API routes ont des exemples de structure à suivre

Bon développement! 🌾
