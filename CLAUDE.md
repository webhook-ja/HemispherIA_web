# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Hemispher-IA** (note the hyphen) is a professional web platform connecting knowledge, talent, and technology for sustainable development in Latin America and the Caribbean. It's a React + TypeScript SPA with an Express.js backend that serves both the API and static files.

**Key Feature**: Includes a GrapeJS-based page builder for drag-and-drop content creation in the admin panel.

## Commands

```bash
# Development
npm install          # Install dependencies
npm run dev          # Start Vite dev server (localhost:5173)

# Production
npm run build        # Build frontend with Vite
npm start            # Start Express server (serves API + static files on port 3000)

# Linting
npm run lint         # Run ESLint
```

## Architecture

### Frontend (React + Vite + TypeScript)
- **Entry point**: `src/main.tsx` → `src/App.tsx`
- **Routing**: All routes defined in `src/App.tsx` using React Router
- **Pages**: Located in `src/pages/`
  - `Index.tsx` - Landing page
  - `About.tsx` - Team info with real photos (Wolfgang, Erika, Alberto, Jorge)
  - `Projects.tsx` - Project showcase with filterable cards
  - `Services.tsx` - Service offerings
  - `Contact.tsx` - Contact form
  - `PublicInfo.tsx` - News, events, resources
  - `Admin.tsx` - Admin panel with nested routes
  - `Login.tsx` - Admin authentication

- **Components**: Split between public and admin
  - `src/components/` - Public-facing components (Navbar, Footer, Hero, etc.)
  - `src/components/admin/` - Admin components (PageBuilder, ContentManager, etc.)
  - `src/components/ui/` - shadcn/ui components (DO NOT EDIT - generate new components if customization needed)

- **State Management**:
  - `@tanstack/react-query` for server state
  - `AuthContext` for authentication state
  - Local state with React hooks

### Backend (Express.js)
- **Single server file**: `server/index.js`
- **Dual purpose**: Serves both REST API (`/api/*`) and static files from `dist/`
- **Database**: PostgreSQL via `pg` pool
- **File uploads**: Multer → `dist/uploads/`
- **Email**: Nodemailer via `server/email.js` (SMTP config for Hostinger)

**Key Backend Features**:
- Session-based auth with JWT tokens
- Auto-initialization of database tables on startup
- Activity logging for admin actions
- Page visit tracking for analytics
- Default admin user: `admin` / `admin123` (created on first run)

## Database Schema (PostgreSQL)

**Content Tables**:
- `contacts` - Contact form submissions
- `content` - CMS content items
- `pages` - Page builder pages (stores GrapeJS JSON)
- `templates` - Reusable page templates
- `blocks` - Custom GrapeJS blocks
- `assets` - Uploaded media files
- `site_config` - Key-value configuration store

**Admin Tables**:
- `admin_users` - Admin user accounts
- `sessions` - Active auth sessions
- `activity_log` - Audit trail of admin actions
- `page_visits` - Analytics data

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check with DB status |
| `/api/contacts` | GET/POST | Contact form submissions |
| `/api/content` | GET/POST/PUT/DELETE | CMS content CRUD |
| `/api/stats` | GET | Dashboard statistics |
| `/api/pages` | GET/POST/PUT/DELETE | Page builder CRUD |
| `/api/blocks` | GET/POST | Custom GrapeJS blocks |
| `/api/assets` | GET/POST/DELETE | Media asset management |
| `/api/upload` | POST | File upload (multipart/form-data) |
| `/api/templates` | GET/POST | Page templates |
| `/api/site-config` | GET/PUT | Site configuration |
| `/api/auth/login` | POST | Admin login |
| `/api/auth/logout` | POST | Admin logout |
| `/api/auth/verify` | GET | Verify session |
| `/api/track` | POST | Page visit tracking |

## Deployment

### Docker Build (Multi-stage)
```bash
# Build image
docker build -t easypanel/n8n/hemiph:latest .

# Deploy on Docker Swarm
docker service update --force --image easypanel/n8n/hemiph:latest n8n_hemiph
```

### Easypanel Deployment
- **Server**: VPS at `82.29.173.205` (SSH key: `srv750816.key`)
- **Service**: `n8n_hemiph` on Docker Swarm
- **Path**: `/etc/easypanel/projects/n8n/hemiph/code`
- **Image**: `easypanel/n8n/hemiph:latest`
- **Port**: 80 (exposed via Docker)
- **Networks**: `easypanel`, `easypanel-n8n`, `easypanel-postgres`

### Environment Variables
```bash
# Database
DB_HOST=postgres_postgres
DB_PORT=5432
DB_NAME=hemispheria
DB_USER=postgres
DB_PASSWORD=M4x1m012

# Server
PORT=80
NODE_ENV=production
JWT_SECRET=hemispheria-secret-key-2024
```

### Deployment Workflow
1. Make changes locally
2. Commit and push to GitHub (`main` branch)
3. SSH to VPS and pull changes OR copy files via SCP
4. Rebuild Docker image
5. Update service with `--force` flag
6. Verify deployment (check site is up)

**Note**: The code directory on the server may not always have a `.git` folder. Use SCP to copy files directly when needed.

## Tech Stack Rules (from AI_RULES.md)

**Framework & Language**:
- React 18 with TypeScript
- React Router for routing (routes in `src/App.tsx`)
- Vite for build tooling

**Styling**:
- Tailwind CSS for all styling (extensive use of utility classes)
- shadcn/ui components (DO NOT edit files in `src/components/ui/`)
- Framer Motion for animations
- Lucide React for icons

**Component Organization**:
- Pages go in `src/pages/`
- Components go in `src/components/`
- Main landing page is `src/pages/Index.tsx`
- ALWAYS update main page routes when adding new components

**UI Components**:
- All Radix UI primitives are installed
- Use shadcn/ui components by importing them
- Create new wrapper components if customization is needed

## Important Content Notes

**Team Photos** (`src/pages/About.tsx`):
- Photos stored in `public/team/`
- Each team member has `photoPosition` property for custom cropping
- Wolfgang, Erika, Alberto (Panamá) and Jorge (Madrid)

**Project Images** (`src/pages/Projects.tsx`):
- Images stored in `public/images/`
- Use `.jpeg` extension for consistency
- Current project images (lines 26-94):
  - **Salud materna** (id: 0): `/images/ertd.jpeg` - Health worker with tablet in rural Colombia
  - **Clima influencers** (id: 1): `/images/hemispher-ia-desarrollo-web-01.jpeg` - Climate activists
  - **Migración Darién** (id: 2): `/images/hemispher-ia-desarrollo-web-03.jpeg` - Field team with migration map
  - **Educación financiera** (id: 3): `/images/hemispher-ia-desarrollo-web-02.jpeg` - Indigenous financial education platform

**Institutional Video** (`src/pages/About.tsx`):
- Video stored in `public/videos/institucional.mp4` (33 MB)
- Displays on About page with custom video player controls
- Uses poster image from `/images/hemispher-ia-desarrollo-web-01.jpeg`
- **Custom Controls** (appear on hover):
  - Progress bar with seek functionality
  - Play/Pause button
  - Volume control with mute/unmute toggle
  - Volume slider (expands on hover over volume icon)
  - Time display (current time / total duration)
  - Fullscreen button
  - Subtle gradient background on control panel
- **Interactions**:
  - Click video to play/pause
  - Hover over player to show controls
  - Controls fade out during playback (except when paused)
- **Styling**: Custom range slider styles in `src/globals.css`
- Important: Video files must be copied to server via SCP during deployment

**How to add/update project images:**
1. Copy image to `public/images/` (local)
2. Update `image` property in `projects` array in `src/pages/Projects.tsx`
3. Commit: `git add . && git commit -m "feat: Add [project] image"`
4. Push: `git push origin main`
5. Deploy to server:
   ```bash
   # Copy file to server
   scp -i "C:/Users/TRENDING PC/srv750816.key" \
     "C:/Users/TRENDING PC/HemispherIA_web_git/src/pages/Projects.tsx" \
     root@82.29.173.205:/etc/easypanel/projects/n8n/hemiph/code/src/pages/

   # Build and deploy
   ssh -i "C:/Users/TRENDING PC/srv750816.key" root@82.29.173.205 \
     "cd /etc/easypanel/projects/n8n/hemiph/code && \
      docker build -t easypanel/n8n/hemiph:latest . && \
      docker service update --force --image easypanel/n8n/hemiph:latest n8n_hemiph"
   ```
6. Verify: `curl -s -o /dev/null -w "%{http_code}" https://n8n-hemiph.v2j42m.easypanel.host/`

**Admin Panel**:
- Access via `/admin` (requires login)
- Default credentials: `admin` / `admin123`
- GrapeJS page builder at `/admin/builder`
- Nested routes for content, media, comments, settings

## Page Builder (GrapeJS)

**Component**: `src/components/admin/PageBuilder.tsx`

**Features**:
- Drag-and-drop visual editor
- Custom blocks (hero, feature cards, testimonials, gallery, footer)
- Responsive device preview
- Save/load from database
- Export to standalone HTML

**Storage**:
- Pages stored in PostgreSQL `pages` table
- Stores both raw HTML/CSS and GrapeJS JSON format
- Uses `components` and `styles` fields for GrapeJS data
