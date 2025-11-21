# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HemispherIA is a professional web platform connecting knowledge, talent, and technology for sustainable development in Latin America. It's a React + TypeScript SPA with an Express.js backend serving both the API and static files.

## Commands

```bash
# Development
npm install          # Install dependencies
npm run dev          # Start Vite dev server (localhost:5173)

# Production
npm run build        # Build frontend with Vite
npm start            # Start Express server (serves API + static files)

# Linting
npm run lint         # Run ESLint
```

## Architecture

### Frontend (React + Vite + TypeScript)
- Entry point: `src/main.tsx` → `src/App.tsx`
- Routes defined in `src/App.tsx` using React Router
- Main page: `src/pages/Index.tsx`
- Admin panel: `src/pages/Admin.tsx` with nested routes

### Backend (Express.js)
- Single server file: `server/index.js`
- Serves both REST API (`/api/*`) and static files from `dist/`
- PostgreSQL database connection via `pg` pool
- File uploads handled by multer → `dist/uploads/`

### Key Components
- **Page Builder**: `src/components/admin/PageBuilder.tsx` - GrapeJS visual editor for drag-and-drop page building
- **Admin Layout**: `src/components/admin/AdminLayout.tsx` - Sidebar navigation wrapper
- **UI Components**: `src/components/ui/` - shadcn/ui components (do not edit directly)

## Database Schema (PostgreSQL)

Tables: `contacts`, `content`, `media`, `settings`, `pages`, `templates`, `blocks`, `assets`, `site_config`

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/health` | Health check with DB status |
| `/api/contacts` | Contact form submissions |
| `/api/content` | CMS content management |
| `/api/stats` | Dashboard statistics |
| `/api/pages` | Page builder pages (CRUD) |
| `/api/blocks` | Custom GrapeJS blocks |
| `/api/assets` | Uploaded media assets |
| `/api/upload` | File upload (multipart/form-data) |
| `/api/templates` | Page templates |
| `/api/site-config` | Site configuration key-value store |

## Deployment

Deployed via Docker Swarm on Easypanel:
- Image: `n8n_hemiph:latest`
- Networks: `easypanel`, `easypanel-n8n`, `easypanel-postgres`
- Environment variables: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `PORT`

Build and deploy:
```bash
docker build -t n8n_hemiph:latest .
docker service update --image n8n_hemiph:latest n8n_hemiph
```

## Tech Stack Rules

From `AI_RULES.md`:
- Use TypeScript with React Router (routes in `src/App.tsx`)
- Pages go in `src/pages/`, components in `src/components/`
- Always use Tailwind CSS for styling
- Use shadcn/ui components from `src/components/ui/` (don't edit these)
- Icons from lucide-react
