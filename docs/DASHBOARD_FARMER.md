# 🌾 Dashboard Agriculteur - Agri-Lien

## 📋 Vue d'ensemble

Dashboard professionnel complet pour les agriculteurs avec toutes les fonctionnalités essentielles pour gérer leur activité.

## ✨ Fonctionnalités

### 1. **En-tête avec statistiques clés**
- 💰 Revenus du mois
- 📦 Produits actifs
- 🛒 Commandes en cours
- 📈 Taux de vente

### 2. **Tableau de produits (CRUD complet)**
- ✅ Liste de tous les produits
- ➕ Ajouter un nouveau produit
- ✏️ Modifier un produit existant
- 🗑️ Supprimer un produit
- 👁️ Voir les détails
- 📊 Barre de progression des ventes
- 🏷️ Badges de statut colorés

### 3. **Graphique des ventes (Recharts)**
- 📈 Graphique en aire des ventes
- 📅 Données sur 7 jours
- 💹 Pourcentage de croissance
- 🎨 Design avec gradient vert Agri-Lien

### 4. **Notifications importantes**
- ✅ Nouvelles commandes
- ℹ️ Alertes stock faible
- ⚠️ Mises à jour requises
- 📊 Insights de performance

### 5. **Menu USSD intégré**
- 📱 Simulation visuelle du téléphone
- #️⃣ Code USSD : *123#
- ✓ Fonctionne sans internet
- 📖 Guide d'utilisation

### 6. **Actions rapides**
- ➕ Ajouter un produit
- 🛒 Voir le marché
- 📱 Accès USSD
- 📦 Mes commandes
- 📊 Analytics
- 📍 Ma ferme

## 🎨 Design System

### Couleurs principales
- **Vert Agri** : `#2E8B57` - Actions principales
- **Ocre Terre** : `#D2691E` - Secondaire
- **Or Soleil** : `#FFD700` - Accents

### Composants
- **Cards** : Ombres douces, bordures arrondies
- **Boutons** : Hover effects, transitions fluides
- **Tableaux** : Hover sur lignes, responsive
- **Graphiques** : Recharts avec thème personnalisé

## 📂 Structure des fichiers

```
components/farmer/
├── dashboard-header.tsx      # Navigation principale
├── stats-cards.tsx           # Cartes de statistiques
├── products-table.tsx        # Tableau CRUD produits
├── sales-chart.tsx           # Graphique Recharts
├── notifications.tsx         # Liste notifications
├── quick-actions.tsx         # Actions rapides
└── ussd-widget.tsx          # Widget USSD

app/(farmer)/dashboard/
└── page.tsx                 # Page principale dashboard
```

## 🚀 Utilisation

### Accéder au dashboard
```
http://localhost:3000/farmer/dashboard
```

### Composants modulaires
Tous les composants sont indépendants et réutilisables :

```tsx
import { StatsCards } from '@/components/farmer/stats-cards'
import { ProductsTable } from '@/components/farmer/products-table'
import { SalesChart } from '@/components/farmer/sales-chart'
```

## 🔧 État et données

### État local (à remplacer par API)
- Les données sont actuellement en dur dans les composants
- Utiliser React Query ou SWR pour les requêtes API
- Implémenter Zustand pour l'état global

### Exemple de migration vers API
```tsx
// Avant (données locales)
const [products] = useState<Product[]>([...])

// Après (avec React Query)
const { data: products } = useQuery('products', fetchProducts)
```

## 📱 Responsive

✅ **Mobile First**
- Navigation hamburger sur mobile
- Tableaux scrollables
- Cartes empilées verticalement

✅ **Tablette**
- Grille 2 colonnes pour stats
- Layout adaptatif

✅ **Desktop**
- Grille 3 colonnes (2/3 + 1/3)
- Sidebar fixe
- Navigation complète

## 🎯 TODO / Améliorations

- [ ] Connexion API réelle
- [ ] Gestion d'état global (Zustand)
- [ ] Formulaire d'ajout de produit
- [ ] Modals de confirmation (suppression)
- [ ] Filtres et recherche dans tableau
- [ ] Pagination des produits
- [ ] Export données (CSV, PDF)
- [ ] Mode sombre
- [ ] Notifications temps réel (WebSocket)
- [ ] Analytics avancés

## 🔐 Sécurité

- [ ] Authentification requise
- [ ] Validation côté serveur
- [ ] Protection CSRF
- [ ] Rate limiting

## 📊 Métriques de performance

- **Lighthouse Score** : Cible >90
- **First Contentful Paint** : <1s
- **Time to Interactive** : <2s

## 🐛 Bugs connus

Aucun bug connu pour le moment.

## 📞 Support

Pour toute question : support@agri-lien.bj

---

**Créé avec ❤️ pour les agriculteurs béninois**
