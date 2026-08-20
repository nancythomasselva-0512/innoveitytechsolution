import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

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

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 5000;

// MySQL Connection Pool Setup
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'innoveity_db',
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Auto-migrate schema on start (ensure image columns can store large base64 image strings)
const autoMigrateSchema = async () => {
  try {
    await pool.query("ALTER TABLE cms_team MODIFY image LONGTEXT");
    await pool.query("ALTER TABLE cms_projects MODIFY image LONGTEXT");
    await pool.query("ALTER TABLE cms_showcase_projects MODIFY image LONGTEXT");
    console.log("✅ Schema auto-migration: Image columns updated to LONGTEXT");
  } catch (err) {
    console.log("ℹ️ Schema auto-migration check:", err.message);
  }
};
autoMigrateSchema();

// Health check endpoint
app.get('/api/cms/health', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.json({ status: 'connected', message: 'MySQL Database Connected Successfully' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET all CMS Data
app.get('/api/cms/all', async (req, res) => {
  try {
    const [settingsRows] = await pool.query('SELECT * FROM cms_settings');
    const [projectsRows] = await pool.query('SELECT * FROM cms_projects');
    const [showcaseRows] = await pool.query('SELECT * FROM cms_showcase_projects');
    const [teamRows] = await pool.query('SELECT * FROM cms_team');
    const [adminsRows] = await pool.query('SELECT * FROM cms_admin_users');

    const settingsMap = {};
    settingsRows.forEach(row => {
      try {
        settingsMap[row.key] = JSON.parse(row.value);
      } catch (e) {
        settingsMap[row.key] = row.value;
      }
    });

    const parsedShowcase = showcaseRows.map(item => ({
      ...item,
      tech: typeof item.tech === 'string' ? JSON.parse(item.tech || '[]') : item.tech
    }));

    res.json({
      success: true,
      settings: settingsMap,
      projects: projectsRows,
      showcaseProjects: parsedShowcase,
      team: teamRows,
      adminUsers: adminsRows
    });
  } catch (err) {
    console.error('MySQL GET All Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST Save CMS Setting
app.post('/api/cms/setting', async (req, res) => {
  const { key, value } = req.body;
  if (!key) return res.status(400).json({ success: false, message: 'Key is required' });

  try {
    const jsonStr = JSON.stringify(value);
    const sql = `INSERT INTO cms_settings (\`key\`, \`value\`) VALUES (?, ?) ON DUPLICATE KEY UPDATE \`value\` = VALUES(\`value\`)`;
    await pool.query(sql, [key, jsonStr]);
    res.json({ success: true, message: `Setting '${key}' saved` });
  } catch (err) {
    console.error('MySQL Save Setting Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST Upsert Collection Item
app.post('/api/cms/collection/:table', async (req, res) => {
  const { table } = req.params;
  const item = req.body;
  const allowedTables = ['cms_projects', 'cms_showcase_projects', 'cms_team', 'cms_admin_users'];

  if (!allowedTables.includes(table)) {
    return res.status(400).json({ success: false, message: 'Invalid table name' });
  }

  try {
    if (table === 'cms_projects') {
      const sql = `INSERT INTO cms_projects (id, title, category, description, image) VALUES (?, ?, ?, ?, ?)
                   ON DUPLICATE KEY UPDATE title=VALUES(title), category=VALUES(category), description=VALUES(description), image=VALUES(image)`;
      await pool.query(sql, [item.id || Date.now(), item.title || '', item.category || '', item.description || '', item.image || '']);
    } else if (table === 'cms_showcase_projects') {
      const techStr = JSON.stringify(item.tech || []);
      const sql = `INSERT INTO cms_showcase_projects (id, tag, title, subtitle, description, image, tech) VALUES (?, ?, ?, ?, ?, ?, ?)
                   ON DUPLICATE KEY UPDATE tag=VALUES(tag), title=VALUES(title), subtitle=VALUES(subtitle), description=VALUES(description), image=VALUES(image), tech=VALUES(tech)`;
      await pool.query(sql, [item.id || `showcase-${Date.now()}`, item.tag || '', item.title || '', item.subtitle || '', item.description || '', item.image || '', techStr]);
    } else if (table === 'cms_team') {
      const sql = `INSERT INTO cms_team (id, name, role, category, image) VALUES (?, ?, ?, ?, ?)
                   ON DUPLICATE KEY UPDATE name=VALUES(name), role=VALUES(role), category=VALUES(category), image=VALUES(image)`;
      await pool.query(sql, [item.id || Date.now(), item.name || '', item.role || '', item.category || 'Team Member', item.image || '']);
    } else if (table === 'cms_admin_users') {
      const sql = `INSERT INTO cms_admin_users (id, name, email, password, role, status, last_login) VALUES (?, ?, ?, ?, ?, ?, ?)
                   ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email), password=VALUES(password), role=VALUES(role), status=VALUES(status), last_login=VALUES(last_login)`;
      await pool.query(sql, [item.id || Date.now(), item.name || '', item.email || '', item.password || 'admin123', item.role || 'Admin', item.status || 'Active', item.last_login || null]);
    }

    res.json({ success: true, message: `Item upserted to ${table}` });
  } catch (err) {
    console.error(`MySQL Upsert Error (${table}):`, err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE Collection Item
app.delete('/api/cms/collection/:table/:id', async (req, res) => {
  const { table, id } = req.params;
  const allowedTables = ['cms_projects', 'cms_showcase_projects', 'cms_team', 'cms_admin_users'];

  if (!allowedTables.includes(table)) {
    return res.status(400).json({ success: false, message: 'Invalid table name' });
  }

  try {
    await pool.query(`DELETE FROM \`${table}\` WHERE id = ?`, [id]);
    res.json({ success: true, message: `Item ${id} deleted from ${table}` });
  } catch (err) {
    console.error(`MySQL Delete Error (${table}):`, err);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Innoveity Tech MySQL API Server listening on port ${PORT}`);
});
