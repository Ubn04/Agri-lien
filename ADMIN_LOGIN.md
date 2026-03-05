# 🔐 Informations de Connexion Admin

## Identifiants Admin

Pour vous connecter en tant qu'**Administrateur**, utilisez ces identifiants :

- **Email** : `admin@agrilien.bj`
- **Mot de passe** : `admin123`

## Autres Comptes de Test

### Fermier
- **Email** : `fermier@test.bj`
- **Mot de passe** : `fermier123`

### Acheteur
- **Email** : `acheteur@test.bj`
- **Mot de passe** : `acheteur123`

## Accès à la Plateforme

1. Ouvrez votre navigateur
2. Allez sur : **http://localhost:3000/login**
3. Entrez l'email et le mot de passe
4. Vous serez automatiquement redirigé vers `/admin/dashboard`

## Pages Admin Disponibles

Après connexion en tant qu'admin, vous avez accès à :

- **Dashboard** : `/admin/dashboard` - Vue d'ensemble avec statistiques
- **Utilisateurs** : `/admin/users` - Gestion des utilisateurs (recherche, filtres, suppression)
- **Produits** : `/admin/products` - Gestion du catalogue produits (vue grille)
- **Commandes** : `/admin/orders` - Suivi et traitement des commandes
- **Statistiques** : `/admin/stats` - Analyses détaillées (en développement)
- **Paramètres** : `/admin/settings` - Configuration de la plateforme

## Navigation

La sidebar à gauche vous permet de naviguer entre toutes ces pages. Elle affiche :
- Logo Agri-Lien en haut
- Liens de navigation avec icônes
- Le lien actif est surligné en vert
- Bouton de déconnexion en bas

## Problème Résolu

Le problème de connexion était lié à la structure des données retournées par l'API. J'ai corrigé :

1. Le hook `use-auth.ts` pour récupérer correctement `data.data.user` au lieu de `data.user`
2. Ajout de meilleurs messages d'erreur lors de la connexion
3. Nettoyage du cache Next.js pour éviter les problèmes de build

Vous pouvez maintenant vous connecter sans problème ! 🎉
