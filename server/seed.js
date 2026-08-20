import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Automatically load .env file if present
try {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [k, ...v] = trimmed.split('=');
        const key = k.trim();
        const val = v.join('=').trim().replace(/^["']|["']$/g, '');
        if (key && !process.env[key]) process.env[key] = val;
      }
    }
  }
} catch (e) {}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedDatabase() {
  const host = process.env.MYSQL_HOST || 'localhost';
  const user = process.env.MYSQL_USER || 'root';
  const password = process.env.MYSQL_PASSWORD || '';
  const dbName = process.env.MYSQL_DATABASE || 'innoveity_db';
  const port = parseInt(process.env.MYSQL_PORT || '3306', 10);

  console.log(`📡 Connecting to MySQL server at ${host}:${port}...`);

  let connection;
  try {
    // 1. Connect without selecting DB to ensure DB exists
    connection = await mysql.createConnection({ host, user, password, port });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await connection.changeUser({ database: dbName });
    console.log(`✅ Connected to database '${dbName}'`);

    // 2. Create tables using mysql_schema.sql
    const schemaPath = path.join(__dirname, '..', 'mysql_schema.sql');
    if (fs.existsSync(schemaPath)) {
      const sqlContent = fs.readFileSync(schemaPath, 'utf-8');
      const statements = sqlContent
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--') && !s.toLowerCase().startsWith('create database') && !s.toLowerCase().startsWith('use '));

      for (const statement of statements) {
        await connection.query(statement);
      }
      console.log('✅ Database schema verified and tables created');
    }

    // 3. Load backup JSON seed data if present
    const backupPath = path.join(__dirname, '..', 'innoveity_cms_backup_database.json');
    if (fs.existsSync(backupPath)) {
      const rawData = fs.readFileSync(backupPath, 'utf-8');
      const seed = JSON.parse(rawData);

      // Seed CMS Settings
      const settingsKeys = ['showcaseHeader', 'teamHeaderContent', 'contact', 'homeContent', 'aboutContent', 'seoSettings'];
      for (const key of settingsKeys) {
        if (seed[key]) {
          const jsonStr = JSON.stringify(seed[key]);
          await connection.query(
            'INSERT INTO cms_settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)',
            [key, jsonStr]
          );
        }
      }
      console.log('✅ CMS Settings seeded');

      // Seed Projects
      if (Array.isArray(seed.projects)) {
        for (const item of seed.projects) {
          await connection.query(
            `INSERT INTO cms_projects (id, title, category, description, image) VALUES (?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE title=VALUES(title), category=VALUES(category), description=VALUES(description), image=VALUES(image)`,
            [item.id, item.title, item.category, item.description, item.image]
          );
        }
        console.log(`✅ ${seed.projects.length} Projects seeded`);
      }

      // Seed Showcase Projects
      if (Array.isArray(seed.showcaseProjects)) {
        for (const item of seed.showcaseProjects) {
          const techStr = JSON.stringify(item.tech || []);
          await connection.query(
            `INSERT INTO cms_showcase_projects (id, tag, title, subtitle, description, image, tech) VALUES (?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE tag=VALUES(tag), title=VALUES(title), subtitle=VALUES(subtitle), description=VALUES(description), image=VALUES(image), tech=VALUES(tech)`,
            [item.id, item.tag, item.title, item.subtitle, item.description, item.image, techStr]
          );
        }
        console.log(`✅ ${seed.showcaseProjects.length} Showcase Projects seeded`);
      }

      // Seed Team Members
      if (Array.isArray(seed.team)) {
        for (const item of seed.team) {
          await connection.query(
            `INSERT INTO cms_team (id, name, role, category, image) VALUES (?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE name=VALUES(name), role=VALUES(role), category=VALUES(category), image=VALUES(image)`,
            [item.id, item.name, item.role, item.category || 'Team Member', item.image]
          );
        }
        console.log(`✅ ${seed.team.length} Team Members seeded`);
      }

      // Seed Admin Users
      if (Array.isArray(seed.adminUsers)) {
        for (const item of seed.adminUsers) {
          await connection.query(
            `INSERT INTO cms_admin_users (id, name, email, password, role, status) VALUES (?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email), role=VALUES(role), status=VALUES(status)`,
            [item.id, item.name, item.email, item.password || 'admin123', item.role || 'Admin', item.status || 'Active']
          );
        }
        console.log(`✅ ${seed.adminUsers.length} Admin Users seeded`);
      }
    }

    console.log('\n🎉 Backend MySQL Database Setup & Seeding Complete!');
  } catch (err) {
    console.error('❌ Database Seeding Error:', err.message);
  } finally {
    if (connection) await connection.end();
  }
}

seedDatabase();
