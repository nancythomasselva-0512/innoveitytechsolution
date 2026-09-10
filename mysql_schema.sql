-- =========================================================================
-- INNOVEITY TECH SOLUTION - MYSQL PRODUCTION DATABASE SCHEMA & SEED DATA
-- Execute this SQL script in your MySQL Database (phpMyAdmin, cPanel, MySQL CLI, PlanetScale, AWS RDS, etc.)
-- =========================================================================

CREATE DATABASE IF NOT EXISTS `innoveity_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `innoveity_db`;

-- 1. Key-Value Settings Table for CMS Sections (Home, About, Contact, SEO, Custom Fields, Full Collections Backup)
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
    `image` LONGTEXT DEFAULT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Showcase Projects Table
CREATE TABLE IF NOT EXISTS `cms_showcase_projects` (
    `id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `tag` VARCHAR(255) DEFAULT NULL,
    `title` VARCHAR(255) NOT NULL,
    `subtitle` VARCHAR(255) DEFAULT NULL,
    `description` TEXT DEFAULT NULL,
    `image` LONGTEXT DEFAULT NULL,
    `tech` LONGTEXT DEFAULT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Team Members Table
CREATE TABLE IF NOT EXISTS `cms_team` (
    `id` BIGINT NOT NULL PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) DEFAULT NULL,
    `category` VARCHAR(255) DEFAULT 'Team Member',
    `image` LONGTEXT DEFAULT NULL,
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

-- 6. Testimonials Table
CREATE TABLE IF NOT EXISTS `cms_testimonials` (
    `id` BIGINT NOT NULL PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) DEFAULT 'Client',
    `company` VARCHAR(255) DEFAULT '',
    `rating` INT DEFAULT 5,
    `content` TEXT DEFAULT NULL,
    `avatar` LONGTEXT DEFAULT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Media Gallery Table
CREATE TABLE IF NOT EXISTS `cms_media_gallery` (
    `id` BIGINT NOT NULL PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `category` VARCHAR(255) DEFAULT 'Tech Showcase',
    `videoUrl` LONGTEXT DEFAULT NULL,
    `thumbnail` LONGTEXT DEFAULT NULL,
    `description` TEXT DEFAULT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Careers Table
CREATE TABLE IF NOT EXISTS `cms_careers` (
    `id` BIGINT NOT NULL PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `department` VARCHAR(255) DEFAULT 'Engineering',
    `location` VARCHAR(255) DEFAULT 'Remote / Chennai',
    `type` VARCHAR(255) DEFAULT 'Full-Time',
    `experience` VARCHAR(255) DEFAULT '1+ Years',
    `status` VARCHAR(50) DEFAULT 'Active',
    `description` TEXT DEFAULT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Blog Posts Table
CREATE TABLE IF NOT EXISTS `cms_blog_posts` (
    `id` BIGINT NOT NULL PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `category` VARCHAR(255) DEFAULT 'Engineering',
    `author` VARCHAR(255) DEFAULT 'Innoveity Team',
    `readTime` VARCHAR(100) DEFAULT '4 min read',
    `date` VARCHAR(100) DEFAULT NULL,
    `excerpt` TEXT DEFAULT NULL,
    `coverImage` LONGTEXT DEFAULT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Services List Table
CREATE TABLE IF NOT EXISTS `cms_services_list` (
    `id` BIGINT NOT NULL PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `category` VARCHAR(255) DEFAULT 'Engineering',
    `tagline` VARCHAR(255) DEFAULT '',
    `deliverables` LONGTEXT DEFAULT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS `cms_contact_inquiries` (
    `id` BIGINT NOT NULL PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(100) DEFAULT 'N/A',
    `company` VARCHAR(255) DEFAULT 'N/A',
    `subject` VARCHAR(255) DEFAULT 'General Inquiry',
    `message` TEXT DEFAULT NULL,
    `date` VARCHAR(100) DEFAULT 'Just now',
    `status` VARCHAR(50) DEFAULT 'New',
    `internalNotes` TEXT DEFAULT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================================
-- INITIAL SEED DATA
-- =========================================================================

-- Seed Default Admin & Super Admin Accounts
INSERT INTO `cms_admin_users` (`id`, `name`, `email`, `password`, `role`, `status`, `last_login`)
VALUES
(1, 'Super Admin Master', 'innoveitytech@gmail.com', 'superadmin123', 'Super Admin', 'Active', 'Just now'),
(2, 'Admin Content Manager', 'innoveityadmin@gmail.com', 'admin123', 'Admin', 'Active', 'Just now')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `role`=VALUES(`role`), `status`=VALUES(`status`);

-- Seed Default Leadership & Team Members
INSERT INTO `cms_team` (`id`, `name`, `role`, `category`, `image`)
VALUES
(101, 'Founder & CEO', 'Founder & Managing Director', 'Leadership', '/Founder.jpeg'),
(102, 'Co-Founder & CEO', 'Chief Executive Officer', 'Leadership', '/CEO.jpeg'),
(1, 'Praveen', 'Team Member', 'Team Member', '/Praveen.jpeg'),
(2, 'Nancy', 'Team Member', 'Team Member', '/Nancy.jpeg'),
(3, 'Raghul', 'Team Member', 'Team Member', '/Raghul.jpeg'),
(4, 'Zubariya', 'Team Member', 'Team Member', '/Zubariya.jpeg'),
(5, 'Yeshwanth', 'Team Member', 'Team Member', '/Yeshwanth.jpeg'),
(6, 'Anto', 'Team Member', 'Team Member', '/Anto.jpeg')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `role`=VALUES(`role`), `image`=VALUES(`image`);

-- Seed Default Projects
INSERT INTO `cms_projects` (`id`, `title`, `category`, `description`, `image`)
VALUES
(1, 'AI Neural Engine', 'Artificial Intelligence', 'Experience high-performance, local client-side AI language processing and dynamic contextual learning within an intuitive web platform.', '/tech_blog_featured.png'),
(2, 'Cloud Data Core', 'Data Infrastructure', 'A fully responsive and scalable data center telemetry platform designed for high-availability enterprise cloud workloads.', '/tech_blog_3.png'),
(3, 'SaaS Workspace', 'Enterprise Software', 'A robust SaaS solution that allows users to create, manage, and analyze custom forms with advanced conditional logic.', '/service_software.png'),
(4, 'Mobile Suite', 'Mobile App Engineering', 'A modern, accessible mobile application concept tailored for specialized service bookings and real-time tracking.', '/service_mobile.png'),
(5, 'EduStream Hub', 'E-Learning Platform', 'An interactive, feature-rich e-learning platform connecting students and educators with secure video streaming and material distribution.', '/service_web.png'),
(6, 'Core Systems', 'Digital Transformation', 'The official corporate presence for Innoveity Tech Solution, showcasing our engineering capabilities, team, and services.', '/service_cloud.png')
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`), `description`=VALUES(`description`), `image`=VALUES(`image`);
