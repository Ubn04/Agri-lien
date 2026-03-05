# 🗄️ Guide Base de Données Agri-Lien

## Démarrage Rapide

### 1. Prérequis

```bash
# Installer PostgreSQL (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Démarrer le service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Configuration Automatique

```bash
# Installation complète (recommandée pour développement)
./scripts/db-setup.sh init

# Ou étape par étape
./scripts/db-setup.sh setup    # Créer DB et utilisateur
./scripts/db-setup.sh migrate  # Exécuter migrations
./scripts/db-setup.sh seed     # Insérer données de test
```

### 3. Configuration Manuelle (Alternative)

#### Créer la base de données :

```bash
sudo -u postgres createuser -P agrilienuser  # Mot de passe: agrilienpass
sudo -u postgres createdb -O agrilienuser agriliendb
```

#### Variables d'environnement :

```bash
cp .env.example .env
# Modifier les valeurs dans .env selon vos besoins
```

### 4. Vérification

```bash
# Tester la connexion
./scripts/db-setup.sh test

# Ou manuellement
psql -h localhost -U agrilienuser -d agriliendb -c "SELECT COUNT(*) FROM users;"
```

## Structure de la Base de Données

### Tables Principales

- **users** : Utilisateurs (farmers, buyers, logistics, admin)
- **farmer_profiles** : Profils détaillés des fermiers
- **buyer_profiles** : Profils des acheteurs
- **logistics_profiles** : Profils des transporteurs
- **products** : Catalogue des produits agricoles
- **orders** : Commandes et transactions
- **payments** : Paiements Mobile Money

### Tables Fonctionnelles

- **categories** : Classification des produits
- **cart_items** : Paniers d'achat persistants
- **favorites** : Produits favoris des utilisateurs
- **messages** : Système de messagerie
- **notifications** : Notifications push
- **reviews** : Évaluations et commentaires

### Tables d'Analytics

- **analytics_events** : Suivi des actions utilisateurs
- **stock_history** : Historique des stocks
- **order_status_history** : Historique des statuts de commandes
- **user_sessions** : Gestion des sessions

## Commandes Utiles

### Maintenance

```bash
# Sauvegarde
./scripts/db-setup.sh backup

# Restauration
./scripts/db-setup.sh restore backup_file.sql

# Réinitialisation complète
./scripts/db-setup.sh reset
```

### Développement

```bash
# Connexion directe à la DB
psql -h localhost -U agrilienuser -d agriliendb

# Voir les tables
\dt

# Voir la structure d'une table
\d users

# Quitter
\q
```

### Requêtes Exemple

```sql
-- Statistiques utilisateurs
SELECT role, COUNT(*) FROM users GROUP BY role;

-- Produits par catégorie
SELECT p.category, COUNT(*) as nb_products, AVG(p.price_per_unit) as prix_moyen
FROM products p
WHERE p.status = 'AVAILABLE'
GROUP BY p.category;

-- Top fermiers par ventes
SELECT u.first_name, u.last_name, fp.total_sales, fp.rating
FROM users u
JOIN farmer_profiles fp ON u.id = fp.user_id
ORDER BY fp.total_sales DESC
LIMIT 5;

-- Commandes récentes
SELECT o.order_number, u.first_name as buyer, o.total_amount, o.status
FROM orders o
JOIN users u ON o.buyer_id = u.id
ORDER BY o.created_at DESC
LIMIT 10;
```

## Données de Test

Le script d'installation inclut des données de test :

### Comptes utilisateur (mot de passe: `password123`)

- **Admin** : admin@agrilienbenin.com
- **Fermiers** :
  - koffi.farmer@gmail.com (Ferme Agbodjan)
  - aicha.productrice@gmail.com (Exploitation Saliou)
  - joseph.cultivateur@gmail.com (Ferme Dansou Bio)
- **Acheteurs** :
  - marie.acheteur@gmail.com (Commerce de détail)
  - ibrahim.commerce@gmail.com (Grossiste)
  - restaurant.delice@gmail.com (Restaurant)

### Produits exemple

- Tomates cerises, Piments verts, Ignames (Koffi)
- Haricots niébé, Maïs blanc (Aïcha)
- Mangues Kent, Gingembre frais (Joseph)

## Dépannage

### Erreur de connexion

```bash
# Vérifier que PostgreSQL fonctionne
sudo systemctl status postgresql

# Redémarrer si nécessaire
sudo systemctl restart postgresql
```

### Permissions insuffisantes

```bash
# Accorder tous les privilèges
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE agriliendb TO agrilienuser;"
```

### Réinitialisation des mots de passe

```sql
-- Se connecter en tant que postgres
sudo -u postgres psql

-- Changer le mot de passe
ALTER USER agrilienuser PASSWORD 'nouveau_mot_de_passe';
```

---

💡 **Conseil** : Pour la production, utilisez des mots de passe sécurisés et configurez SSL pour PostgreSQL.
