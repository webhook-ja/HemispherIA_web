import express from 'express';
import cors from 'cors';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// JWT Secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'hemispheria-secret-key-2024';
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

// PostgreSQL connection
const pool = new pg.Pool({
  host: process.env.DB_HOST || 'postgres_postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'hemispheria',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'M4x1m012',
});

// Initialize database tables
const initDatabase = async () => {
  try {
    // Create admin_users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create sessions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES admin_users(id) ON DELETE CASCADE,
        token VARCHAR(255) UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create activity_log table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS activity_log (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES admin_users(id),
        action VARCHAR(100) NOT NULL,
        details JSONB,
        ip_address VARCHAR(45),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create page_visits table for analytics
    await pool.query(`
      CREATE TABLE IF NOT EXISTS page_visits (
        id SERIAL PRIMARY KEY,
        page_path VARCHAR(255) NOT NULL,
        visitor_ip VARCHAR(45),
        user_agent TEXT,
        referrer TEXT,
        device_type VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for better performance
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_contacts_read ON contacts(read)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_pages_published ON pages(is_published)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_content_slug ON content(slug)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_assets_created_at ON assets(created_at DESC)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_page_visits_created_at ON page_visits(created_at DESC)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_page_visits_page_path ON page_visits(page_path)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_activity_log_user ON activity_log(user_id)`);

    // Create default admin user if none exists
    const adminExists = await pool.query('SELECT id FROM admin_users LIMIT 1');
    if (adminExists.rows.length === 0) {
      const defaultPassword = hashPassword('admin123');
      await pool.query(
        'INSERT INTO admin_users (username, email, password_hash, role) VALUES ($1, $2, $3, $4)',
        ['admin', 'admin@hemispheria.org', defaultPassword, 'superadmin']
      );
      console.log('Default admin user created: admin / admin123');
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

// Simple password hashing (use bcrypt in production)
function hashPassword(password) {
  return crypto.createHash('sha256').update(password + JWT_SECRET).digest('hex');
}

// Generate token
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../dist/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg|pdf|mp4|webm|mp3|wav|doc|docx|xls|xlsx/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mime = file.mimetype.includes('image') || file.mimetype.includes('video') ||
                 file.mimetype.includes('audio') || file.mimetype.includes('pdf') ||
                 file.mimetype.includes('document') || file.mimetype.includes('spreadsheet');
    if (ext || mime) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rate limiting middleware
const rateLimits = new Map();
const rateLimit = (maxRequests = 100, windowMs = 60000) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowStart = now - windowMs;

    if (!rateLimits.has(ip)) {
      rateLimits.set(ip, []);
    }

    const requests = rateLimits.get(ip).filter(time => time > windowStart);
    requests.push(now);
    rateLimits.set(ip, requests);

    if (requests.length > maxRequests) {
      return res.status(429).json({ error: 'Too many requests, please try again later' });
    }

    next();
  };
};

// Apply rate limiting to API routes
app.use('/api', rateLimit(100, 60000));

// Authentication middleware
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const result = await pool.query(
      `SELECT s.*, u.id as user_id, u.username, u.email, u.role
       FROM sessions s
       JOIN admin_users u ON s.user_id = u.id
       WHERE s.token = $1 AND s.expires_at > NOW()`,
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = result.rows[0];
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Log activity
const logActivity = async (userId, action, details, ip) => {
  try {
    await pool.query(
      'INSERT INTO activity_log (user_id, action, details, ip_address) VALUES ($1, $2, $3, $4)',
      [userId, action, JSON.stringify(details), ip]
    );
  } catch (error) {
    console.error('Activity log error:', error);
  }
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 50MB.' });
    }
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: err.message || 'Internal server error' });
};

// ============================================
// PUBLIC API ROUTES
// ============================================

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected', timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

// Track page visit (public)
app.post('/api/track', async (req, res) => {
  try {
    const { path: pagePath, referrer } = req.body;
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || '';

    // Detect device type
    let deviceType = 'desktop';
    if (/mobile/i.test(userAgent)) deviceType = 'mobile';
    else if (/tablet|ipad/i.test(userAgent)) deviceType = 'tablet';

    await pool.query(
      'INSERT INTO page_visits (page_path, visitor_ip, user_agent, referrer, device_type) VALUES ($1, $2, $3, $4, $5)',
      [pagePath || '/', ip, userAgent, referrer || '', deviceType]
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to track visit' });
  }
});

// Public contacts (no auth required)
app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, organization, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const result = await pool.query(
      'INSERT INTO contacts (name, email, organization, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name.trim(), email.trim().toLowerCase(), organization?.trim() || null, message.trim()]
    );

    res.status(201).json({ success: true, contact: result.rows[0] });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to save contact' });
  }
});

// Get published pages (public)
app.get('/api/public/pages', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT slug, title, meta_title, meta_description, html, css FROM pages WHERE is_published = true ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

// Get published page by slug (public)
app.get('/api/public/pages/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      'SELECT slug, title, meta_title, meta_description, html, css FROM pages WHERE slug = $1 AND is_published = true',
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Page not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch page' });
  }
});

// ============================================
// AUTHENTICATION API
// ============================================

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const passwordHash = hashPassword(password);
    const result = await pool.query(
      'SELECT id, username, email, role FROM admin_users WHERE (username = $1 OR email = $1) AND password_hash = $2',
      [username, passwordHash]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const token = generateToken();
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRY);

    // Create session
    await pool.query(
      'INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.id, token, expiresAt]
    );

    // Update last login
    await pool.query('UPDATE admin_users SET last_login = NOW() WHERE id = $1', [user.id]);

    // Log activity
    await logActivity(user.id, 'login', { username: user.username }, req.ip);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      expiresAt
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Logout
app.post('/api/auth/logout', authenticate, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    await pool.query('DELETE FROM sessions WHERE token = $1', [token]);
    await logActivity(req.user.user_id, 'logout', {}, req.ip);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Logout failed' });
  }
});

// Get current user
app.get('/api/auth/me', authenticate, async (req, res) => {
  res.json({
    id: req.user.user_id,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role
  });
});

// Change password
app.post('/api/auth/change-password', authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const currentHash = hashPassword(currentPassword);
    const user = await pool.query(
      'SELECT id FROM admin_users WHERE id = $1 AND password_hash = $2',
      [req.user.user_id, currentHash]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const newHash = hashPassword(newPassword);
    await pool.query('UPDATE admin_users SET password_hash = $1 WHERE id = $2', [newHash, req.user.user_id]);

    // Invalidate all sessions
    await pool.query('DELETE FROM sessions WHERE user_id = $1', [req.user.user_id]);

    await logActivity(req.user.user_id, 'password_change', {}, req.ip);

    res.json({ success: true, message: 'Password changed. Please login again.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// ============================================
// PROTECTED ADMIN API ROUTES
// ============================================

// Contacts API (protected)
app.get('/api/contacts', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 20, unread } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM contacts';
    let countQuery = 'SELECT COUNT(*) FROM contacts';
    const params = [];

    if (unread === 'true') {
      query += ' WHERE read = false';
      countQuery += ' WHERE read = false';
    }

    query += ' ORDER BY created_at DESC LIMIT $1 OFFSET $2';
    params.push(limit, offset);

    const [result, countResult] = await Promise.all([
      pool.query(query, params),
      pool.query(countQuery)
    ]);

    res.json({
      contacts: result.rows,
      total: parseInt(countResult.rows[0].count),
      page: parseInt(page),
      totalPages: Math.ceil(countResult.rows[0].count / limit)
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.patch('/api/contacts/:id/read', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'UPDATE contacts SET read = true WHERE id = $1 RETURNING *',
      [id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

app.delete('/api/contacts/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
    await logActivity(req.user.user_id, 'delete_contact', { contactId: id }, req.ip);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

// Enhanced Stats for dashboard
app.get('/api/stats', authenticate, async (req, res) => {
  try {
    const [contacts, unreadContacts, content, publishedContent, pages, publishedPages, assets, recentVisits, visitsToday, visitsByDevice, visitsByPage] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM contacts'),
      pool.query('SELECT COUNT(*) FROM contacts WHERE read = false'),
      pool.query('SELECT COUNT(*) FROM content'),
      pool.query('SELECT COUNT(*) FROM content WHERE published = true'),
      pool.query('SELECT COUNT(*) FROM pages'),
      pool.query('SELECT COUNT(*) FROM pages WHERE is_published = true'),
      pool.query('SELECT COUNT(*), COALESCE(SUM(size), 0) as total_size FROM assets'),
      pool.query(`SELECT COUNT(*) FROM page_visits WHERE created_at > NOW() - INTERVAL '7 days'`),
      pool.query(`SELECT COUNT(*) FROM page_visits WHERE created_at > NOW() - INTERVAL '24 hours'`),
      pool.query(`
        SELECT device_type, COUNT(*) as count
        FROM page_visits
        WHERE created_at > NOW() - INTERVAL '7 days'
        GROUP BY device_type
      `),
      pool.query(`
        SELECT page_path, COUNT(*) as count
        FROM page_visits
        WHERE created_at > NOW() - INTERVAL '7 days'
        GROUP BY page_path
        ORDER BY count DESC
        LIMIT 5
      `)
    ]);

    // Get visits by day for the last 7 days
    const visitsByDay = await pool.query(`
      SELECT DATE(created_at) as date, COUNT(*) as visits
      FROM page_visits
      WHERE created_at > NOW() - INTERVAL '7 days'
      GROUP BY DATE(created_at)
      ORDER BY date
    `);

    res.json({
      totalContacts: parseInt(contacts.rows[0].count),
      unreadContacts: parseInt(unreadContacts.rows[0].count),
      totalContent: parseInt(content.rows[0].count),
      publishedContent: parseInt(publishedContent.rows[0].count),
      totalPages: parseInt(pages.rows[0].count),
      publishedPages: parseInt(publishedPages.rows[0].count),
      totalAssets: parseInt(assets.rows[0].count),
      totalStorageBytes: parseInt(assets.rows[0].total_size || 0),
      recentVisits: parseInt(recentVisits.rows[0].count),
      visitsToday: parseInt(visitsToday.rows[0].count),
      visitsByDevice: visitsByDevice.rows.reduce((acc, row) => {
        acc[row.device_type] = parseInt(row.count);
        return acc;
      }, { desktop: 0, mobile: 0, tablet: 0 }),
      topPages: visitsByPage.rows,
      visitsByDay: visitsByDay.rows
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Activity log
app.get('/api/activity', authenticate, async (req, res) => {
  try {
    const { limit = 50 } = req.query;
    const result = await pool.query(`
      SELECT a.*, u.username
      FROM activity_log a
      LEFT JOIN admin_users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
      LIMIT $1
    `, [limit]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity log' });
  }
});

// Content API (protected)
app.get('/api/content', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM content ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.get('/api/content/:slug', authenticate, async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query('SELECT * FROM content WHERE slug = $1', [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.post('/api/content', authenticate, async (req, res) => {
  try {
    const { slug, title, content, type, published } = req.body;

    if (!slug || !title) {
      return res.status(400).json({ error: 'Slug and title are required' });
    }

    const result = await pool.query(
      'INSERT INTO content (slug, title, content, type, published) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [slug, title, content || '', type || 'page', published || false]
    );

    await logActivity(req.user.user_id, 'create_content', { slug, title }, req.ip);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create content' });
  }
});

app.put('/api/content/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { slug, title, content, type, published } = req.body;

    const result = await pool.query(
      'UPDATE content SET slug = $1, title = $2, content = $3, type = $4, published = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [slug, title, content, type, published, id]
    );

    await logActivity(req.user.user_id, 'update_content', { id, slug }, req.ip);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update content' });
  }
});

app.delete('/api/content/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM content WHERE id = $1', [id]);
    await logActivity(req.user.user_id, 'delete_content', { id }, req.ip);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete content' });
  }
});

// ============================================
// PAGE BUILDER API (protected)
// ============================================

// Pages API
app.get('/api/pages', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

app.get('/api/pages/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM pages WHERE id = $1 OR slug = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Page not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch page' });
  }
});

app.post('/api/pages', authenticate, async (req, res) => {
  try {
    const { slug, title, description, html, css, components, styles, is_published, meta_title, meta_description } = req.body;

    if (!slug || !title) {
      return res.status(400).json({ error: 'Slug and title are required' });
    }

    // Check slug uniqueness
    const existing = await pool.query('SELECT id FROM pages WHERE slug = $1', [slug]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Slug already exists' });
    }

    const result = await pool.query(
      `INSERT INTO pages (slug, title, description, html, css, components, styles, is_published, meta_title, meta_description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [slug, title, description || '', html || '', css || '', JSON.stringify(components || {}), JSON.stringify(styles || []), is_published || false, meta_title || title, meta_description || '']
    );

    await logActivity(req.user.user_id, 'create_page', { slug, title }, req.ip);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating page:', error);
    res.status(500).json({ error: 'Failed to create page' });
  }
});

app.put('/api/pages/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { slug, title, description, html, css, components, styles, is_published, meta_title, meta_description } = req.body;

    const result = await pool.query(
      `UPDATE pages SET slug = $1, title = $2, description = $3, html = $4, css = $5,
       components = $6, styles = $7, is_published = $8, meta_title = $9, meta_description = $10,
       updated_at = CURRENT_TIMESTAMP WHERE id = $11 RETURNING *`,
      [slug, title, description, html, css, JSON.stringify(components || {}), JSON.stringify(styles || []), is_published, meta_title, meta_description, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Page not found' });
    }

    await logActivity(req.user.user_id, 'update_page', { id, slug }, req.ip);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update page' });
  }
});

app.delete('/api/pages/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM pages WHERE id = $1', [id]);
    await logActivity(req.user.user_id, 'delete_page', { id }, req.ip);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete page' });
  }
});

// Publish/Unpublish page
app.patch('/api/pages/:id/publish', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { is_published } = req.body;

    const result = await pool.query(
      'UPDATE pages SET is_published = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [is_published, id]
    );

    await logActivity(req.user.user_id, is_published ? 'publish_page' : 'unpublish_page', { id }, req.ip);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update page' });
  }
});

// Blocks API
app.get('/api/blocks', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blocks ORDER BY category, name');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blocks' });
  }
});

app.post('/api/blocks', authenticate, async (req, res) => {
  try {
    const { name, category, label, content, attributes, media } = req.body;

    const result = await pool.query(
      'INSERT INTO blocks (name, category, label, content, attributes, media) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, category || 'Custom', label || name, content, JSON.stringify(attributes || {}), media || '']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create block' });
  }
});

app.delete('/api/blocks/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM blocks WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete block' });
  }
});

// Assets API
app.get('/api/assets', authenticate, async (req, res) => {
  try {
    const { type, page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM assets';
    let countQuery = 'SELECT COUNT(*) FROM assets';
    const params = [];

    if (type) {
      query += ' WHERE mime_type LIKE $1';
      countQuery += ' WHERE mime_type LIKE $1';
      params.push(`${type}%`);
    }

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const [result, countResult] = await Promise.all([
      pool.query(query, params),
      pool.query(countQuery, type ? [`${type}%`] : [])
    ]);

    res.json({
      assets: result.rows,
      total: parseInt(countResult.rows[0].count),
      page: parseInt(page),
      totalPages: Math.ceil(countResult.rows[0].count / limit)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
});

app.delete('/api/assets/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const asset = await pool.query('SELECT * FROM assets WHERE id = $1', [id]);
    if (asset.rows.length > 0) {
      const filePath = path.join(uploadsDir, asset.rows[0].filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await pool.query('DELETE FROM assets WHERE id = $1', [id]);
    await logActivity(req.user.user_id, 'delete_asset', { id }, req.ip);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete asset' });
  }
});

// File Upload API
app.post('/api/upload', authenticate, upload.array('files', 10), async (req, res) => {
  try {
    const files = req.files;
    const results = [];

    for (const file of files) {
      const url = `/uploads/${file.filename}`;

      const result = await pool.query(
        'INSERT INTO assets (filename, original_name, mime_type, size, url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [file.filename, file.originalname, file.mimetype, file.size, url]
      );

      results.push(result.rows[0]);
    }

    await logActivity(req.user.user_id, 'upload_files', { count: files.length }, req.ip);
    res.json({ success: true, assets: results, urls: results.map(r => r.url) });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
});

// Site Config API
app.get('/api/site-config', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM site_config');
    const config = {};
    result.rows.forEach(row => {
      try {
        config[row.key] = JSON.parse(row.value);
      } catch {
        config[row.key] = row.value;
      }
    });
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch site config' });
  }
});

app.put('/api/site-config/:key', authenticate, async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    await pool.query(
      'INSERT INTO site_config (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP',
      [key, JSON.stringify(value)]
    );

    await logActivity(req.user.user_id, 'update_config', { key }, req.ip);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update site config' });
  }
});

// Templates API
app.get('/api/templates', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM templates ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

app.post('/api/templates', authenticate, async (req, res) => {
  try {
    const { name, category, thumbnail, html, css, components, styles } = req.body;

    const result = await pool.query(
      'INSERT INTO templates (name, category, thumbnail, html, css, components, styles) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, category || 'General', thumbnail || '', html || '', css || '', JSON.stringify(components || {}), JSON.stringify(styles || [])]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create template' });
  }
});

app.delete('/api/templates/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM templates WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete template' });
  }
});

// ============================================
// STATIC FILES & SPA ROUTING
// ============================================

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// Handle SPA routing - send all other requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Error handler
app.use(errorHandler);

// Initialize database and start server
initDatabase().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
});
