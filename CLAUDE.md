# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Hemispher-IA** (note the hyphen) is a professional web platform connecting knowledge, talent, and technology for sustainable development in Latin America and the Caribbean. It's a React + TypeScript SPA with an Express.js backend that serves both the API and static files.

**Key Feature**: Includes a GrapeJS-based page builder for drag-and-drop content creation in the admin panel.

## 🚨 CRITICAL: Deployment Issues & Solutions

### ⚠️ PROBLEMA COMÚN: Easypanel Borra Archivos Durante Rebuild

**Síntoma**: Error `package.json: not found` o `nginx.conf: not found` durante build de Docker.

**Causa**: Easypanel limpia el directorio `/etc/easypanel/projects/n8n/hemiph/code/` antes de rebuild, dejando solo un Dockerfile antiguo con nginx.

**SOLUCIÓN DEFINITIVA - Rebuild Manual:**

```bash
# 1. Copiar TODOS los archivos al servidor
cd HemispherIA_web_git

# Archivos de configuración
scp -i "srv750816.key" Dockerfile package.json package-lock.json *.config.* *.json index.html .gitignore .env.example root@82.29.173.205:/etc/easypanel/projects/n8n/hemiph/code/

# Directorios completos
scp -i "srv750816.key" -r server src public root@82.29.173.205:/etc/easypanel/projects/n8n/hemiph/code/

# 2. Build MANUAL en el servidor (NO usar UI de Easypanel)
ssh -i "srv750816.key" root@82.29.173.205 "cd /etc/easypanel/projects/n8n/hemiph/code && docker build --no-cache -t easypanel/n8n/hemiph:latest ."

# 3. Actualizar servicio Docker Swarm
ssh -i "srv750816.key" root@82.29.173.205 "docker service update --force --image easypanel/n8n/hemiph:latest n8n_hemiph"

# 4. Verificar
curl -I https://n8n-hemiph.v2j42m.easypanel.host/
curl https://n8n-hemiph.v2j42m.easypanel.host/api/health
```

**IMPORTANTE**:
- ❌ NO usar el botón "Deploy" de Easypanel UI
- ✅ SIEMPRE hacer build manual con los comandos anteriores
- ✅ El Dockerfile CORRECTO usa Node.js + Express (NO nginx)

---

### 🔧 Dockerfile Correcto

**ESTE es el Dockerfile correcto (verifica que esté en el servidor):**

```dockerfile
# syntax=docker/dockerfile:1

# Build stage - compile frontend
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install all dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY . .

# Build the frontend
RUN npm run build

# Production stage - Node.js server
FROM node:20-alpine AS production
WORKDIR /app

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Copy package files
COPY package.json package-lock.json* ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy server code
COPY server ./server

# Copy built frontend from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "server/index.js"]
```

**❌ NUNCA usar este Dockerfile (ANTIGUO/INCORRECTO):**
```dockerfile
# Este es el Dockerfile VIEJO que causa errores
FROM nginx:1.27-alpine  # ❌ INCORRECTO
COPY nginx.conf /etc/nginx/conf.d/default.conf  # ❌ Archivo no existe
```

---

### 🌐 Configuración de Traefik (Routing HTTPS)

**Problema**: Easypanel regenera `main.yaml` automáticamente, borrando cambios manuales.

**Solución**: Archivo de configuración separado y persistente.

**Archivo**: `/etc/easypanel/traefik/config/hemiph-custom.yml`

```yaml
http:
  routers:
    http-n8n_hemiph-easypanel:
      service: n8n_hemiph-easypanel
      rule: Host(`n8n-hemiph.v2j42m.easypanel.host`)
      priority: 10
      middlewares:
        - redirect-to-https
      entryPoints:
        - http

    https-n8n_hemiph-easypanel:
      service: n8n_hemiph-easypanel
      rule: Host(`n8n-hemiph.v2j42m.easypanel.host`)
      priority: 10
      tls:
        certResolver: letsencrypt
      entryPoints:
        - https

  services:
    n8n_hemiph-easypanel:
      loadBalancer:
        servers:
          - url: http://n8n_hemiph:3000/
        passHostHeader: true
```

**Cómo aplicar la configuración:**

```bash
# 1. Copiar archivo al servidor
scp -i "srv750816.key" hemiph-custom.yml root@82.29.173.205:/etc/easypanel/traefik/config/

# 2. Recargar Traefik (sin reiniciar)
ssh -i "srv750816.key" root@82.29.173.205 "docker kill -s HUP \$(docker ps -q --filter name=traefik)"

# 3. Verificar
curl -I https://n8n-hemiph.v2j42m.easypanel.host/
# Debe devolver: HTTP/1.1 200 OK
```

**Backup local**: `C:\Users\TRENDING PC\hemiph-custom.yml`

---

### 📦 Archivos Críticos que DEBEN estar en el Servidor

Verifica que estos archivos existan en `/etc/easypanel/projects/n8n/hemiph/code/`:

```bash
ssh root@82.29.173.205 "ls -la /etc/easypanel/projects/n8n/hemiph/code/"

# Debe mostrar:
✅ Dockerfile (859 bytes - con Node.js + Express)
✅ package.json
✅ package-lock.json
✅ index.html
✅ vite.config.ts
✅ tailwind.config.ts
✅ tsconfig.json, tsconfig.app.json, tsconfig.node.json
✅ server/ (directorio con index.js, email.js)
✅ src/ (directorio con App.tsx, components/, pages/, etc.)
✅ public/ (directorio con favicon.ico, logo.jpeg, images/, team/, videos/)
```

**Si falta algún archivo**: Ejecutar el proceso de "Rebuild Manual" completo.

---

### 🔍 Diagnóstico Rápido

**Si el sitio da 404:**

```bash
# 1. Verificar que el contenedor está corriendo
ssh root@82.29.173.205 "docker service ps n8n_hemiph --no-trunc"
# Debe mostrar: Running

# 2. Verificar logs del servidor
ssh root@82.29.173.205 "docker service logs --tail 20 n8n_hemiph"
# Debe mostrar:
# ✅ Database initialized successfully
# ✅ Server running on port 3000
# ✅ SMTP Server ready to send emails

# 3. Verificar configuración de Traefik
ssh root@82.29.173.205 "cat /etc/easypanel/traefik/config/hemiph-custom.yml"
# Debe existir y contener la configuración correcta

# 4. Test desde dentro del servidor
ssh root@82.29.173.205 "curl -s http://localhost:3000/ | head -10"
# Debe devolver HTML

# 5. Test desde fuera
curl -I https://n8n-hemiph.v2j42m.easypanel.host/
# Debe devolver: HTTP/1.1 200 OK
```

**Si algún test falla**: Ejecutar "Rebuild Manual" completo.

---

## Commands

```bash
# Development (Local)
npm install          # Install dependencies
npm run dev          # Start Vite dev server (localhost:5173)

# Production (Local build)
npm run build        # Build frontend with Vite
npm start            # Start Express server (port 3000)

# Linting
npm run lint         # Run ESLint

# Deployment (Manual)
# Ver sección "SOLUCIÓN DEFINITIVA - Rebuild Manual" arriba
```

---

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
- Listens on `0.0.0.0:3000` (permite conexiones desde Docker)

---

## Database Schema (PostgreSQL)

**Connection Details**:
- Host: `postgres_postgres` (Docker network)
- Port: `5432`
- Database: `hemispheria`
- User: `postgres`
- Password: `M4x1m012`

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

---

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

---

## Deployment

### Información del Servidor

- **VPS**: 82.29.173.205
- **SSH Key**: `C:\Users\TRENDING PC\srv750816.key`
- **Servicio Docker**: `n8n_hemiph`
- **Directorio**: `/etc/easypanel/projects/n8n/hemiph/code`
- **Red Docker**: `easypanel`, `easypanel-n8n`, `easypanel-postgres`

### URLs del Proyecto

- **Producción**: https://n8n-hemiph.v2j42m.easypanel.host/
- **API Health**: https://n8n-hemiph.v2j42m.easypanel.host/api/health
- **Admin Panel**: https://n8n-hemiph.v2j42m.easypanel.host/admin

### Environment Variables (Servidor)

```bash
# Database
DB_HOST=postgres_postgres
DB_PORT=5432
DB_NAME=hemispheria
DB_USER=postgres
DB_PASSWORD=M4x1m012

# Server
PORT=3000              # ← IMPORTANTE: Puerto 3000 (no 80)
NODE_ENV=production
JWT_SECRET=hemispheria-secret-key-2024
```

### Proceso Completo de Deployment

**IMPORTANTE**: NO usar el botón "Deploy" de Easypanel. Siempre hacer deployment manual.

```bash
# 1. Hacer cambios locales y commit
cd "C:/Users/TRENDING PC/HemispherIA_web_git"
git add .
git commit -m "feat: descripción del cambio"
git push origin main

# 2. Copiar TODOS los archivos al servidor
scp -i "C:/Users/TRENDING PC/srv750816.key" \
  Dockerfile package.json package-lock.json *.config.* *.json index.html .gitignore .env.example \
  root@82.29.173.205:/etc/easypanel/projects/n8n/hemiph/code/

scp -i "C:/Users/TRENDING PC/srv750816.key" -r \
  server src public \
  root@82.29.173.205:/etc/easypanel/projects/n8n/hemiph/code/

# 3. Build manual de la imagen Docker
ssh -i "C:/Users/TRENDING PC/srv750816.key" root@82.29.173.205 \
  "cd /etc/easypanel/projects/n8n/hemiph/code && \
   docker build --no-cache -t easypanel/n8n/hemiph:latest ."

# 4. Actualizar servicio Docker Swarm
ssh -i "C:/Users/TRENDING PC/srv750816.key" root@82.29.173.205 \
  "docker service update --force --image easypanel/n8n/hemiph:latest n8n_hemiph"

# 5. Esperar convergencia (30-60 segundos)
sleep 30

# 6. Verificar deployment
curl -I https://n8n-hemiph.v2j42m.easypanel.host/
curl https://n8n-hemiph.v2j42m.easypanel.host/api/health

# 7. Ver logs (opcional)
ssh -i "C:/Users/TRENDING PC/srv750816.key" root@82.29.173.205 \
  "docker service logs --tail 50 n8n_hemiph"
```

**Resultado esperado**:
```
✅ Build completado: "✓ 2783 modules transformed"
✅ Service converged successfully
✅ HTTP 200 OK
✅ {"status":"ok","database":"connected"}
```

---

## Tech Stack

**Framework & Language**:
- React 18 with TypeScript
- React Router for routing (routes in `src/App.tsx`)
- Vite for build tooling

**Styling**:
- Tailwind CSS for all styling
- shadcn/ui components (DO NOT edit files in `src/components/ui/`)
- Framer Motion for animations
- Lucide React for icons

**Backend**:
- Express.js
- PostgreSQL with `pg` driver
- Nodemailer for emails
- Multer for file uploads
- JWT for authentication

---

## Important Content Notes

**Team Photos** (`src/pages/About.tsx`):
- Photos stored in `public/team/`
- Each team member has `photoPosition` property for custom cropping
- Wolfgang, Erika, Alberto (Panamá) and Jorge (Madrid)

**Project Images** (`src/pages/Projects.tsx`):
- Images stored in `public/images/`
- Use `.jpeg` extension for consistency
- Current projects:
  - Salud materna: `/images/ertd.jpeg`
  - Clima influencers: `/images/hemispher-ia-desarrollo-web-01.jpeg`
  - Migración Darién: `/images/hemispher-ia-desarrollo-web-03.jpeg`
  - Educación financiera: `/images/hemispher-ia-desarrollo-web-02.jpeg`

**Institutional Video** (`src/pages/About.tsx`):
- Video: `public/videos/institucional.mp4` (33 MB)
- Custom video player with controls
- Must be copied via SCP during deployment

**Admin Panel**:
- Access: `/admin` (requires login)
- Default credentials: `admin` / `admin123`
- GrapeJS page builder: `/admin/builder`

---

## Page Builder (GrapeJS)

**Component**: `src/components/admin/PageBuilder.tsx`

**Features**:
- Drag-and-drop visual editor
- Custom blocks (hero, feature cards, testimonials, gallery, footer)
- Responsive device preview
- Save/load from database
- Export to standalone HTML

**Storage**:
- PostgreSQL `pages` table
- Stores both HTML/CSS and GrapeJS JSON
- Fields: `components`, `styles`

---

## Troubleshooting

### Sitio da 404

1. Verificar contenedor: `docker service ps n8n_hemiph`
2. Verificar logs: `docker service logs --tail 20 n8n_hemiph`
3. Verificar Traefik: `cat /etc/easypanel/traefik/config/hemiph-custom.yml`
4. Ejecutar rebuild manual completo

### Error "package.json: not found"

1. Easypanel borró los archivos
2. Ejecutar "SOLUCIÓN DEFINITIVA - Rebuild Manual" completo
3. NUNCA usar botón "Deploy" de Easypanel UI

### Error "nginx.conf: not found"

1. El servidor tiene Dockerfile antiguo con nginx
2. Copiar Dockerfile correcto (con Node.js + Express)
3. Ejecutar rebuild manual

### Sitio funciona pero da error al hacer cambios

1. Easypanel probablemente regeneró archivos
2. Volver a copiar todos los archivos con SCP
3. Hacer build manual

---

## Checklist Pre-Deployment

Antes de hacer deployment, verificar:

- [ ] Cambios commiteados en Git
- [ ] Dockerfile correcto en el repositorio (Node.js + Express, NO nginx)
- [ ] `hemiph-custom.yml` respaldado localmente
- [ ] SSH key disponible: `srv750816.key`
- [ ] Conexión SSH funciona: `ssh -i srv750816.key root@82.29.173.205`
- [ ] Seguir proceso "SOLUCIÓN DEFINITIVA - Rebuild Manual"
- [ ] NO usar botón "Deploy" de Easypanel UI

---

## Version History

**v4.0 (16 Diciembre 2025)** - Documentación completa de deployment manual
- Solución definitiva para problema de Easypanel borrando archivos
- Instrucciones de rebuild manual paso a paso
- Configuración de Traefik persistente
- Proceso de diagnóstico y troubleshooting

**v3.2 (24 Noviembre 2024)** - Complete Reservation Summary Fix
- AI Agent sends complete reservation summary
- Calendar link included in confirmations

**v3.1 (9 Noviembre 2025)** - WordPress MCP Integration
- WordPress MCP Adapter plugin added

**v3.0 (7 Noviembre 2025)** - AI Agent optimization
- Brevity and conversational tone improvements
