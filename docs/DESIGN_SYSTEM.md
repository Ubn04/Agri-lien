# 🎨 Design System Agri-Lien

## Vue d'ensemble
Design system africain moderne, professionnel et chaleureux pour la plateforme Agri-Lien. Conçu pour être accessible, cohérent et facile à utiliser.

---

## 🎨 Palette de Couleurs

### Couleurs Primaires
```js
// Vert Agri (Primaire) - Représente la croissance et l'agriculture
agri-green-50:  #F0F9F4
agri-green-100: #D9F2E3
agri-green-200: #B3E5C7
agri-green-300: #8DD8AB
agri-green-400: #5CC485
agri-green-500: #3DAE68
agri-green-600: #2E8B57  // Principal
agri-green-700: #256F46
agri-green-800: #1C5334
agri-green-900: #143722

// Ocre (Secondaire) - Évoque la terre et l'authenticité
agri-ochre-50:  #FDF7F0
agri-ochre-100: #FAEBDB
agri-ochre-200: #F5D7B7
agri-ochre-300: #F0C393
agri-ochre-400: #E5A85F
agri-ochre-500: #DA8C3B
agri-ochre-600: #D2691E  // Principal
agri-ochre-700: #A85318
agri-ochre-800: #7E3E12
agri-ochre-900: #54290C

// Or (Accent) - Représente la prospérité
agri-gold-400: #FFE066
agri-gold-500: #FFD700  // Principal
agri-gold-600: #E6C200
```

### Couleurs Système
```js
// Success
green-500: #10B981
green-600: #059669
green-700: #047857

// Warning
yellow-500: #F59E0B
yellow-600: #D97706

// Error
red-500: #EF4444
red-600: #DC2626
red-700: #B91C1C

// Info
blue-500: #3B82F6
blue-600: #2563EB
```

---

## 📦 Composants

### 1. Button

**Utilisation :**
```tsx
import { Button } from '@/components/design-system/button';

// Variantes
<Button variant="primary">Action Principale</Button>
<Button variant="secondary">Action Secondaire</Button>
<Button variant="outline">Action Tertiaire</Button>
<Button variant="danger">Supprimer</Button>
<Button variant="ghost">Annuler</Button>
<Button variant="success">Valider</Button>

// Tailles
<Button size="sm">Petit</Button>
<Button size="md">Moyen</Button>
<Button size="lg">Grand</Button>
<Button size="xl">Extra Large</Button>

// États
<Button loading>Chargement...</Button>
<Button disabled>Désactivé</Button>
<Button fullWidth>Pleine largeur</Button>
```

**Quand utiliser :**
- `primary` : Actions principales (Enregistrer, Continuer, Acheter)
- `secondary` : Actions secondaires importantes
- `outline` : Actions tertiaires, alternatives
- `danger` : Actions destructives (Supprimer, Annuler commande)
- `ghost` : Actions de navigation, annulations
- `success` : Confirmations positives

**Accessibilité :**
- Contraste minimum 4.5:1 pour le texte
- Focus visible avec ring
- États disabled clairs
- Labels explicites

---

### 2. Input & Select

**Utilisation :**
```tsx
import { Input, Select } from '@/components/design-system/input';

// Input basique
<Input
  label="Nom du produit"
  placeholder="Ex: Tomates fraîches"
  required
/>

// Avec icônes
<Input
  label="Email"
  type="email"
  leftIcon={<Mail className="h-5 w-5" />}
  helperText="Nous ne partagerons jamais votre email"
/>

// Avec erreur
<Input
  label="Prix"
  type="number"
  error="Le prix doit être supérieur à 0"
/>

// Select
<Select
  label="Département"
  options={[
    { value: 'atlantique', label: 'Atlantique' },
    { value: 'zou', label: 'Zou' },
    { value: 'borgou', label: 'Borgou' }
  ]}
  required
/>
```

**Guidelines :**
- Toujours inclure un label
- Utiliser `required` pour les champs obligatoires
- Fournir un `helperText` pour les champs complexes
- Messages d'erreur clairs et actionnables
- Focus automatique sur le premier champ d'un formulaire

---

### 3. Badge

**Utilisation :**
```tsx
import { Badge } from '@/components/design-system/badge';

<Badge variant="success">Actif</Badge>
<Badge variant="warning">En attente</Badge>
<Badge variant="error">Rejeté</Badge>
<Badge variant="info">Nouveau</Badge>
<Badge variant="primary">Agriculteur</Badge>
<Badge variant="secondary">Premium</Badge>

// Avec point indicateur
<Badge variant="success" dot>En ligne</Badge>

// Tailles
<Badge size="sm">Petit</Badge>
<Badge size="md">Moyen</Badge>
<Badge size="lg">Grand</Badge>
```

**Mapping Sémantique :**
- `success` : Statuts positifs (Livré, Payé, Actif)
- `warning` : Statuts d'attention (En attente, Stock faible)
- `error` : Statuts négatifs (Annulé, Rejeté, Échoué)
- `info` : Informations neutres (Nouveau, En cours)
- `primary` : Catégories principales
- `secondary` : Catégories secondaires

---

### 4. Card

**Utilisation :**
```tsx
import { Card, CardHeader, CardImage, CardFooter } from '@/components/design-system/card';

// Card simple
<Card variant="default" padding="md">
  <CardHeader 
    title="Tomates Fraîches" 
    subtitle="500kg disponibles"
    action={<Button size="sm">Modifier</Button>}
  />
  <p>Description du produit...</p>
  <CardFooter>
    <Button variant="primary">Acheter</Button>
    <Button variant="outline">Détails</Button>
  </CardFooter>
</Card>

// Card avec image
<Card padding="none">
  <CardImage src="/product.jpg" alt="Produit" aspectRatio="16/9" />
  <div className="p-6">
    <h3>Titre</h3>
    <p>Contenu</p>
  </div>
</Card>

// Variantes
<Card variant="default">Standard</Card>
<Card variant="bordered">Avec bordure accentuée</Card>
<Card variant="elevated">Ombre prononcée</Card>
<Card variant="flat">Sans ombre</Card>
```

**Best Practices :**
- Utiliser `variant="elevated"` pour mettre en avant du contenu important
- `padding="none"` avec images en pleine largeur
- Limiter à 1-2 actions par card
- Grouper les cards similaires avec espacement cohérent

---

### 5. Modal

**Utilisation :**
```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter, ConfirmDialog } from '@/components/design-system/modal';

const [isOpen, setIsOpen] = useState(false);

// Modal personnalisé
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
  <ModalHeader 
    title="Ajouter un produit" 
    subtitle="Remplissez les informations"
    onClose={() => setIsOpen(false)}
  />
  <ModalBody>
    <Input label="Nom" />
    <Input label="Prix" type="number" />
  </ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>
      Annuler
    </Button>
    <Button variant="primary" onClick={handleSave}>
      Enregistrer
    </Button>
  </ModalFooter>
</Modal>

// Dialog de confirmation
<ConfirmDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleDelete}
  title="Supprimer le produit ?"
  message="Cette action est irréversible."
  confirmText="Supprimer"
  cancelText="Annuler"
  variant="danger"
/>
```

**Tailles :**
- `sm` : Confirmations simples
- `md` : Formulaires standards (défaut)
- `lg` : Formulaires complexes
- `xl` : Contenu riche
- `full` : Expérience immersive

**Accessibilité :**
- Fermeture par `Escape`
- Piège du focus dans la modal
- Overlay semi-transparent
- Animation fluide d'entrée/sortie

---

### 6. Table

**Utilisation :**
```tsx
import { Table } from '@/components/design-system/table';
import { Badge } from '@/components/design-system/badge';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: string;
}

const columns = [
  { key: 'name', label: 'Produit', sortable: true },
  { 
    key: 'price', 
    label: 'Prix', 
    sortable: true,
    render: (value) => `${value.toLocaleString()} XOF`
  },
  { key: 'stock', label: 'Stock', sortable: true },
  {
    key: 'status',
    label: 'Statut',
    render: (value) => (
      <Badge variant={value === 'active' ? 'success' : 'warning'}>
        {value}
      </Badge>
    )
  }
];

<Table
  data={products}
  columns={columns}
  pagination={true}
  itemsPerPage={10}
  onRowClick={(row) => console.log('Clicked:', row)}
/>
```

**Fonctionnalités :**
- Tri par colonne (cliquer sur l'en-tête)
- Pagination intelligente avec ellipses
- Rendu personnalisé par cellule
- Événements de clic sur les lignes
- Responsive avec scroll horizontal

---

## 📐 Espacement

### Échelle d'espacement
```js
// Tailwind spacing scale (rem)
0: 0px
1: 0.25rem  (4px)
2: 0.5rem   (8px)
3: 0.75rem  (12px)
4: 1rem     (16px)
5: 1.25rem  (20px)
6: 1.5rem   (24px)
8: 2rem     (32px)
10: 2.5rem  (40px)
12: 3rem    (48px)
16: 4rem    (64px)
20: 5rem    (80px)
```

### Guidelines
- **Composants** : padding de 4-6 (16-24px)
- **Cards** : padding de 6-8 (24-32px)
- **Sections** : padding de 12-16 (48-64px)
- **Gap entre éléments** : 2-4 (8-16px)
- **Gap entre sections** : 8-12 (32-48px)

---

## ✍️ Typographie

### Hiérarchie
```css
/* Headings */
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }     /* H1 */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }   /* H2 */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }        /* H3 */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }     /* H4 */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }    /* H5 */

/* Body */
.text-base { font-size: 1rem; line-height: 1.5rem; }       /* Normal */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }    /* Small */
.text-xs { font-size: 0.75rem; line-height: 1rem; }        /* Extra small */
```

### Poids de police
- `font-normal` (400) : Texte standard
- `font-medium` (500) : Sous-titres, labels
- `font-semibold` (600) : Titres de sections
- `font-bold` (700) : Titres principaux

### Usage
```tsx
<h1 className="text-4xl font-bold text-gray-900">Titre Principal</h1>
<h2 className="text-3xl font-semibold text-gray-800">Section</h2>
<p className="text-base text-gray-600">Paragraphe standard</p>
<span className="text-sm text-gray-500">Texte secondaire</span>
```

---

## 🎭 Animations

### Classes personnalisées (dans tailwind.config.js)
```js
animation: {
  'fadeIn': 'fadeIn 0.3s ease-in-out',
  'slideUp': 'slideUp 0.3s ease-out',
  'slideDown': 'slideDown 0.3s ease-out',
  'bounce-slow': 'bounce 2s infinite',
}
```

### Usage
```tsx
<div className="animate-fadeIn">Apparition en fondu</div>
<div className="animate-slideUp">Glissement vers le haut</div>
<div className="transition-all hover:scale-105">Effet au survol</div>
```

---

## 📱 Responsive Design

### Breakpoints
```js
sm: '640px'   // Mobile landscape
md: '768px'   // Tablette
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
2xl: '1536px' // Extra large
```

### Mobile-First
```tsx
{/* Par défaut mobile, puis adapté */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 col mobile, 2 tablette, 3 desktop */}
</div>

<Button size="sm" className="md:size-md lg:size-lg">
  Responsive
</Button>
```

### Touch Targets
- Minimum 44x44px (iOS) / 48x48px (Android)
- Espacement de 8px minimum entre éléments cliquables

---

## ♿ Accessibilité

### Contraste
- **Texte normal** : Minimum 4.5:1
- **Texte large (18px+)** : Minimum 3:1
- **Éléments UI** : Minimum 3:1

### Focus
```tsx
{/* Toujours visible et cohérent */}
<button className="focus:ring-4 focus:ring-agri-green-200 focus:outline-none">
  Action
</button>
```

### Aria Labels
```tsx
<button aria-label="Fermer la modal">
  <X className="h-5 w-5" />
</button>

<Input 
  label="Email" 
  aria-describedby="email-helper"
  helperText="Format: nom@exemple.com"
/>
```

### Navigation Clavier
- Tab : Navigation séquentielle
- Enter/Space : Activation des boutons
- Escape : Fermeture des modals
- Arrow keys : Navigation dans les listes

---

## 📖 Exemples Complets

### Formulaire de Produit
```tsx
import { Input, Select, Button } from '@/components/design-system';

function ProductForm() {
  return (
    <form className="space-y-6 max-w-2xl">
      <Input
        label="Nom du produit"
        placeholder="Ex: Tomates fraîches"
        required
        fullWidth
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Prix (XOF)"
          type="number"
          placeholder="0"
          required
        />
        <Input
          label="Stock (kg)"
          type="number"
          placeholder="0"
          required
        />
      </div>

      <Select
        label="Catégorie"
        options={[
          { value: 'legumes', label: 'Légumes' },
          { value: 'fruits', label: 'Fruits' },
          { value: 'cereales', label: 'Céréales' }
        ]}
        required
        fullWidth
      />

      <div className="flex gap-3 justify-end">
        <Button variant="ghost">Annuler</Button>
        <Button variant="primary" type="submit">
          Enregistrer
        </Button>
      </div>
    </form>
  );
}
```

### Liste avec Actions
```tsx
import { Table, Badge, Button } from '@/components/design-system';

function UsersList() {
  const columns = [
    { key: 'name', label: 'Nom', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    {
      key: 'role',
      label: 'Rôle',
      render: (value) => (
        <Badge variant={value === 'admin' ? 'primary' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Modifier</Button>
          <Button size="sm" variant="danger">Supprimer</Button>
        </div>
      )
    }
  ];

  return (
    <Table
      data={users}
      columns={columns}
      pagination
      itemsPerPage={10}
    />
  );
}
```

---

## 🎯 Bonnes Pratiques

### DOs ✅
- Utiliser les composants du design system
- Respecter la hiérarchie des couleurs
- Maintenir un espacement cohérent
- Tester sur mobile et desktop
- Vérifier l'accessibilité
- Fournir des feedbacks visuels clairs

### DON'Ts ❌
- Ne pas créer de nouveaux composants sans raison
- Éviter les couleurs hors palette
- Ne pas ignorer les états disabled/loading
- Pas de texte sur fond sans contraste suffisant
- Éviter les animations trop agressives
- Ne pas oublier les aria-labels

---

## 🚀 Démarrage Rapide

```tsx
// 1. Importer les composants nécessaires
import { Button, Input, Card, Badge } from '@/components/design-system';

// 2. Utiliser dans votre composant
export default function MyComponent() {
  return (
    <Card variant="elevated" padding="lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Titre
      </h2>
      
      <Input 
        label="Champ de texte" 
        placeholder="Saisir..." 
        fullWidth 
      />
      
      <div className="flex gap-3 mt-6">
        <Button variant="primary">Action</Button>
        <Button variant="outline">Annuler</Button>
      </div>
      
      <Badge variant="success" className="mt-4">
        Nouveau
      </Badge>
    </Card>
  );
}
```

---

**📞 Support Design System**
Pour toute question ou suggestion : design@agri-lien.bj
