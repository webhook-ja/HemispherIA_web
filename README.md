# Hemispher-IA Website

Una plataforma profesional para Hemispher-IA que conecta conocimiento, talento y tecnología para un futuro sostenible en América Latina y el Caribe.

🌐 **Sitio web:** [https://hemispher-ia.org](https://hemispher-ia.org)

## Características

### Frontend
- React 18 + TypeScript + Vite
- Diseño responsive y moderno con Tailwind CSS
- shadcn/ui components + Framer Motion animations
- Componentes reutilizables y accesibles
- SEO optimizado (meta tags, sitemap.xml, robots.txt)
- Sistema de calculadora de impacto con 3 dimensiones

### Backend
- Express.js con PostgreSQL
- API RESTful para contenido, contactos, donaciones
- Sistema de autenticación con sesiones
- Panel de administración con GrapeJS page builder
- Email service con Nodemailer
- Análisis y tracking de visitas

### Deployment
- Docker multi-stage build
- Desplegado en VPS con Docker Swarm
- Gestionado por EasyPanel
- SSL/TLS con Let's Encrypt
- Dominio: **hemispher-ia.org**

## Arquitectura de Despliegue

### Infraestructura
- **VPS:** 82.29.173.205
- **Dominio:** hemispher-ia.org
- **Plataforma:** EasyPanel (Docker Swarm)
- **Servicio:** n8n_hemiph
- **Base de datos:** PostgreSQL (hemispheria)

### Variables de Entorno

El proyecto usa variables de entorno para configuración:

**Frontend (.env.production):**
```bash
VITE_API_URL=https://hemispher-ia.org
VITE_APP_NAME=Hemispher-IA
VITE_ENABLE_CONTACT_FORM=true
```

**Backend (en servidor VPS):**
```bash
DB_HOST=postgres_postgres
DB_PORT=5432
DB_NAME=hemispheria
DB_USER=postgres
DB_PASSWORD=M4x1m012
PORT=80
NODE_ENV=production
JWT_SECRET=hemispheria-secret-key-2024
```

### Proceso de Despliegue

1. **Preparar cambios localmente:**
   ```bash
   # Hacer cambios en el código
   npm run build  # Verificar que build funcione
   git add .
   git commit -m "feat: Descripción del cambio"
   git push origin main
   ```

2. **Conectar al VPS:**
   ```bash
   ssh -i "C:/Users/TRENDING PC/srv750816.key" root@82.29.173.205
   ```

3. **Actualizar código en el servidor:**
   ```bash
   cd /etc/easypanel/projects/n8n/hemiph/code
   git pull origin main
   # O copiar archivos con SCP si no hay git:
   # scp -i "srv750816.key" file.tsx root@82.29.173.205:/path/
   ```

4. **Rebuild y redeploy:**
   ```bash
   docker build -t easypanel/n8n/hemiph:latest .
   docker service update --force --image easypanel/n8n/hemiph:latest n8n_hemiph
   ```

5. **Verificar deployment:**
   ```bash
   curl -s -o /dev/null -w "%{http_code}" https://hemispher-ia.org
   # Debe retornar: 200
   ```

### Configuración del Dominio

Ver guías detalladas:
- `HOSTINGER_DNS_CAMBIO.md` - Configuración DNS en Hostinger
- `CONFIGURACION_DNS_PASO_A_PASO.md` - Guía paso a paso
- `GUIA_CONFIGURACION_DOMINIO.md` - Guía completa con opciones

**DNS Records requeridos:**
```
A    | @   | 82.29.173.205
A    | www | 82.29.173.205
```

**SSL/TLS:** Automático via Let's Encrypt en EasyPanel

## Desarrollo local

### Prerrequisitos

- Node.js >= 16
- npm o yarn

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para producción

```bash
npm run build
```

## Estructura del proyecto

```
src/
├── components/          # Componentes reutilizables
├── hooks/               # Hooks personalizados
├── lib/                 # Utilidades y librerías
├── pages/               # Páginas principales
├── App.tsx              # Componente principal
├── main.tsx             # Punto de entrada
└── globals.css          # Estilos globales
```

## Futuras mejoras planificadas

### Panel de administración
- Sistema de autenticación
- Dashboard con estadísticas
- Gestor de contenido (CMS)
- Sistema de comentarios y moderación

### Funcionalidades avanzadas
- Integración con bases de datos
- Sistema de análisis y métricas
- Formularios de contacto con almacenamiento
- Gestión de multimedia (imágenes, videos)
- Blog con sistema de publicación

### API y servicios
- Endpoints para estadísticas en tiempo real
- Integración con servicios de correo
- Conexión con redes sociales
- API para consumo de datos

## Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Realiza tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Desarrollo futuro

Este proyecto está diseñado para ser extensible. Las áreas clave para futuras mejoras incluyen:

1. **Panel de control administrativo**
   - Autenticación de usuarios
   - Dashboard con métricas
   - Gestor de contenido
   - Sistema de comentarios

2. **Integración de contenido multimedia**
   - Gestor de imágenes y videos
   - Optimización automática de assets
   - CDN para entrega rápida

3. **Sistema de análisis**
   - Seguimiento de usuarios
   - Métricas de engagement
   - Reportes personalizados

4. **Funcionalidades sociales**
   - Sistema de comentarios
   - Compartir en redes sociales
   - Notificaciones

Para implementar estas características, se pueden integrar servicios como:
- Supabase (backend como servicio)
- Cloudinary (gestión de multimedia)
- Plausible o Google Analytics (análisis)
- EmailJS o similar (formularios de contacto)

## Licencia

Este proyecto es privado y propiedad de Hemispher-IA.

## Contacto

- **Email:** info@hemispher-ia.org
- **Sitio web:** https://hemispher-ia.org
- **LinkedIn:** https://linkedin.com/company/hemispher-ia
- **Twitter:** https://twitter.com/hemispher_ia

## Documentación Adicional

- `CLAUDE.md` - Guía para desarrollo con Claude Code
- `AI_RULES.md` - Reglas de desarrollo y arquitectura
- `DEPLOYMENT_HISTORY.md` - Historial de despliegues
- `HOSTINGER_DNS_CAMBIO.md` - Configuración DNS paso a paso