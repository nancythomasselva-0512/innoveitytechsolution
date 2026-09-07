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

// Auto-migrate schema on start
const autoMigrateSchema = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cms_testimonials (
        id BIGINT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) DEFAULT 'Client',
        company VARCHAR(255) DEFAULT '',
        rating INT DEFAULT 5,
        content TEXT DEFAULT NULL,
        avatar LONGTEXT DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS cms_media_gallery (
        id BIGINT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255) DEFAULT 'Tech Showcase',
        videoUrl LONGTEXT DEFAULT NULL,
        thumbnail LONGTEXT DEFAULT NULL,
        description TEXT DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS cms_careers (
        id BIGINT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        department VARCHAR(255) DEFAULT 'Engineering',
        location VARCHAR(255) DEFAULT 'Remote / Chennai',
        type VARCHAR(255) DEFAULT 'Full-Time',
        experience VARCHAR(255) DEFAULT '1+ Years',
        status VARCHAR(50) DEFAULT 'Active',
        description TEXT DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS cms_blog_posts (
        id BIGINT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255) DEFAULT 'Engineering',
        author VARCHAR(255) DEFAULT 'Innoveity Team',
        readTime VARCHAR(100) DEFAULT '4 min read',
        date VARCHAR(100) DEFAULT NULL,
        excerpt TEXT DEFAULT NULL,
        coverImage LONGTEXT DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS cms_services_list (
        id BIGINT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255) DEFAULT 'Engineering',
        tagline VARCHAR(255) DEFAULT '',
        deliverables LONGTEXT DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS cms_contact_inquiries (
        id BIGINT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(100) DEFAULT 'N/A',
        company VARCHAR(255) DEFAULT 'N/A',
        subject VARCHAR(255) DEFAULT 'General Inquiry',
        message TEXT DEFAULT NULL,
        date VARCHAR(100) DEFAULT 'Just now',
        status VARCHAR(50) DEFAULT 'New',
        internalNotes TEXT DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await pool.query("ALTER TABLE cms_team MODIFY image LONGTEXT");
    await pool.query("ALTER TABLE cms_projects MODIFY image LONGTEXT");
    await pool.query("ALTER TABLE cms_showcase_projects MODIFY image LONGTEXT");
    console.log("✅ Schema auto-migration: All tables and LONGTEXT image columns verified");
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

    let testimonialsRows = [];
    let mediaGalleryRows = [];
    let careersRows = [];
    let blogPostsRows = [];
    let servicesRows = [];
    let inquiriesRows = [];

    try { [testimonialsRows] = await pool.query('SELECT * FROM cms_testimonials'); } catch (e) {}
    try { [mediaGalleryRows] = await pool.query('SELECT * FROM cms_media_gallery'); } catch (e) {}
    try { [careersRows] = await pool.query('SELECT * FROM cms_careers'); } catch (e) {}
    try { [blogPostsRows] = await pool.query('SELECT * FROM cms_blog_posts'); } catch (e) {}
    try { [servicesRows] = await pool.query('SELECT * FROM cms_services_list'); } catch (e) {}
    try { [inquiriesRows] = await pool.query('SELECT * FROM cms_contact_inquiries'); } catch (e) {}

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

    const parsedServices = servicesRows.map(item => ({
      ...item,
      deliverables: typeof item.deliverables === 'string' ? JSON.parse(item.deliverables || '[]') : item.deliverables
    }));

    res.json({
      success: true,
      settings: settingsMap,
      projects: projectsRows,
      showcaseProjects: parsedShowcase,
      team: teamRows,
      adminUsers: adminsRows,
      testimonials: testimonialsRows,
      mediaGallery: mediaGalleryRows,
      careers: careersRows,
      blogPosts: blogPostsRows,
      servicesList: parsedServices,
      contactInquiries: inquiriesRows
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
  const allowedTables = [
    'cms_projects',
    'cms_showcase_projects',
    'cms_team',
    'cms_admin_users',
    'cms_testimonials',
    'cms_media_gallery',
    'cms_careers',
    'cms_blog_posts',
    'cms_services_list',
    'cms_contact_inquiries'
  ];

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
    } else if (table === 'cms_testimonials') {
      const sql = `INSERT INTO cms_testimonials (id, name, role, company, rating, content, avatar) VALUES (?, ?, ?, ?, ?, ?, ?)
                   ON DUPLICATE KEY UPDATE name=VALUES(name), role=VALUES(role), company=VALUES(company), rating=VALUES(rating), content=VALUES(content), avatar=VALUES(avatar)`;
      await pool.query(sql, [item.id || Date.now(), item.name || '', item.role || 'Client', item.company || '', item.rating || 5, item.content || '', item.avatar || '']);
    } else if (table === 'cms_media_gallery') {
      const sql = `INSERT INTO cms_media_gallery (id, title, category, videoUrl, thumbnail, description) VALUES (?, ?, ?, ?, ?, ?)
                   ON DUPLICATE KEY UPDATE title=VALUES(title), category=VALUES(category), videoUrl=VALUES(videoUrl), thumbnail=VALUES(thumbnail), description=VALUES(description)`;
      await pool.query(sql, [item.id || Date.now(), item.title || '', item.category || 'Tech Showcase', item.videoUrl || '', item.thumbnail || '', item.description || '']);
    } else if (table === 'cms_careers') {
      const sql = `INSERT INTO cms_careers (id, title, department, location, type, experience, status, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                   ON DUPLICATE KEY UPDATE title=VALUES(title), department=VALUES(department), location=VALUES(location), type=VALUES(type), experience=VALUES(experience), status=VALUES(status), description=VALUES(description)`;
      await pool.query(sql, [item.id || Date.now(), item.title || '', item.department || 'Engineering', item.location || 'Remote / Chennai', item.type || 'Full-Time', item.experience || '1+ Years', item.status || 'Active', item.description || '']);
    } else if (table === 'cms_blog_posts') {
      const sql = `INSERT INTO cms_blog_posts (id, title, category, author, readTime, date, excerpt, coverImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                   ON DUPLICATE KEY UPDATE title=VALUES(title), category=VALUES(category), author=VALUES(author), readTime=VALUES(readTime), date=VALUES(date), excerpt=VALUES(excerpt), coverImage=VALUES(coverImage)`;
      await pool.query(sql, [item.id || Date.now(), item.title || '', item.category || 'Engineering', item.author || 'Innoveity Team', item.readTime || '4 min read', item.date || '', item.excerpt || '', item.coverImage || '']);
    } else if (table === 'cms_services_list') {
      const delivStr = JSON.stringify(item.deliverables || []);
      const sql = `INSERT INTO cms_services_list (id, title, category, tagline, deliverables) VALUES (?, ?, ?, ?, ?)
                   ON DUPLICATE KEY UPDATE title=VALUES(title), category=VALUES(category), tagline=VALUES(tagline), deliverables=VALUES(deliverables)`;
      await pool.query(sql, [item.id || Date.now(), item.title || '', item.category || 'Engineering', item.tagline || '', delivStr]);
    } else if (table === 'cms_contact_inquiries') {
      const sql = `INSERT INTO cms_contact_inquiries (id, name, email, phone, company, subject, message, date, status, internalNotes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                   ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email), phone=VALUES(phone), company=VALUES(company), subject=VALUES(subject), message=VALUES(message), date=VALUES(date), status=VALUES(status), internalNotes=VALUES(internalNotes)`;
      await pool.query(sql, [item.id || Date.now(), item.name || '', item.email || '', item.phone || 'N/A', item.company || 'N/A', item.subject || 'General Inquiry', item.message || '', item.date || 'Just now', item.status || 'New', item.internalNotes || '']);
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
  const allowedTables = [
    'cms_projects',
    'cms_showcase_projects',
    'cms_team',
    'cms_admin_users',
    'cms_testimonials',
    'cms_media_gallery',
    'cms_careers',
    'cms_blog_posts',
    'cms_services_list',
    'cms_contact_inquiries'
  ];

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
