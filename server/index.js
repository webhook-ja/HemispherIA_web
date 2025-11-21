import express from 'express';
import cors from 'cors';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Middleware
app.use(cors());
app.use(express.json());

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
