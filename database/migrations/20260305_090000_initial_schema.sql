-- UP
-- Migration initiale: Création du schéma de base Agri-Lien
-- Version: 20260305_090000

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (
        role IN (
            'FARMER',
            'BUYER',
            'LOGISTICS',
            'ADMIN'
        )
    ),
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (
        status IN (
            'ACTIVE',
            'PENDING',
            'SUSPENDED',
            'INACTIVE'
        )
    ),
    avatar TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Farmer Profiles
CREATE TABLE farmer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    farm_name VARCHAR(255) NOT NULL,
    farm_location JSONB NOT NULL,
    farm_size DECIMAL(10, 2),
    certifications TEXT[],
    specialties TEXT[],
    rating DECIMAL(3, 2) DEFAULT 0.00,
    total_sales INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Buyer Profiles
CREATE TABLE buyer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID REFERENCES users (id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(50) NOT NULL,
    location JSONB NOT NULL,
    tax_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Logistics Profiles
CREATE TABLE logistics_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    vehicle_types TEXT[],
    coverage_areas TEXT[],
    rating DECIMAL(3, 2) DEFAULT 0.00,
    total_deliveries INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    images TEXT[],
    unit VARCHAR(20) NOT NULL,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    available_quantity DECIMAL(10, 2) NOT NULL,
    minimum_order DECIMAL(10, 2) DEFAULT 1,
    harvest_date DATE,
    expiry_date DATE,
    certifications TEXT[],
    status VARCHAR(20) DEFAULT 'AVAILABLE',
    rating DECIMAL(3, 2) DEFAULT 0.00,
    total_sales INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    buyer_id UUID REFERENCES users (id) ON DELETE CASCADE,
    farmer_id UUID REFERENCES users (id) ON DELETE CASCADE,
    logistics_id UUID REFERENCES users (id),
    items JSONB NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    delivery_fee DECIMAL(10, 2) DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'PENDING',
    payment_status VARCHAR(20) DEFAULT 'PENDING',
    delivery_address TEXT NOT NULL,
    delivery_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    order_id UUID REFERENCES orders (id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'XOF',
    method VARCHAR(20) NOT NULL,
    provider VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    transaction_id VARCHAR(255),
    phone_number VARCHAR(20),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID REFERENCES users (id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    order_id UUID REFERENCES orders (id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES users (id) ON DELETE CASCADE,
    reviewee_id UUID REFERENCES users (id) ON DELETE CASCADE,
    rating INTEGER CHECK (
        rating >= 1
        AND rating <= 5
    ),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users (email);

CREATE INDEX idx_users_phone ON users (phone);

CREATE INDEX idx_users_role ON users (role);

CREATE INDEX idx_users_status ON users (status);

CREATE INDEX idx_farmer_profiles_user ON farmer_profiles (user_id);

CREATE INDEX idx_buyer_profiles_user ON buyer_profiles (user_id);

CREATE INDEX idx_logistics_profiles_user ON logistics_profiles (user_id);

CREATE INDEX idx_products_farmer ON products (farmer_id);

CREATE INDEX idx_products_category ON products (category);

CREATE INDEX idx_products_status ON products (status);

CREATE INDEX idx_products_created ON products (created_at DESC);

CREATE INDEX idx_orders_buyer ON orders (buyer_id);

CREATE INDEX idx_orders_farmer ON orders (farmer_id);

CREATE INDEX idx_orders_logistics ON orders (logistics_id);

CREATE INDEX idx_orders_status ON orders (status);

CREATE INDEX idx_orders_created ON orders (created_at DESC);

CREATE INDEX idx_payments_order ON payments (order_id);

CREATE INDEX idx_payments_status ON payments (status);

CREATE INDEX idx_notifications_user ON notifications (user_id);

CREATE INDEX idx_notifications_read ON notifications (read);

CREATE INDEX idx_reviews_order ON reviews (order_id);

CREATE INDEX idx_reviews_reviewer ON reviews (reviewer_id);

CREATE INDEX idx_reviews_reviewee ON reviews (reviewee_id);

-- Create function for updating updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_farmer_profiles_updated_at 
    BEFORE UPDATE ON farmer_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_buyer_profiles_updated_at 
    BEFORE UPDATE ON buyer_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_logistics_profiles_updated_at 
    BEFORE UPDATE ON logistics_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at 
    BEFORE UPDATE ON orders 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- DOWN
-- Rollback de la migration initiale

-- Drop triggers
DROP TRIGGER IF EXISTS update_users_updated_at ON users;

DROP TRIGGER IF EXISTS update_farmer_profiles_updated_at ON farmer_profiles;

DROP TRIGGER IF EXISTS update_buyer_profiles_updated_at ON buyer_profiles;

DROP TRIGGER IF EXISTS update_logistics_profiles_updated_at ON logistics_profiles;

DROP TRIGGER IF EXISTS update_products_updated_at ON products;

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;

-- Drop function
DROP FUNCTION IF EXISTS update_updated_at_column ();

-- Drop tables in correct order (respecting foreign keys)
DROP TABLE IF EXISTS reviews;

DROP TABLE IF EXISTS notifications;

DROP TABLE IF EXISTS payments;

DROP TABLE IF EXISTS orders;

DROP TABLE IF EXISTS products;

DROP TABLE IF EXISTS logistics_profiles;

DROP TABLE IF EXISTS buyer_profiles;

DROP TABLE IF EXISTS farmer_profiles;

DROP TABLE IF EXISTS users;

-- Drop extension if not used elsewhere
-- DROP EXTENSION IF EXISTS "pgcrypto";