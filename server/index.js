import express from 'express';
import cors from 'cors';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection
const pool = new pg.Pool({
  host: process.env.DB_HOST || 'postgres_postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'hemispheria',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'M4x1m012',
});

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
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg|pdf|mp4|webm/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedTypes.test(file.mimetype);
    if (ext && mime) {
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

// API Routes

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

// Contacts API
app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, organization, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required' });
    }

    const result = await pool.query(
      'INSERT INTO contacts (name, email, organization, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, organization || null, message]
    );

    res.status(201).json({ success: true, contact: result.rows[0] });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to save contact' });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.patch('/api/contacts/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'UPDATE contacts SET read = true WHERE id = $1 RETURNING *',
      [id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

// Content API
app.get('/api/content', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM content ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.get('/api/content/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query('SELECT * FROM content WHERE slug = $1', [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.post('/api/content', async (req, res) => {
  try {
    const { slug, title, content, type, published } = req.body;

    if (!slug || !title) {
      return res.status(400).json({ error: 'Slug and title are required' });
    }

    const result = await pool.query(
      'INSERT INTO content (slug, title, content, type, published) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [slug, title, content || '', type || 'page', published || false]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating content:', error);
    res.status(500).json({ error: 'Failed to create content' });
  }
});

app.put('/api/content/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { slug, title, content, type, published } = req.body;

    const result = await pool.query(
      'UPDATE content SET slug = $1, title = $2, content = $3, type = $4, published = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [slug, title, content, type, published, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

app.delete('/api/content/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM content WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({ error: 'Failed to delete content' });
  }
});

// Stats for dashboard
app.get('/api/stats', async (req, res) => {
  try {
    const contacts = await pool.query('SELECT COUNT(*) FROM contacts');
    const unreadContacts = await pool.query('SELECT COUNT(*) FROM contacts WHERE read = false');
    const content = await pool.query('SELECT COUNT(*) FROM content');
    const publishedContent = await pool.query('SELECT COUNT(*) FROM content WHERE published = true');

    res.json({
      totalContacts: parseInt(contacts.rows[0].count),
      unreadContacts: parseInt(unreadContacts.rows[0].count),
      totalContent: parseInt(content.rows[0].count),
      publishedContent: parseInt(publishedContent.rows[0].count),
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// ============================================
// PAGE BUILDER API
// ============================================

// Pages API
app.get('/api/pages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

app.get('/api/pages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM pages WHERE id = $1 OR slug = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Page not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({ error: 'Failed to fetch page' });
  }
});

app.post('/api/pages', async (req, res) => {
  try {
    const { slug, title, description, html, css, components, styles, is_published, meta_title, meta_description } = req.body;

    if (!slug || !title) {
      return res.status(400).json({ error: 'Slug and title are required' });
    }

    const result = await pool.query(
      `INSERT INTO pages (slug, title, description, html, css, components, styles, is_published, meta_title, meta_description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [slug, title, description || '', html || '', css || '', JSON.stringify(components || {}), JSON.stringify(styles || []), is_published || false, meta_title || title, meta_description || '']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating page:', error);
    res.status(500).json({ error: 'Failed to create page' });
  }
});

app.put('/api/pages/:id', async (req, res) => {
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

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating page:', error);
    res.status(500).json({ error: 'Failed to update page' });
  }
});

app.delete('/api/pages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM pages WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).json({ error: 'Failed to delete page' });
  }
});

// Blocks API
app.get('/api/blocks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blocks ORDER BY category, name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching blocks:', error);
    res.status(500).json({ error: 'Failed to fetch blocks' });
  }
});

app.post('/api/blocks', async (req, res) => {
  try {
    const { name, category, label, content, attributes, media } = req.body;

    const result = await pool.query(
      'INSERT INTO blocks (name, category, label, content, attributes, media) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, category || 'Custom', label || name, content, JSON.stringify(attributes || {}), media || '']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating block:', error);
    res.status(500).json({ error: 'Failed to create block' });
  }
});

app.delete('/api/blocks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM blocks WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting block:', error);
    res.status(500).json({ error: 'Failed to delete block' });
  }
});

// Assets API
app.get('/api/assets', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM assets ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
});

app.delete('/api/assets/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Get the asset to delete the file
    const asset = await pool.query('SELECT * FROM assets WHERE id = $1', [id]);
    if (asset.rows.length > 0) {
      const filePath = path.join(uploadsDir, asset.rows[0].filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await pool.query('DELETE FROM assets WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting asset:', error);
    res.status(500).json({ error: 'Failed to delete asset' });
  }
});

// File Upload API
app.post('/api/upload', upload.array('files', 10), async (req, res) => {
  try {
    const files = req.files;
    const urls = [];

    for (const file of files) {
      const url = `/uploads/${file.filename}`;

      // Save to database
      await pool.query(
        'INSERT INTO assets (filename, original_name, mime_type, size, url) VALUES ($1, $2, $3, $4, $5)',
        [file.filename, file.originalname, file.mimetype, file.size, url]
      );

      urls.push(url);
    }

    res.json({ success: true, urls });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
});

// Site Config API
app.get('/api/site-config', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM site_config');
    const config = {};
    result.rows.forEach(row => {
      config[row.key] = JSON.parse(row.value);
    });
    res.json(config);
  } catch (error) {
    console.error('Error fetching site config:', error);
    res.status(500).json({ error: 'Failed to fetch site config' });
  }
});

app.put('/api/site-config/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    await pool.query(
      'INSERT INTO site_config (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP',
      [key, JSON.stringify(value)]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating site config:', error);
    res.status(500).json({ error: 'Failed to update site config' });
  }
});

// Templates API
app.get('/api/templates', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM templates ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

app.post('/api/templates', async (req, res) => {
  try {
    const { name, category, thumbnail, html, css, components, styles } = req.body;

    const result = await pool.query(
      'INSERT INTO templates (name, category, thumbnail, html, css, components, styles) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, category || 'General', thumbnail || '', html || '', css || '', JSON.stringify(components || {}), JSON.stringify(styles || [])]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating template:', error);
    res.status(500).json({ error: 'Failed to create template' });
  }
});

app.delete('/api/templates/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM templates WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting template:', error);
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

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
