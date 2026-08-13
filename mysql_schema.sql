-- =========================================================================
-- INNOVEITY TECH SOLUTION - MYSQL PRODUCTION DATABASE SCHEMA
-- Execute this SQL script in your MySQL Database (phpMyAdmin, Workbench, CLI, PlanetScale, Hostinger, etc.)
-- =========================================================================

CREATE DATABASE IF NOT EXISTS `innoveity_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `innoveity_db`;

-- 1. Key-Value Settings Table for CMS Sections (Home, About, Contact, SEO, Custom Fields)
CREATE TABLE IF NOT EXISTS `cms_settings` (
    `key` VARCHAR(255) NOT NULL PRIMARY KEY,
    `value` LONGTEXT NOT NULL,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS `cms_projects` (
    `id` BIGINT NOT NULL PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `category` VARCHAR(255) DEFAULT NULL,
    `description` TEXT DEFAULT NULL,
    `image` TEXT DEFAULT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Showcase Projects Table
CREATE TABLE IF NOT EXISTS `cms_showcase_projects` (
    `id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `tag` VARCHAR(255) DEFAULT NULL,
    `title` VARCHAR(255) NOT NULL,
    `subtitle` VARCHAR(255) DEFAULT NULL,
    `description` TEXT DEFAULT NULL,
    `image` TEXT DEFAULT NULL,
    `tech` LONGTEXT DEFAULT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Team Members Table
CREATE TABLE IF NOT EXISTS `cms_team` (
    `id` BIGINT NOT NULL PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) DEFAULT NULL,
    `category` VARCHAR(255) DEFAULT 'Team Member',
    `image` TEXT DEFAULT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Admin Users Table
CREATE TABLE IF NOT EXISTS `cms_admin_users` (
    `id` BIGINT NOT NULL PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) DEFAULT 'Admin',
    `status` VARCHAR(50) DEFAULT 'Active',
    `last_login` VARCHAR(255) DEFAULT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Success! Schema created.
