#!/bin/bash

# Agri-Lien Database Manager
# Script de gestion de la base de données PostgreSQL

set -e

# Configuration par défaut
DB_NAME="${DB_NAME:-agriliendb}"
DB_USER="${DB_USER:-agrilienuser}"
DB_PASSWORD="${DB_PASSWORD:-agrilienpass}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonctions utilitaires
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier si PostgreSQL est installé
check_postgresql() {
    if ! command -v psql &> /dev/null; then
        log_error "PostgreSQL n'est pas installé. Installez-le d'abord :"
        echo "  sudo apt update && sudo apt install postgresql postgresql-contrib"
        exit 1
    fi
    log_success "PostgreSQL détecté"
}

# Créer la base de données et l'utilisateur
setup_database() {
    log_info "Configuration de la base de données..."
    
    # Se connecter en tant que superuser postgres
    sudo -u postgres psql << EOF
-- Créer l'utilisateur s'il n'existe pas
DO \$\$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '$DB_USER') THEN
        CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';
    END IF;
END
\$\$;

-- Créer la base de données si elle n'existe pas
SELECT 'CREATE DATABASE $DB_NAME OWNER $DB_USER'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME');

-- Accorder les privilèges
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
ALTER USER $DB_USER CREATEDB;
EOF

    log_success "Base de données '$DB_NAME' et utilisateur '$DB_USER' configurés"
}

# Exécuter les migrations
run_migrations() {
    log_info "Exécution des migrations..."
    
    export PGPASSWORD="$DB_PASSWORD"
    
    # Migration initiale
    if [ -f "database/migrations/20260305_090000_initial_schema.sql" ]; then
        log_info "Exécution de la migration initiale..."
        psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f database/migrations/20260305_090000_initial_schema.sql
        log_success "Migration initiale terminée"
    fi
    
    # Migrations supplémentaires
    if [ -f "database/migrations/20260305_100000_additional_features.sql" ]; then
        log_info "Exécution des fonctionnalités supplémentaires..."
        psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f database/migrations/20260305_100000_additional_features.sql
        log_success "Fonctionnalités supplémentaires ajoutées"
    fi
}

# Insérer les données de test
seed_database() {
    log_info "Insertion des données de test..."
    
    export PGPASSWORD="$DB_PASSWORD"
    
    if [ -f "database/seeds.sql" ]; then
        psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f database/seeds.sql
        log_success "Données de test insérées"
    else
        log_warning "Fichier seeds.sql non trouvé"
    fi
}

# Réinitialiser la base de données
reset_database() {
    log_warning "ATTENTION: Cette action va supprimer toutes les données !"
    read -p "Êtes-vous sûr de vouloir continuer ? (y/N): " confirm
    
    if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
        log_info "Réinitialisation de la base de données..."
        
        export PGPASSWORD="$DB_PASSWORD"
        
        # Supprimer et recréer la base
        sudo -u postgres psql << EOF
DROP DATABASE IF EXISTS $DB_NAME;
CREATE DATABASE $DB_NAME OWNER $DB_USER;
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
EOF
        
        run_migrations
        log_success "Base de données réinitialisée"
    else
        log_info "Opération annulée"
    fi
}

# Sauvegarder la base de données
backup_database() {
    local backup_file="backup_agrilien_$(date +%Y%m%d_%H%M%S).sql"
    log_info "Sauvegarde vers $backup_file..."
    
    export PGPASSWORD="$DB_PASSWORD"
    pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_NAME > $backup_file
    
    log_success "Sauvegarde créée: $backup_file"
}

# Restaurer depuis une sauvegarde
restore_database() {
    local backup_file="$1"
    
    if [ ! -f "$backup_file" ]; then
        log_error "Fichier de sauvegarde '$backup_file' non trouvé"
        exit 1
    fi
    
    log_info "Restauration depuis $backup_file..."
    
    export PGPASSWORD="$DB_PASSWORD"
    psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f "$backup_file"
    
    log_success "Base de données restaurée"
}

# Vérifier la connexion
test_connection() {
    log_info "Test de connexion à la base de données..."
    
    export PGPASSWORD="$DB_PASSWORD"
    if psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "SELECT version();" > /dev/null 2>&1; then
        log_success "Connexion réussie à PostgreSQL"
        psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "
            SELECT 
                schemaname, 
                tablename, 
                pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
            FROM pg_tables 
            WHERE schemaname = 'public' 
            ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
        "
    else
        log_error "Échec de la connexion"
        exit 1
    fi
}

# Afficher l'aide
show_help() {
    echo "Agri-Lien Database Manager"
    echo "========================="
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  setup     - Créer la base de données et l'utilisateur"
    echo "  migrate   - Exécuter les migrations"
    echo "  seed      - Insérer les données de test"
    echo "  init      - setup + migrate + seed (installation complète)"
    echo "  reset     - Réinitialiser complètement la base"
    echo "  backup    - Sauvegarder la base de données"
    echo "  restore   - Restaurer depuis un fichier [fichier.sql]"
    echo "  test      - Tester la connexion et afficher les tables"
    echo "  help      - Afficher cette aide"
    echo ""
    echo "Variables d'environnement:"
    echo "  DB_NAME     - Nom de la base (défaut: agriliendb)"
    echo "  DB_USER     - Utilisateur (défaut: agrilienuser)"
    echo "  DB_PASSWORD - Mot de passe (défaut: agrilienpass)"
    echo "  DB_HOST     - Hôte (défaut: localhost)"
    echo "  DB_PORT     - Port (défaut: 5432)"
    echo ""
    echo "Exemples:"
    echo "  $0 init                     # Installation complète"
    echo "  DB_NAME=mondb $0 setup      # Avec nom personnalisé"
    echo "  $0 restore backup.sql       # Restaurer une sauvegarde"
}

# Main
case "$1" in
    setup)
        check_postgresql
        setup_database
        ;;
    migrate)
        run_migrations
        ;;
    seed)
        seed_database
        ;;
    init)
        check_postgresql
        setup_database
        run_migrations
        seed_database
        log_success "🌾 Base de données Agri-Lien prête !"
        ;;
    reset)
        check_postgresql
        reset_database
        ;;
    backup)
        backup_database
        ;;
    restore)
        if [ -z "$2" ]; then
            log_error "Fichier de sauvegarde requis"
            echo "Usage: $0 restore <fichier.sql>"
            exit 1
        fi
        restore_database "$2"
        ;;
    test)
        test_connection
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        log_error "Commande inconnue: $1"
        show_help
        exit 1
        ;;
esac