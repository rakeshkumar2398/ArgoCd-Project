-- =========================================================
-- Chai Kafe Database Initialization Script
-- PostgreSQL
-- =========================================================

-- =========================================================
-- Categories Table
-- =========================================================
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- Menu Items Table
-- =========================================================
CREATE TABLE IF NOT EXISTS menu_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    is_available BOOLEAN DEFAULT true,
    category_id INT REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- Users Table
-- =========================================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- Orders Table
-- =========================================================
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    total_amount DECIMAL(10,2) NOT NULL,
    order_status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- Payments Table
-- =========================================================
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'PENDING',
    amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- Categories Seed Data
-- =========================================================
INSERT INTO categories (created_at, description, name)
VALUES
(NOW(), 'Tea items', 'Tea'),
(NOW(), 'Snack items', 'Snacks')
ON CONFLICT (name) DO NOTHING;

-- =========================================================
-- Menu Items Seed Data
-- =========================================================
INSERT INTO menu_items
(created_at, description, image_url, is_available, name, price, stock_quantity, updated_at, category_id)
VALUES
(NOW(), 'Classic Indian masala chai', 'masala-chai.jpg', true, 'Masala Chai', 25.00, 100, NOW(), 1),

(NOW(), 'Fresh ginger flavored tea', 'ginger-tea.jpg', true, 'Ginger Tea', 22.00, 100, NOW(), 1),

(NOW(), 'Healthy green tea', 'green-tea.jpg', true, 'Green Tea', 30.00, 100, NOW(), 1),

(NOW(), 'Badam flavored tea', 'badam-tea.jpg', true, 'Badam Tea', 35.00, 100, NOW(), 1),

(NOW(), 'Honey infused tea', 'honey-tea.jpg', true, 'Honey Tea', 32.00, 100, NOW(), 1),

(NOW(), 'Fresh vegetable sandwich', 'veg-sandwich.jpg', true, 'Veg Sandwich', 60.00, 50, NOW(), 2),

(NOW(), 'Grilled cheese sandwich', 'cheese-sandwich.jpg', true, 'Cheese Sandwich', 70.00, 50, NOW(), 2),

(NOW(), 'Paneer sandwich with fresh stuffing', 'paneer-sandwich.jpg', true, 'Paneer Sandwich', 80.00, 50, NOW(), 2),

(NOW(), 'Crispy veg puff', 'veg-puff.jpg', true, 'Veg Puff', 30.00, 100, NOW(), 2),

(NOW(), 'Hot crispy samosa', 'samosa.jpg', true, 'Samosa', 20.00, 100, NOW(), 2)

ON CONFLICT DO NOTHING;
