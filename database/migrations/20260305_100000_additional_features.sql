-- UP
-- Migration supplémentaire: Fonctionnalités avancées Agri-Lien
-- Version: 20260305_100000

-- Product Categories (for better organization)
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    parent_id UUID REFERENCES categories (id),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart Items (persistent shopping cart)
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID REFERENCES users (id) ON DELETE CASCADE,
    product_id UUID REFERENCES products (id) ON DELETE CASCADE,
    quantity DECIMAL(10, 2) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, product_id)
);

-- Favorites/Wishlist
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID REFERENCES users (id) ON DELETE CASCADE,
    product_id UUID REFERENCES products (id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, product_id)
);

-- Messages/Chat System
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    sender_id UUID REFERENCES users (id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES users (id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders (id),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    message_type VARCHAR(20) DEFAULT 'text' CHECK (
        message_type IN (
            'text',
            'image',
            'file',
            'system',
            'order_update'
        )
    ),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics Events (for tracking user behavior)
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID REFERENCES users (id) ON DELETE SET NULL,
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB,
    session_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Sessions (for better session management)
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID REFERENCES users (id) ON DELETE CASCADE,
    token_hash VARCHAR(255) UNIQUE NOT NULL,
    device_info JSONB,
    ip_address INET,
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMP NOT NULL,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product Stock History (for inventory tracking)
CREATE TABLE stock_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    product_id UUID REFERENCES products (id) ON DELETE CASCADE,
    change_type VARCHAR(20) NOT NULL CHECK (
        change_type IN (
            'restock',
            'sale',
            'adjustment',
            'waste',
            'return'
        )
    ),
    quantity_change DECIMAL(10, 2) NOT NULL,
    previous_quantity DECIMAL(10, 2) NOT NULL,
    new_quantity DECIMAL(10, 2) NOT NULL,
    note TEXT,
    created_by UUID REFERENCES users (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Delivery Routes (for logistics optimization)
CREATE TABLE delivery_routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    logistics_id UUID REFERENCES users (id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    route_data JSONB NOT NULL, -- GPS coordinates, stops, etc.
    estimated_duration INTEGER, -- in minutes
    max_capacity DECIMAL(10, 2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Status History (for detailed tracking)
CREATE TABLE order_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    order_id UUID REFERENCES orders (id) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL,
    note TEXT,
    location JSONB,
    created_by UUID REFERENCES users (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for new tables
CREATE INDEX idx_categories_parent ON categories (parent_id);

CREATE INDEX idx_categories_slug ON categories (slug);

CREATE INDEX idx_categories_active ON categories (is_active);

CREATE INDEX idx_cart_items_user ON cart_items (user_id);

CREATE INDEX idx_cart_items_product ON cart_items (product_id);

CREATE INDEX idx_favorites_user ON favorites (user_id);

CREATE INDEX idx_favorites_product ON favorites (product_id);

CREATE INDEX idx_messages_sender ON messages (sender_id);

CREATE INDEX idx_messages_recipient ON messages (recipient_id);

CREATE INDEX idx_messages_order ON messages (order_id);

CREATE INDEX idx_messages_read ON messages (is_read);

CREATE INDEX idx_messages_created ON messages (created_at DESC);

CREATE INDEX idx_analytics_events_user ON analytics_events (user_id);

CREATE INDEX idx_analytics_events_type ON analytics_events (event_type);

CREATE INDEX idx_analytics_events_created ON analytics_events (created_at);

CREATE INDEX idx_user_sessions_user ON user_sessions (user_id);

CREATE INDEX idx_user_sessions_token ON user_sessions (token_hash);

CREATE INDEX idx_user_sessions_active ON user_sessions (is_active);

CREATE INDEX idx_user_sessions_expires ON user_sessions (expires_at);

CREATE INDEX idx_stock_history_product ON stock_history (product_id);

CREATE INDEX idx_stock_history_type ON stock_history (change_type);

CREATE INDEX idx_stock_history_created ON stock_history (created_at DESC);

CREATE INDEX idx_delivery_routes_logistics ON delivery_routes (logistics_id);

CREATE INDEX idx_delivery_routes_active ON delivery_routes (is_active);

CREATE INDEX idx_order_status_history_order ON order_status_history (order_id);

CREATE INDEX idx_order_status_history_created ON order_status_history (created_at DESC);

-- Create triggers for updated_at columns
CREATE TRIGGER update_categories_updated_at 
    BEFORE UPDATE ON categories 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at 
    BEFORE UPDATE ON cart_items 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_delivery_routes_updated_at 
    BEFORE UPDATE ON delivery_routes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default categories
INSERT INTO
    categories (
        name,
        slug,
        description,
        icon,
        sort_order
    )
VALUES (
        'Légumes',
        'legumes',
        'Légumes frais et de saison',
        '🥬',
        1
    ),
    (
        'Fruits',
        'fruits',
        'Fruits tropicaux et locaux',
        '🍌',
        2
    ),
    (
        'Céréales',
        'cereales',
        'Riz, maïs, mil et autres céréales',
        '🌾',
        3
    ),
    (
        'Tubercules',
        'tubercules',
        'Igname, manioc, patate douce',
        '🍠',
        4
    ),
    (
        'Légumineuses',
        'legumineuses',
        'Haricots, niébé, arachides',
        '🫘',
        5
    ),
    (
        'Épices',
        'epices',
        'Épices et condiments locaux',
        '🌶️',
        6
    ),
    (
        'Autres',
        'autres',
        'Autres produits agricoles',
        '📦',
        7
    );

-- DOWN
-- Rollback de la migration supplémentaire

-- Drop triggers
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;

DROP TRIGGER IF EXISTS update_cart_items_updated_at ON cart_items;

DROP TRIGGER IF EXISTS update_delivery_routes_updated_at ON delivery_routes;

-- Drop tables in reverse order
DROP TABLE IF EXISTS order_status_history;

DROP TABLE IF EXISTS delivery_routes;

DROP TABLE IF EXISTS stock_history;

DROP TABLE IF EXISTS user_sessions;

DROP TABLE IF EXISTS analytics_events;

DROP TABLE IF EXISTS messages;

DROP TABLE IF EXISTS favorites;

DROP TABLE IF EXISTS cart_items;

DROP TABLE IF EXISTS categories;