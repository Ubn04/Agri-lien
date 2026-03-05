# 🔄 Guide de migration : Mock → PostgreSQL

## ✅ Migration terminée !

Votre projet Agri-Lien a été migré avec succès vers PostgreSQL. Voici ce qui a été fait :

## 📦 Dépendances ajoutées

```json
{
  "pg": "^8.x",
  "@types/pg": "^8.x",
  "bcrypt": "^5.x",
  "jsonwebtoken": "^9.x"
}
```

## 🗄️ Structure de la base de données

### Tables créées :

- ✅ `users` - Utilisateurs (fermiers, acheteurs, logistique, admin)
- ✅ `farmer_profiles` - Profils des fermiers
- ✅ `buyer_profiles` - Profils des acheteurs
- ✅ `logistics_profiles` - Profils logistique
- ✅ `products` - Produits agricoles
- ✅ `orders` - Commandes
- ✅ `payments` - Paiements (Mobile Money)
- ✅ `notifications` - Notifications
- ✅ `reviews` - Avis et évaluations

## 📁 Fichiers créés/modifiés

### Configuration & Client

- ✅ [`lib/db/config.ts`](lib/db/config.ts) - Configuration optimisée pour Render
- ✅ [`lib/db/client.ts`](lib/db/client.ts) - Client PostgreSQL singleton
- ✅ [`lib/db/services.ts`](lib/db/services.ts) - Services CRUD PostgreSQL
- ✅ [`lib/db/index.ts`](lib/db/index.ts) - Point d'entrée principal

### Scripts de migration

- ✅ [`scripts/seed-database.ts`](scripts/seed-database.ts) - Migration données mock → PostgreSQL
- ✅ [`scripts/test-database.ts`](scripts/test-database.ts) - Test de connexion DB

### Schéma de base

- ✅ [`database/schema.sql`](database/schema.sql) - Schéma PostgreSQL complet

## 🚀 Utilisation

### 1. Configuration locale (développement)

Créez un fichier `.env` :

```env
# Base de données locale
DATABASE_URL=postgresql://username:password@localhost:5432/agrilien
# ou variables séparées :
DB_HOST=localhost
DB_PORT=5432
DB_NAME=agrilien
DB_USER=postgres
DB_PASSWORD=password

# JWT pour l'authentification
JWT_SECRET=votre-clé-secrète-de-32-caractères-minimum
```

### 2. Test de connexion

```bash
# Tester la connexion PostgreSQL
npm run db:test
```

### 3. Initialiser la base de données

```bash
# Créer le schéma + migrer les données mock
npm run db:seed
```

## 📋 Services disponibles

### UserService

```typescript
import { UserService } from "@/lib/db";

// Trouver un utilisateur
const user = await UserService.findByEmail("user@example.com");

// Créer un utilisateur
const newUser = await UserService.create({
  email: "new@example.com",
  password: "password",
  first_name: "Prénom",
  last_name: "Nom",
  phone: "+229 XX XX XX XX",
  role: "FARMER",
});

// Vérifier mot de passe
const isValid = await UserService.verifyPassword(email, password);
```

### ProductService

```typescript
import { ProductService } from "@/lib/db";

// Lister tous les produits
const products = await ProductService.getAll();

// Produits d'un fermier
const farmerProducts = await ProductService.getByFarmerId(farmerId);

// Créer un produit
const product = await ProductService.create({
  farmer_id: "uuid-farmer",
  name: "Tomates",
  category: "Légumes",
  price_per_unit: 500,
  available_quantity: 100,
  unit: "kg",
});

// Rechercher des produits
const results = await ProductService.search("tomate", "Légumes");
```

### OrderService

```typescript
import { OrderService } from "@/lib/db";

// Créer une commande
const order = await OrderService.create({
  buyer_id: "uuid-buyer",
  farmer_id: "uuid-farmer",
  items: [{ productId: "uuid", quantity: 5, price: 500 }],
  subtotal: 2500,
  delivery_fee: 1000,
  total_amount: 3500,
  delivery_address: "Cotonou, Bénin",
});

// Commandes d'un utilisateur
const buyerOrders = await OrderService.getByBuyerId(buyerId);
```

## 🔄 Migration dans les APIs

### Avant (mock-database.ts)

```typescript
import { mockDB } from "@/lib/db/mock-database";

const user = mockDB.findUserByEmail(email);
const products = mockDB.getAllProducts();
```

### Après (PostgreSQL)

```typescript
import { UserService, ProductService } from "@/lib/db";

const user = await UserService.findByEmail(email);
const products = await ProductService.getAll();
```

## 🌐 Configuration pour Render

### Variables d'environnement Render

```env
NODE_ENV=production
DATABASE_URL=postgresql://[render-postgres-url]
JWT_SECRET=votre-clé-production-sécurisée-32-caractères
```

### Script de déploiement

Le déploiement sur Render exécutera automatiquement :

1. `npm ci` - Installation des dépendances
2. `npm run build` - Build de l'application
3. `npm start` - Démarrage du serveur

## 🔧 Maintenance

### Sauvegarder les données

```bash
# Dump PostgreSQL
pg_dump $DATABASE_URL > backup.sql

# Ou utiliser le script personnalisé (à créer)
npm run db:backup
```

### Logs et monitoring

```typescript
// Logs automatiques en développement
// Désactiver en production dans config.ts
if (process.env.NODE_ENV === "development") {
  console.log("SQL Query:", { text, params, duration });
}
```

## ❗ Important pour la production

1. **Sécurité** :
   - Utilisez des JWT secrets forts (32+ caractères)
   - Activez SSL pour PostgreSQL (`ssl: { rejectUnauthorized: false }`)
   - Validez toutes les entrées utilisateur

2. **Performance** :
   - Pool de connexions configuré (max: 10)
   - Index sur les champs fréquents (email, foreign keys)
   - Pagination sur les listes importantes

3. **Monitoring** :
   - Surveillez les erreurs de connexion
   - Alertes sur les performances lentes
   - Backups automatiques réguliers

## 🆘 Problèmes fréquents

### Erreur de connexion

```bash
# Vérifier PostgreSQL local
sudo systemctl status postgresql

# Tester la connexion
npm run db:test
```

### Schéma non trouvé

```bash
# Réinitialiser le schéma
npm run db:seed
```

### Erreurs JWT

Vérifiez que `JWT_SECRET` est défini et fait au moins 32 caractères.

---

🎉 **Votre migration est terminée !**

Votre application utilise maintenant PostgreSQL au lieu du mock. Toutes les fonctionnalités restent identiques, mais avec une vraie persistance des données.
