-- Données de test pour Agri-Lien
-- Seed data for development and testing

-- Insert test users
INSERT INTO
    users (
        id,
        email,
        phone,
        password_hash,
        first_name,
        last_name,
        role,
        status
    )
VALUES
    -- Admins
    (
        '550e8400-e29b-41d4-a716-446655440000',
        'admin@agrilienbenin.com',
        '+22997000001',
        '$2b$12$LQv3c1yqBwlVHpPjrAOwL.QfkSgwv0De4vfshK4U.RfqU29.RzGLe',
        'Admin',
        'Système',
        'ADMIN',
        'ACTIVE'
    ),

-- Farmers
(
    '550e8401-e29b-41d4-a716-446655440001',
    'koffi.farmer@gmail.com',
    '+22997000010',
    '$2b$12$LQv3c1yqBwlVHpPjrAOwL.QfkSgwv0De4vfshK4U.RfqU29.RzGLe',
    'Koffi',
    'Agbodjan',
    'FARMER',
    'ACTIVE'
),
(
    '550e8402-e29b-41d4-a716-446655440002',
    'aicha.productrice@gmail.com',
    '+22997000011',
    '$2b$12$LQv3c1yqBwlVHpPjrAOwL.QfkSgwv0De4vfshK4U.RfqU29.RzGLe',
    'Aïcha',
    'Saliou',
    'FARMER',
    'ACTIVE'
),
(
    '550e8403-e29b-41d4-a716-446655440003',
    'joseph.cultivateur@gmail.com',
    '+22997000012',
    '$2b$12$LQv3c1yqBwlVHpPjrAOwL.QfkSgwv0De4vfshK4U.RfqU29.RzGLe',
    'Joseph',
    'Dansou',
    'FARMER',
    'ACTIVE'
),

-- Buyers
(
    '550e8404-e29b-41d4-a716-446655440004',
    'marie.acheteur@gmail.com',
    '+22997000020',
    '$2b$12$LQv3c1yqBwlVHpPjrAOwL.QfkSgwv0De4vfshK4U.RfqU29.RzGLe',
    'Marie',
    'Tchibozo',
    'BUYER',
    'ACTIVE'
),
(
    '550e8405-e29b-41d4-a716-446655440005',
    'ibrahim.commerce@gmail.com',
    '+22997000021',
    '$2b$12$LQv3c1yqBwlVHpPjrAOwL.QfkSgwv0De4vfshK4U.RfqU29.RzGLe',
    'Ibrahim',
    'Sanni',
    'BUYER',
    'ACTIVE'
),
(
    '550e8406-e29b-41d4-a716-446655440006',
    'restaurant.delice@gmail.com',
    '+22997000022',
    '$2b$12$LQv3c1yqBwlVHpPjrAOwL.QfkSgwv0De4vfshK4U.RfqU29.RzGLe',
    'Delice',
    'Restaurant',
    'BUYER',
    'ACTIVE'
),

-- Logistics
(
    '550e8407-e29b-41d4-a716-446655440007',
    'transport.rapide@gmail.com',
    '+22997000030',
    '$2b$12$LQv3c1yqBwlVHpPjrAOwL.QfkSgwv0De4vfshK4U.RfqU29.RzGLe',
    'Rapide',
    'Transport',
    'LOGISTICS',
    'ACTIVE'
),
(
    '550e8408-e29b-41d4-a716-446655440008',
    'livraison.express@gmail.com',
    '+22997000031',
    '$2b$12$LQv3c1yqBwlVHpPjrAOwL.QfkSgwv0De4vfshK4U.RfqU29.RzGLe',
    'Express',
    'Livraison',
    'LOGISTICS',
    'ACTIVE'
);

-- Insert farmer profiles
INSERT INTO farmer_profiles (user_id, farm_name, farm_location, farm_size, specialties, rating, total_sales) VALUES
('550e8401-e29b-41d4-a716-446655440001', 'Ferme Agbodjan', '{"ville": "Cotonou", "commune": "Akpakpa", "coordinates": {"lat": 6.3654, "lng": 2.4183}}', 5.5, ARRAY['Légumes', 'Tubercules'], 4.8, 156),
('550e8402-e29b-41d4-a716-446655440002', 'Exploitation Saliou', '{"ville": "Parakou", "commune": "Parakou 1", "coordinates": {"lat": 9.3379, "lng": 2.6303}}', 12.3, ARRAY['Céréales', 'Légumineuses'], 4.6, 89),
('550e8403-e29b-41d4-a716-446655440003', 'Ferme Dansou Bio', '{"ville": "Natitingou", "commune": "Natitingou 1", "coordinates": {"lat": 10.3040, "lng": 1.3797}}', 8.7, ARRAY['Fruits', 'Épices'], 4.9, 203);

-- Insert buyer profiles
INSERT INTO
    buyer_profiles (
        user_id,
        business_name,
        business_type,
        location
    )
VALUES (
        '550e8404-e29b-41d4-a716-446655440004',
        'Marie Commerce',
        'Détail',
        '{"ville": "Cotonou", "commune": "Cadjehoun", "coordinates": {"lat": 6.3573, "lng": 2.3894}}'
    ),
    (
        '550e8405-e29b-41d4-a716-446655440005',
        'Sanni Distribution',
        'Grossiste',
        '{"ville": "Porto-Novo", "commune": "Porto-Novo 1", "coordinates": {"lat": 6.4969, "lng": 2.6289}}'
    ),
    (
        '550e8406-e29b-41d4-a716-446655440006',
        'Restaurant Le Délice',
        'Restaurant',
        '{"ville": "Cotonou", "commune": "Ganhi", "coordinates": {"lat": 6.3840, "lng": 2.4094}}'
    );

-- Insert logistics profiles
INSERT INTO logistics_profiles (user_id, company_name, vehicle_types, coverage_areas, rating, total_deliveries) VALUES
('550e8407-e29b-41d4-a716-446655440007', 'Transport Rapide SARL', ARRAY['Camion', 'Moto'], ARRAY['Littoral', 'Ouémé'], 4.7, 445),
('550e8408-e29b-41d4-a716-446655440008', 'Express Livraison', ARRAY['Tricycle', 'Voiture'], ARRAY['Atlantique', 'Littoral'], 4.5, 289);

-- Insert sample products
INSERT INTO
    products (
        id,
        farmer_id,
        name,
        category,
        description,
        unit,
        price_per_unit,
        available_quantity,
        minimum_order,
        harvest_date,
        status,
        rating
    )
VALUES
    -- Koffi's products
    (
        '660e8400-e29b-41d4-a716-446655440000',
        '550e8401-e29b-41d4-a716-446655440001',
        'Tomates cerises',
        'Légumes',
        'Tomates cerises biologiques, fraîches et savoureuses',
        'kg',
        1500.00,
        50.00,
        2.00,
        CURRENT_DATE - INTERVAL '2 days',
        'AVAILABLE',
        4.8
    ),
    (
        '660e8401-e29b-41d4-a716-446655440001',
        '550e8401-e29b-41d4-a716-446655440001',
        'Piments verts',
        'Légumes',
        'Piments verts frais, idéaux pour vos sauces',
        'kg',
        2000.00,
        25.00,
        1.00,
        CURRENT_DATE - INTERVAL '1 day',
        'AVAILABLE',
        4.7
    ),
    (
        '660e8402-e29b-41d4-a716-446655440002',
        '550e8401-e29b-41d4-a716-446655440001',
        'Ignames blanches',
        'Tubercules',
        'Ignames blanches de qualité supérieure',
        'kg',
        800.00,
        100.00,
        5.00,
        CURRENT_DATE - INTERVAL '3 days',
        'AVAILABLE',
        4.9
    ),

-- Aïcha's products
(
    '660e8403-e29b-41d4-a716-446655440003',
    '550e8402-e29b-41d4-a716-446655440002',
    'Haricots niébé',
    'Légumineuses',
    'Haricots niébé (haricots à œil noir) de première qualité',
    'kg',
    1200.00,
    75.00,
    3.00,
    CURRENT_DATE - INTERVAL '5 days',
    'AVAILABLE',
    4.6
),
(
    '660e8404-e29b-41d4-a716-446655440004',
    '550e8402-e29b-41d4-a716-446655440002',
    'Maïs blanc',
    'Céréales',
    'Maïs blanc séché, parfait pour la farine',
    'kg',
    600.00,
    200.00,
    10.00,
    CURRENT_DATE - INTERVAL '7 days',
    'AVAILABLE',
    4.8
),

-- Joseph's products
(
    '660e8405-e29b-41d4-a716-446655440005',
    '550e8403-e29b-41d4-a716-446655440003',
    'Mangues Kent',
    'Fruits',
    'Mangues Kent sucrées et juteuses',
    'kg',
    1800.00,
    40.00,
    2.00,
    CURRENT_DATE - INTERVAL '1 day',
    'AVAILABLE',
    4.9
),
(
    '660e8406-e29b-41d4-a716-446655440006',
    '550e8403-e29b-41d4-a716-446655440003',
    'Gingembre frais',
    'Épices',
    'Gingembre frais biologiquement cultivé',
    'kg',
    3000.00,
    15.00,
    1.00,
    CURRENT_DATE,
    'AVAILABLE',
    4.7
);

-- Insert sample orders
INSERT INTO
    orders (
        id,
        order_number,
        buyer_id,
        farmer_id,
        items,
        subtotal,
        delivery_fee,
        total_amount,
        status,
        payment_status,
        delivery_address,
        delivery_date,
        notes
    )
VALUES (
        '770e8400-e29b-41d4-a716-446655440000',
        'AGR-2026-001',
        '550e8404-e29b-41d4-a716-446655440004',
        '550e8401-e29b-41d4-a716-446655440001',
        '[{"productId": "660e8400-e29b-41d4-a716-446655440000", "name": "Tomates cerises", "quantity": 5, "price": 1500, "total": 7500}]',
        7500.00,
        1000.00,
        8500.00,
        'DELIVERED',
        'COMPLETED',
        'Cadjehoun, Cotonou',
        CURRENT_DATE + INTERVAL '1 day',
        'Livrer avant 18h'
    ),
    (
        '770e8401-e29b-41d4-a716-446655440001',
        'AGR-2026-002',
        '550e8405-e29b-41d4-a716-446655440005',
        '550e8402-e29b-41d4-a716-446655440002',
        '[{"productId": "660e8404-e29b-41d4-a716-446655440004", "name": "Maïs blanc", "quantity": 50, "price": 600, "total": 30000}]',
        30000.00,
        2500.00,
        32500.00,
        'IN_TRANSIT',
        'COMPLETED',
        'Porto-Novo Centre',
        CURRENT_DATE + INTERVAL '2 days',
        'Commande urgente'
    );

-- Insert sample payments
INSERT INTO
    payments (
        order_id,
        amount,
        method,
        provider,
        status,
        transaction_id,
        phone_number
    )
VALUES (
        '770e8400-e29b-41d4-a716-446655440000',
        8500.00,
        'MOBILE_MONEY',
        'MTN',
        'COMPLETED',
        'MTN-TXN-20260305-001',
        '+22997000020'
    ),
    (
        '770e8401-e29b-41d4-a716-446655440001',
        32500.00,
        'MOBILE_MONEY',
        'MOOV',
        'COMPLETED',
        'MOOV-TXN-20260305-002',
        '+22997000021'
    );

-- Insert sample cart items
INSERT INTO
    cart_items (user_id, product_id, quantity)
VALUES (
        '550e8404-e29b-41d4-a716-446655440004',
        '660e8401-e29b-41d4-a716-446655440001',
        3.00
    ),
    (
        '550e8404-e29b-41d4-a716-446655440004',
        '660e8405-e29b-41d4-a716-446655440005',
        2.00
    ),
    (
        '550e8405-e29b-41d4-a716-446655440005',
        '660e8403-e29b-41d4-a716-446655440003',
        10.00
    );

-- Insert sample favorites
INSERT INTO
    favorites (user_id, product_id)
VALUES (
        '550e8404-e29b-41d4-a716-446655440004',
        '660e8400-e29b-41d4-a716-446655440000'
    ),
    (
        '550e8404-e29b-41d4-a716-446655440004',
        '660e8405-e29b-41d4-a716-446655440005'
    ),
    (
        '550e8405-e29b-41d4-a716-446655440005',
        '660e8402-e29b-41d4-a716-446655440002'
    ),
    (
        '550e8406-e29b-41d4-a716-446655440006',
        '660e8400-e29b-41d4-a716-446655440000'
    );

-- Insert sample messages
INSERT INTO
    messages (
        sender_id,
        recipient_id,
        order_id,
        message,
        message_type
    )
VALUES (
        '550e8404-e29b-41d4-a716-446655440004',
        '550e8401-e29b-41d4-a716-446655440001',
        '770e8400-e29b-41d4-a716-446655440000',
        'Bonjour, à quelle heure puis-je passer récupérer ma commande ?',
        'text'
    ),
    (
        '550e8401-e29b-41d4-a716-446655440001',
        '550e8404-e29b-41d4-a716-446655440004',
        '770e8400-e29b-41d4-a716-446655440000',
        'Bonjour Marie, vous pouvez passer à partir de 14h. Les tomates sont fraîches !',
        'text'
    ),
    (
        '550e8405-e29b-41d4-a716-446655440005',
        '550e8402-e29b-41d4-a716-446655440002',
        '770e8401-e29b-41d4-a716-446655440001',
        'Le maïs est-il bien séché ? J''ai besoin d''une qualité pour export.',
        'text'
    );

-- Insert sample reviews
INSERT INTO
    reviews (
        order_id,
        reviewer_id,
        reviewee_id,
        rating,
        comment
    )
VALUES (
        '770e8400-e29b-41d4-a716-446655440000',
        '550e8404-e29b-41d4-a716-446655440004',
        '550e8401-e29b-41d4-a716-446655440001',
        5,
        'Excellent ! Les tomates étaient parfaitement mûres et très savoureuses. Je recommande vivement Koffi !'
    ),
    (
        '770e8401-e29b-41d4-a716-446655440001',
        '550e8405-e29b-41d4-a716-446655440005',
        '550e8402-e29b-41d4-a716-446655440002',
        4,
        'Bonne qualité de maïs, livraison rapide. Aïcha est une productrice fiable.'
    );

-- Insert sample analytics events
INSERT INTO
    analytics_events (
        user_id,
        event_type,
        event_data,
        session_id
    )
VALUES (
        '550e8404-e29b-41d4-a716-446655440004',
        'product_view',
        '{"productId": "660e8400-e29b-41d4-a716-446655440000", "category": "Légumes"}',
        'sess-001'
    ),
    (
        '550e8404-e29b-41d4-a716-446655440004',
        'add_to_cart',
        '{"productId": "660e8400-e29b-41d4-a716-446655440000", "quantity": 5}',
        'sess-001'
    ),
    (
        '550e8405-e29b-41d4-a716-446655440005',
        'search',
        '{"query": "maïs", "results": 3}',
        'sess-002'
    ),
    (
        '550e8406-e29b-41d4-a716-446655440006',
        'order_complete',
        '{"orderId": "770e8400-e29b-41d4-a716-446655440000", "amount": 8500}',
        'sess-003'
    );