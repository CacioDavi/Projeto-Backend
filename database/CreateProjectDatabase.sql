
-- =========================================
-- BANCO DE DADOS
-- =========================================
CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- =========================================
-- EXCLUSÃO DAS TABELAS
-- =========================================

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS product_categories;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS product_options;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

-- =========================================
-- 1. USERS
-- =========================================

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================
-- 2. CATEGORIES
-- =========================================

CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    use_in_menu TINYINT(1) DEFAULT 0,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================
-- 3. PRODUCTS
-- =========================================

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    enabled TINYINT(1) DEFAULT 0,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    use_in_menu TINYINT(1) DEFAULT 0,
    stock INT DEFAULT 0,
    description VARCHAR(255),
    price DECIMAL(19,2) NOT NULL,
    price_with_discount DECIMAL(19,2) NOT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================
-- 4. PRODUCT_IMAGES
-- =========================================

CREATE TABLE product_images (
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    enabled TINYINT(1) DEFAULT 0,
    path VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),

    KEY fk_product_id (product_id),

    CONSTRAINT fk_product_id
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================
-- 5. PRODUCT_OPTIONS
-- =========================================

CREATE TABLE product_options (
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    shape ENUM('square', 'circle') DEFAULT 'square',
    radius INT DEFAULT 0,
    type ENUM('text', 'color') DEFAULT 'text',
    `values` VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),

    KEY fk_product_options_product (product_id),

    CONSTRAINT fk_product_options_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================
-- 6. PRODUCT_CATEGORIES
-- =========================================

CREATE TABLE product_categories (
    product_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (product_id, category_id),

    KEY fk_product_categories_category (category_id),

    CONSTRAINT fk_product_categories_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_product_categories_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
