# Hemispher-IA - Estado del Proyecto

**Última actualización:** 2025-11-27
**Estado:** ✅ PRODUCCIÓN - FUNCIONANDO CORRECTAMENTE

## 🌐 Información de Despliegue

### URLs
- **Producción:** https://n8n-hemiph.v2j42m.easypanel.host
- **Repositorio GitHub:** https://github.com/webhook-ja/HemispherIA_web

### Servidor
- **VPS:** 82.29.173.205
- **Usuario:** root
- **SSH Key:** srv750816.key
- **Ruta del proyecto:** /etc/easypanel/projects/n8n/hemiph/code
- **Docker Service:** n8n_hemiph
- **Puerto:** 80

## 📋 Stack Tecnológico

- **Frontend:** React 18 + Vite
- **Routing:** React Router DOM v6
- **UI:** Radix UI + Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Deployment:** Docker + Easypanel

## 🎯 Páginas Actuales

| Ruta | Componente | Descripción | Estado |
|------|-----------|-------------|---------|
| `/` | Index.tsx | Página de inicio | ✅ Activo |
| `/about` | About.tsx | Quiénes somos | ✅ Activo |
| `/services` | Services.tsx | Qué hacemos | ✅ Activo |
| `/projects` | Projects.tsx | Proyectos | ✅ Activo |
| `/public-info` | PublicInfo.tsx | Información pública | ✅ Activo |
| `/contact` | Contact.tsx | Contacto | ✅ Activo |
| `/login` | Login.tsx | Inicio de sesión | ✅ Activo |
| `/admin` | Admin.tsx | Administración | ✅ Activo |

## 🔧 Navegación

**Componente:** `src/components/AnimatedNavbar.tsx`

**Menú principal (6 items):**
1. INICIO → `/`
2. QUIÉNES SOMOS → `/about`
3. QUÉ HACEMOS → `/services`
4. PROYECTOS → `/projects`
5. INFORMACIÓN PÚBLICA → `/public-info`
6. CONTACTO → `/contact`

**Nota importante:** El componente AnimatedNavbar.tsx es el que usa Index.tsx, NO Navbar.tsx.

## 🏗️ Estructura del Proyecto

```
/etc/easypanel/projects/n8n/hemiph/code/
├── Dockerfile
├── nginx.conf
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── server/
│   ├── index.js      # Express server
│   └── email.js      # Email functionality
├── src/
│   ├── main.tsx      # Entry point
│   ├── App.tsx       # Main router
│   ├── index.css     # Global styles
│   ├── components/
│   │   ├── AnimatedNavbar.tsx          # Main navigation
│   │   ├── AnimatedAboutSection.tsx
│   │   ├── AnimatedServicesSection.tsx
│   │   ├── AnimatedProjectsSection.tsx
│   │   ├── AnimatedHubSection.tsx
│   │   └── AnimatedJoinSection.tsx
│   └── pages/
│       ├── Index.tsx        # Homepage
│       ├── About.tsx
│       ├── Services.tsx
│       ├── Projects.tsx
│       ├── PublicInfo.tsx   # NEW - Nov 27, 2025
│       ├── Contact.tsx
│       ├── Login.tsx
│       ├── Admin.tsx
│       └── NotFound.tsx
└── public/
    └── placeholder.svg
```

## 🐳 Docker Configuration

### Dockerfile (Multi-stage build)

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=80
COPY package.json package-lock.json* ./
RUN npm install --omit=dev
COPY server ./server
COPY --from=builder /app/dist ./dist
EXPOSE 80
CMD ["node", "server/index.js"]
```

### Environment Variables

```bash
PORT=80                 # Server port
NODE_ENV=production     # Environment
```

## 📝 Historial de Cambios Recientes

### 2025-11-27: Corrección de Menú Duplicado ✅

**Problema:**
- Menú tenía 2 items "CONTACTO" (duplicado)
- Faltaba "INFORMACIÓN PÚBLICA" en el menú

**Solución:**
1. Actualizado `AnimatedNavbar.tsx`:
   - Añadido item "INFORMACIÓN PÚBLICA" → `/public-info`
   - Eliminado botón duplicado de CONTACTO del menú móvil
2. Creada página `PublicInfo.tsx` con secciones:
   - Noticias
   - Comunicados de prensa
   - Calendario de eventos
   - Documentos públicos
3. Añadida ruta en `App.tsx`

**Archivos modificados:**
- `src/components/AnimatedNavbar.tsx`
- `src/pages/PublicInfo.tsx` (nuevo)
- `src/App.tsx`

### 2025-11-27: Fix PORT Conflict ✅

**Problema:**
- Docker service tenía variables duplicadas: `PORT=80` y `PORT=3000`
- Servidor corría en puerto 3000 causando error 502

**Solución:**
```bash
docker service update --env-rm PORT n8n_hemiph
docker service update --env-add PORT=80 n8n_hemiph
```

## 🚀 Comandos de Despliegue

### Deploy completo desde local

```bash
# 1. Clonar repositorio
git clone https://github.com/webhook-ja/HemispherIA_web.git
cd HemispherIA_web

# 2. Copiar al VPS
scp -i "C:/Users/TRENDING PC/srv750816.key" -r ./* root@82.29.173.205:/etc/easypanel/projects/n8n/hemiph/code/

# 3. SSH al VPS y rebuild
ssh -i "C:/Users/TRENDING PC/srv750816.key" root@82.29.173.205
cd /etc/easypanel/projects/n8n/hemiph/code
docker build -t easypanel/n8n/hemiph:latest .
docker service update --force n8n_hemiph
```

### Verificar estado

```bash
# Check service status
docker service ps n8n_hemiph

# Check logs
docker service logs n8n_hemiph --tail 50

# Check site
curl -I https://n8n-hemiph.v2j42m.easypanel.host
```

### Rollback a versión anterior

```bash
# Restaurar desde backup
BACKUP_DIR="/root/hemispheria_backup_YYYYMMDD_HHMMSS"
cp -r $BACKUP_DIR/* /etc/easypanel/projects/n8n/hemiph/code/
docker service update --force n8n_hemiph
```

## 🔍 Troubleshooting

### Error 502 Bad Gateway

**Causa:** Container no está escuchando en el puerto correcto

**Solución:**
```bash
# Verificar puerto del container
docker service logs n8n_hemiph --tail 10
# Debe decir: "Server running on port 80"

# Si dice port 3000, verificar variables de entorno
docker service inspect n8n_hemiph --format "{{json .Spec.TaskTemplate.ContainerSpec.Env}}"

# Limpiar PORT duplicado
docker service update --env-rm PORT n8n_hemiph
docker service update --env-add PORT=80 n8n_hemiph
```

### Menu no se actualiza en el navegador

**Causa:** Cache del navegador

**Solución:**
- Chrome/Edge: `Ctrl+Shift+R` (Windows) o `Cmd+Shift+R` (Mac)
- Firefox: `Ctrl+F5`
- Safari: `Cmd+Option+R`

### Build falla con "Failed to resolve entry"

**Causa:** Faltan archivos de entrada (main.tsx, index.css)

**Solución:**
```bash
# Verificar archivos existen
ls -la /etc/easypanel/projects/n8n/hemiph/code/src/main.tsx
ls -la /etc/easypanel/projects/n8n/hemiph/code/src/index.css
ls -la /etc/easypanel/projects/n8n/hemiph/code/index.html

# Si faltan, restaurar desde GitHub
git clone https://github.com/webhook-ja/HemispherIA_web.git temp
cp -r temp/* /etc/easypanel/projects/n8n/hemiph/code/
rm -rf temp
```

## 📦 Backups

### Ubicación de backups

```
/root/hemispheria_backup_YYYYMMDD_HHMMSS/
```

### Crear backup manual

```bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/root/hemispheria_backup_$TIMESTAMP"
mkdir -p $BACKUP_DIR
cp -r /etc/easypanel/projects/n8n/hemiph/code/* $BACKUP_DIR/
echo "Backup creado en: $BACKUP_DIR"
```

### Restaurar desde backup

```bash
# Listar backups disponibles
ls -la /root/hemispheria_backup_*

# Restaurar (reemplazar YYYYMMDD_HHMMSS con el timestamp deseado)
BACKUP_DIR="/root/hemispheria_backup_20251127_223000"
cp -r $BACKUP_DIR/* /etc/easypanel/projects/n8n/hemiph/code/
cd /etc/easypanel/projects/n8n/hemiph/code
docker service update --force n8n_hemiph
```

## 🔐 Credenciales

**SSH:**
- Host: 82.29.173.205
- User: root
- Key: C:\Users\TRENDING PC\srv750816.key

**Easypanel:**
- URL: https://v2j42m.easypanel.host
- Proyecto: n8n
- Service: hemiph

## 📞 Contacto de Desarrollo

**Última modificación por:** Claude Code AI Assistant
**Fecha:** 2025-11-27
**Estado del deployment:** ✅ EXITOSO

---

**Nota para futuros desarrolladores:**
Este documento debe actualizarse cada vez que se hagan cambios significativos al proyecto. Incluir siempre la fecha, descripción del cambio y archivos modificados.
