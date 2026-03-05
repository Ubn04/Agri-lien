# 🌾 Agri-Lien

**Agri-Lien** est une plateforme numérique innovante qui connecte les fermiers béninois aux acheteurs (restaurants, hôtels, supermarchés) et aux prestataires logistiques pour faciliter la vente et la distribution de produits agricoles locaux.

## 🎯 Vision

Révolutionner le secteur agricole au Bénin en digitalisant la chaîne de valeur, de la ferme à l'assiette, tout en assurant l'accessibilité via USSD pour les zones rurales.

## ✨ Fonctionnalités Principales

### Pour les Fermiers 👨‍🌾
- 📱 Inscription et profil détaillé
- 📦 Gestion de l'inventaire des produits
- 💰 Publication et mise à jour des prix
- 📊 Tableau de bord des ventes
- 🔔 Notifications de commandes
- 📞 Accès USSD pour zones sans internet

### Pour les Acheteurs 🏪
- 🛒 Marketplace avec recherche avancée
- 🗺️ Géolocalisation des fermiers
- 💳 Paiement Mobile Money intégré
- 📦 Suivi des commandes en temps réel
- ⭐ Système de notation des fournisseurs
- 📈 Historique d'achats

### Pour la Logistique 🚚
- 🗺️ Gestion des livraisons sur carte
- 📍 Optimisation des routes
- 📊 Tableau de bord des performances
- 🚗 Gestion de flotte
- 💰 Calcul automatique des frais

### Pour les Administrateurs 👑
- 📊 Analytics détaillées de la plateforme
- 👥 Gestion des utilisateurs
- 🔍 Modération des produits
- 💸 Gestion des transactions
- 📈 Rapports financiers

## 🛠️ Technologies

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **State Management**: Zustand, React Query
- **Validation**: Zod
- **Maps**: Mapbox / Google Maps
- **Real-time**: Socket.io
- **Payments**: Mobile Money API
- **USSD**: Gateway USSD personnalisé

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/your-username/agri-lien.git
cd agri-lien

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos configurations

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🚀 Scripts Disponibles

```bash
npm run dev          # Démarrer en mode développement
npm run build        # Build pour production
npm start            # Démarrer en production
npm run lint         # Linter le code
npm test             # Lancer les tests
npm run seed         # Peupler la base de données
npm run backup       # Sauvegarder la base de données
```

## 📁 Structure du Projet

```
agri-lien/
├── app/              # Pages et routing Next.js 14
├── components/       # Composants React réutilisables
├── lib/              # Services, utils, hooks
├── public/           # Assets statiques
├── config/           # Configuration
├── database/         # Schémas et migrations
├── scripts/          # Scripts utilitaires
└── docs/             # Documentation
```

## 🌍 Déploiement

Le projet peut être déployé sur:
- **Vercel** (recommandé pour Next.js)
- **Railway**
- **DigitalOcean**
- **AWS**

Consulter [docs/deployment.md](docs/deployment.md) pour les instructions détaillées.

## 🤝 Contribution

Les contributions sont les bienvenues! Consultez [docs/contributing.md](docs/contributing.md) pour:
- Guidelines de contribution
- Standards de code
- Processus de Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Équipe

- **Product Owner**: [Nom]
- **Lead Developer**: [Nom]
- **UI/UX Designer**: [Nom]

## 📞 Contact

- Website: [https://agrilien.bj](https://agrilien.bj)
- Email: contact@agrilien.bj
- Twitter: [@AgriLienBenin](https://twitter.com/AgriLienBenin)

## 🙏 Remerciements

Merci à tous les fermiers béninois qui nous ont inspiré pour créer cette plateforme.

---

**Fait avec ❤️ pour l'agriculture béninoise**
# Agri-lien
