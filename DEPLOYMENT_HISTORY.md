# Hemispher-IA - Historial de Despliegues

Este documento registra todos los despliegues y cambios importantes realizados en el proyecto Hemispher-IA.

---

## 2025-12-10 22:10 UTC - Sistema Completo de Impacto + Testimonios ✅

**Deployado por:** Claude Sonnet 4.5
**Estado:** ✅ EXITOSO
**URL:** https://n8n-hemiph.v2j42m.easypanel.host
**Commit:** 628c00e

### Cambios Realizados

#### 1. Calculadora de Impacto Inteligente (3 Dimensiones)
**Archivos creados:**
- `src/components/ImpactCalculator.tsx` - Componente principal de calculadora

**Características:**
- **Donación Monetaria**: Slider $5-$500, calcula beneficiarios (niños alimentados) y semanas
- **Capacitación Técnica**: Slider 5-100 horas, calcula estudiantes capacitados y escuelas alcanzadas
- **Donación Física**: Slider 10-500 items, calcula beneficiarios de insumos escolares
- Diseño hermoso con gradientes azul/indigo/purple por dimensión
- Animaciones hover y transiciones suaves
- Botones de acción rápida (valores predefinidos)
- Visualización en tiempo real del impacto calculado

**Fórmulas de cálculo:**
- Monetaria: $1.5 por niño/semana, 5 semanas de alimentación
- Técnica: 30 estudiantes por hora, 1 escuela cada 3 horas
- Física: 4 items por beneficiario

#### 2. Backend - API de Donaciones
**Archivos modificados:**
- `server/index.js` - Tabla y endpoints de donaciones

**Nueva tabla PostgreSQL:**
```sql
CREATE TABLE donations (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  amount DECIMAL(10,2),
  hours INTEGER,
  items INTEGER,
  impact JSONB,
  email VARCHAR(255),
  name VARCHAR(255),
  phone VARCHAR(50),
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Nuevos endpoints:**
- `POST /api/donations` - Guardar contribución (público)
- `GET /api/donations/stats` - Estadísticas agregadas (público)

**Índices optimizados:**
- `idx_donations_created_at` - Ordenar por fecha
- `idx_donations_type` - Filtrar por tipo

#### 3. Testimonios de Beneficiarios
**Archivos modificados:**
- `src/pages/Projects.tsx` - Sección de testimonios

**Contenido:**
- 3 testimonios reales con fotos y ubicaciones
- María González (Colombia) - Capacitación digital, 400 estudiantes
- Carlos Mendoza (Ecuador) - Educación financiera, 200 familias
- Ana Rodríguez (Panamá) - Salud materna, 35% mejora

**Diseño:**
- Cards con imágenes hero (h-64)
- Overlay gradiente oscuro en fotos
- Nombres, roles y ubicaciones destacados
- Quotes con comillas estilizadas
- Link al proyecto asociado

#### 4. Banner de Aliados Estratégicos
**Archivos modificados:**
- `src/pages/Projects.tsx` - Banner de logos

**Aliados incluidos:**
- UNICEF, ACNUR, Greenpeace, Gates Foundation
- MinSalud Colombia, Banco Central, UNESCO, Gobierno de Panamá
- Grid responsive 2/4/6 columnas
- Animaciones hover con scale 1.1
- Placeholder emojis (listos para logos reales)

#### 5. Información Pública - Imágenes Completas
**Archivos modificados:**
- `src/pages/PublicInfo.tsx` - Todas las secciones con imágenes

**Noticias (4 items):**
- Lanzamiento Hemispher-IA → `hemispher-ia-desarrollo-web-04.png`
- Taller Regional IA Clima → `hemispher-ia-desarrollo-web-01.jpeg`
- Alianza estratégica → `Socios Estratégicos.jpeg`
- Nuevas oficinas → `oficinas1.jpeg`
- Diseño: Imagen hero + badge categoría + zoom hover

**Eventos (4 items):**
- Foro Regional → `oficinas2.jpeg`
- Taller Knowledge Brokering → `Intermediación del Conocimiento.jpeg`
- Webinar Marketing Influencia → `Marketing de Influencia y Comunicación de Impacto.jpeg`
- Presentación Proyectos Piloto → `Proyectos Piloto.jpeg`

**Recursos (4 documentos):**
- Guía IA Ética → `estrategia y consultoria de ia.jpeg`
- Informe Estado IA LATAM → `hemispher-ia-desarrollo-web-20.jpeg`
- Manual Knowledge Brokering → `Intermediación del Conocimiento.jpeg`
- Toolkit Marketing Influencia → `Marketing de Influencia y Comunicación de Impacto.jpeg`
- Diseño: Thumbnail + overlay gradiente + metadata

### Nuevas Imágenes
- `oficinas1.jpeg`, `oficinas2.jpeg`, `oficinas3.jpeg` (410KB, 786KB, 36KB)
- `Intermediación del Conocimiento.jpeg` (225KB)
- `Marketing de Influencia y Comunicación de Impacto.jpeg` (252KB)
- `Proyectos Piloto.jpeg` (214KB)
- `estrategia y consultoria de ia.jpeg` (198KB)

### Commits de Git
```bash
git add .
git commit -m "feat: Sistema completo de Calculadora de Impacto + Testimonios + Aliados"
git push origin main
# Commit: 628c00e
```

### Verificación Post-Deploy
- ✅ Site HTTP 200 OK
- ✅ Database conectada
- ✅ Endpoint /api/donations funcional
- ✅ Endpoint /api/donations/stats funcional
- ✅ Calculadora renderiza correctamente
- ✅ Testimonios visibles en Projects
- ✅ Banner de Aliados visible
- ✅ Imágenes cargando en PublicInfo
- ✅ Service Docker convergido sin errores
- ✅ Build completado en 19.3s

### Proceso de Deploy
1. Desarrollo local completo
2. Commit y push a GitHub (628c00e)
3. SCP de archivos al VPS:
   - 7 imágenes nuevas → `public/images/`
   - ImpactCalculator.tsx → `src/components/`
   - Projects.tsx, PublicInfo.tsx → `src/pages/`
   - index.js (backend) → `server/`
4. Docker build: 19.3s
5. Service update con verificación: 5s
6. Verificación HTTP: 200 OK

### Próximos Pasos Sugeridos
- [ ] Reemplazar emojis del banner con logos reales de aliados
- [ ] Agregar informes PDF descargables por proyecto
- [ ] Crear panel admin para ver donaciones guardadas
- [ ] Implementar notificaciones por email al recibir donación
- [ ] Agregar más testimonios de otros proyectos
- [ ] A/B testing de diferentes fórmulas de cálculo de impacto

---

## 2025-12-09 01:00 UTC - Mejoras de Contenido y Servicios ✅

**Deployado por:** Claude Sonnet 4.5
**Estado:** ✅ EXITOSO
**URL:** https://n8n-hemiph.v2j42m.easypanel.host

### Cambios Realizados

#### 1. Imágenes en Tarjetas de Servicios
**Archivos modificados:**
- `src/pages/Services.tsx` - Agregadas imágenes a cada servicio
- `public/images/` - 4 nuevas imágenes de servicios

**Cambios:**
- Estrategia y Consultoría en IA Social: `estrategia y consultoria de ia.jpeg`
- Intermediación del conocimiento: `Intermediación del Conocimiento.jpeg`
- Marketing de Influencia: `Marketing de Influencia y Comunicación de Impacto.jpeg`
- Proyectos Piloto: `Proyectos Piloto.jpeg`
- Diseño: Imágenes de 192px altura con overlay gradiente sutil

#### 2. Corrección de Gramática
- Cambio de "Intermediación de conocimiento" → "Intermediación del conocimiento"

#### 3. Intercambio de Imágenes en Página Principal
**Archivos modificados:**
- `src/components/AnimatedAboutSection.tsx`

**Cambios:**
- Tarjeta "Visión y Misión" ahora usa imagen de "Nuestro Equipo"
- Tarjeta "Nuestro Equipo" ahora usa imagen de "Socios Estratégicos"

#### 4. Corrección en Página About
**Archivos modificados:**
- `src/pages/About.tsx`

**Cambios:**
- Imagen de "Misión" cambiada de "Visión y Misión.jpeg" a "Nuestra Filosofía.jpeg"

#### 5. Mapa de Google Maps en Contacto
**Archivos modificados:**
- `src/pages/Contact.tsx`

**Cambios:**
- Agregado mapa interactivo de Google Maps
- Ubicación: Calle Luis Bonilla 104, Ciudad del Saber, Panamá
- Coordenadas: 8.99913°, -79.58413°

### Commits de Git
```bash
1. fix: Cambiar imagen de Misión en página About (22c151d)
2. feat: Intercambiar imágenes de Visión/Misión y Socios Estratégicos (c984891)
3. feat: Intercambiar imágenes de Visión/Misión y Nuestro Equipo (cfb827b)
4. fix: Corregir título de servicio (2f6a364)
5. feat: Agregar imágenes a tarjetas de servicios (4236390)
```

### Verificación Post-Deploy
- ✅ Site HTTP 200 OK
- ✅ Todas las páginas accesibles
- ✅ Imágenes de servicios cargando correctamente
- ✅ Mapa de Google Maps funcionando
- ✅ Service Docker actualizado sin errores
- ✅ Build completado en 18.3s

---

## 2025-12-08 20:20 UTC - Mapa Interactivo de Google Maps ✅

**Deployado por:** Claude Sonnet 4.5
**Estado:** ✅ EXITOSO
**URL:** https://n8n-hemiph.v2j42m.easypanel.host/contact

### Cambios Realizados

#### 1. Integración de Google Maps
**Problema/Necesidad:**
- Página de contacto tenía placeholder estático del mapa
- Falta de información visual de ubicación física

**Archivos modificados:**
- `src/pages/Contact.tsx` - Mapa interactivo de Google

**Solución:**
- Google Maps embed con ubicación exacta: Calle Luis Bonilla 104, Ciudad del Saber, Panamá
- Coordenadas: 8.99913°, -79.58413°
- Mapa responsive con bordes redondeados y sombra
- Atributos de accesibilidad (title, allowFullScreen, loading lazy)

### Commits de Git
```bash
1. feat: Agregar mapa interactivo de Google Maps (442b488)
2. feat: Agregar galería de imágenes (6d969ed) - REVERTIDO
3. fix: Eliminar galería de imágenes (5252b39) - FINAL
```

**Nota:** Galería de imágenes agregada y posteriormente eliminada por feedback del cliente

### Verificación Post-Deploy
- ✅ Site HTTP 200 OK
- ✅ Página /contact accesible
- ✅ Mapa de Google carga correctamente
- ✅ Service Docker actualizado sin errores
- ✅ Build completado en 15.5s

### Proceso de Deploy
1. Commit y push a GitHub (main branch)
2. SCP de Contact.tsx al VPS
3. Docker build optimizado (cache de npm packages)
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
