# Hemispher-IA - Historial de Despliegues

Este documento registra todos los despliegues y cambios importantes realizados en el proyecto Hemispher-IA.

---

## 2025-12-08 20:00 UTC - Mapa Interactivo en Página de Contacto ✅

**Deployado por:** Claude Sonnet 4.5
**Estado:** ✅ EXITOSO
**URL:** https://n8n-hemiph.v2j42m.easypanel.host/contact

### Cambios Realizados

#### 1. Integración de Google Maps
**Problema/Necesidad:**
- Página de contacto tenía placeholder estático del mapa
- Falta de información visual de ubicación física

**Archivos modificados:**
- `src/pages/Contact.tsx` - Reemplazado placeholder con iframe de Google Maps

**Solución:**
- Google Maps embed con ubicación exacta: Calle Luis Bonilla 104, Ciudad del Saber, Panamá
- Coordenadas: 8.99913°, -79.58413°
- Mapa responsive con bordes redondeados y sombra
- Atributos de accesibilidad (title, allowFullScreen, loading lazy)

### Commits de Git
```bash
git commit -m "feat: Agregar mapa interactivo de Google Maps en página de contacto"
```
**Commit hash:** 442b488

### Verificación Post-Deploy
- ✅ Site HTTP 200 OK
- ✅ Página /contact accesible
- ✅ Mapa de Google carga correctamente
- ✅ Service Docker actualizado sin errores
- ✅ Build completado en 17s

### Proceso de Deploy
1. Commit y push a GitHub (main branch)
2. SCP de Contact.tsx al VPS
3. Docker build (331MB transferidos en 22s)
4. Service update con verificación automática
5. Verificación HTTP exitosa

---

## 2025-12-02 22:50 UTC - Actualización Manual y Despliegue ✅

**Deployado por:** Antigravity (Google Deepmind Agent)
**Estado:** ✅ EXITOSO
**URL:** https://n8n-hemiph.v2j42m.easypanel.host

### Cambios Realizados

#### 1. Subida de Imágenes SEO
**Problema/Necesidad:**
- Actualización de activos visuales con optimización SEO.

**Acciones:**
- Renombrado de imágenes a formato `hemispher-ia-desarrollo-web-XX`.
- Subida a carpeta `public/images` en VPS.
- Re-despliegue del servicio.

#### 2. Despliegue de Mantenimiento
**Problema/Necesidad:**
- Actualización y verificación del estado del despliegue actual.

**Acciones:**
- Verificación de credenciales y acceso SSH.
- Empaquetado manual de archivos (`deploy.tar.gz`).
- Despliegue en VPS mediante Docker Swarm.

### Verificación Post-Deploy
- ✅ Servicio Docker `n8n_hemiph` actualizado y corriendo.
- ✅ Verificación de logs y estado del servicio.

---

## 2025-11-27 22:40 UTC - Corrección Menú + Fix PORT ✅

**Deployado por:** Claude Code AI
**Estado:** ✅ EXITOSO
**URL:** https://n8n-hemiph.v2j42m.easypanel.host

### Cambios Realizados

#### 1. Corrección de Menú Duplicado
**Problema:**
- AnimatedNavbar tenía 2 items "CONTACTO" (uno en navItems y otro como botón extra en menú móvil)
- Faltaba el link a "INFORMACIÓN PÚBLICA" en el menú

**Archivos modificados:**
- `src/components/AnimatedNavbar.tsx` - Actualizado navItems array y removido botón duplicado
- `src/pages/PublicInfo.tsx` - Creado (nueva página)
- `src/App.tsx` - Añadida ruta `/public-info`

**Menú final (6 items):**
1. INICIO → `/`
2. QUIÉNES SOMOS → `/about`
3. QUÉ HACEMOS → `/services`
4. PROYECTOS → `/projects`
5. INFORMACIÓN PÚBLICA → `/public-info` ← NUEVO
6. CONTACTO → `/contact`

#### 2. Fix Conflicto de Puerto
**Problema:**
- Docker service tenía variables de entorno duplicadas: `PORT=80` y `PORT=3000`
- Container arrancaba en puerto 3000, causando error 502 Bad Gateway

**Solución:**
```bash
docker service update --env-rm PORT n8n_hemiph
docker service update --env-add PORT=80 n8n_hemiph
```

**Resultado:** Container ahora corre correctamente en puerto 80

### Commits de Git
```bash
git add .
git commit -m "fix: Corregir menú duplicado y añadir página de Información Pública

- AnimatedNavbar: añadido INFORMACIÓN PÚBLICA, eliminado CONTACTO duplicado
- Creada PublicInfo.tsx con secciones de noticias, comunicados, eventos y documentos
- App.tsx: añadida ruta /public-info
- Fix: Variables PORT duplicadas en Docker service

🤖 Generated with Claude Code
```

### Verificación Post-Deploy
- ✅ Site HTTP 200 OK
- ✅ Menú muestra 6 items sin duplicados
- ✅ Página /public-info accesible
- ✅ Container corriendo en puerto 80
- ✅ Logs sin errores

### Backup Creado
- Ubicación: `/root/hemispheria_backup_20251127_224000/`
- Contenido: Código fuente completo pre-deployment

---

## 2025-11-27 18:00 UTC - Deploy Inicial desde GitHub ✅

**Deployado por:** Claude Code AI
**Estado:** ✅ EXITOSO

### Acciones Realizadas

1. **Clonado repositorio completo desde GitHub**
   ```bash
   git clone https://github.com/webhook-ja/HemispherIA_web.git
   ```

2. **Instalación de dependencias**
   ```bash
   npm install
   ```

3. **Build del proyecto**
   ```bash
   npm run build
   ```

4. **Copiado al servidor VPS**
   ```bash
   scp -r ./* root@82.29.173.205:/etc/easypanel/projects/n8n/hemiph/code/
   ```

5. **Build y deploy de Docker image**
   ```bash
   docker build -t easypanel/n8n/hemiph:latest .
   docker service update --force n8n_hemiph
   ```

### Archivos Críticos Creados/Restaurados

- `package.json` - Dependencias del proyecto
- `Dockerfile` - Multi-stage build (builder + production)
- `vite.config.ts` - Configuración de Vite
- `tsconfig.json` - Configuración de TypeScript
- `nginx.conf` - Configuración de nginx (no usado en versión actual)
- `index.html` - HTML entry point
- `server/index.js` - Express server
- `src/main.tsx` - React entry point
- `src/App.tsx` - Main router

### Páginas Desplegadas

- Index.tsx (homepage)
- About.tsx
- Services.tsx
- Projects.tsx
- Contact.tsx
- Login.tsx
- Admin.tsx
- NotFound.tsx

### Verificación
- ✅ Build exitoso
- ✅ Docker image creado
- ✅ Service actualizado
- ✅ Site accesible en https://n8n-hemiph.v2j42m.easypanel.host

---

## Template para Futuros Despliegues

```markdown
## YYYY-MM-DD HH:MM UTC - Título del Deploy

**Deployado por:** [Nombre/AI]
**Estado:** [✅ EXITOSO / ❌ FALLIDO / ⚠️ PARCIAL]
**URL:** https://n8n-hemiph.v2j42m.easypanel.host

### Cambios Realizados

#### 1. [Nombre del cambio]
**Problema/Necesidad:**
- [Descripción]

**Archivos modificados:**
- `ruta/archivo.tsx` - [Descripción del cambio]

**Solución:**
[Explicación de la solución implementada]

### Commits de Git
```bash
git add .
git commit -m "tipo: mensaje descriptivo

Detalles del commit...

🤖 Generated with Claude Code"
```

### Verificación Post-Deploy
- [ ] Site HTTP 200 OK
- [ ] Funcionalidad X funcionando
- [ ] Logs sin errores críticos
- [ ] Performance aceptable

### Backup Creado
- Ubicación: `/root/hemispheria_backup_YYYYMMDD_HHMMSS/`

### Rollback (si es necesario)
```bash
BACKUP_DIR="/root/hemispheria_backup_YYYYMMDD_HHMMSS"
cp -r $BACKUP_DIR/* /etc/easypanel/projects/n8n/hemiph/code/
docker service update --force n8n_hemiph
```
```

---

## Notas de Mantenimiento

### Frecuencia de Backups Recomendada
- **Antes de cada deploy:** OBLIGATORIO
- **Diariamente:** Recomendado para producción
- **Retención:** Mantener últimos 7 backups

### Procedimiento de Emergency Rollback

1. **Identificar último backup estable**
   ```bash
   ls -lat /root/hemispheria_backup_* | head -5
   ```

2. **Detener servicio actual**
   ```bash
   docker service scale n8n_hemiph=0
   ```

3. **Restaurar archivos**
   ```bash
   BACKUP_DIR="/root/hemispheria_backup_[TIMESTAMP]"
   rm -rf /etc/easypanel/projects/n8n/hemiph/code/*
   cp -r $BACKUP_DIR/* /etc/easypanel/projects/n8n/hemiph/code/
   ```

4. **Rebuild y redeploy**
   ```bash
   cd /etc/easypanel/projects/n8n/hemiph/code
   docker build -t easypanel/n8n/hemiph:latest .
   docker service scale n8n_hemiph=1
   docker service update --force n8n_hemiph
   ```

5. **Verificar**
   ```bash
   docker service ps n8n_hemiph
   docker service logs n8n_hemiph --tail 50
   curl -I https://n8n-hemiph.v2j42m.easypanel.host
   ```

### Contacto de Emergencia
- **VPS:** 82.29.173.205
- **SSH Key:** srv750816.key (ubicación: C:\Users\TRENDING PC\)
- **Easypanel:** https://v2j42m.easypanel.host
- **GitHub:** https://github.com/webhook-ja/HemispherIA_web

---

**Última actualización de este documento:** 2025-11-27
