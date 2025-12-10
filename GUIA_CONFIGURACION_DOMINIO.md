# Guía de Configuración de Dominio Personalizado - HemispherIA

Esta guía explica cómo conectar un dominio personalizado (ej. `hemispher-ia.org`) a tu aplicación en EasyPanel.

---

## 📋 **Requisitos Previos**

### 1. **Dominio Registrado**
Necesitas tener un dominio comprado en algún registrador:
- **Opciones recomendadas**: Namecheap, GoDaddy, Google Domains, Cloudflare Registrar, Hostinger
- **Costo aproximado**: $10-15 USD/año (.com/.org)
- **Dominio sugerido**: `hemispher-ia.org` o `hemispheria.org`

### 2. **Acceso al VPS**
- ✅ Ya tienes: VPS en `82.29.173.205`
- ✅ Ya tienes: Acceso SSH con `srv750816.key`
- ✅ Ya tienes: EasyPanel instalado

### 3. **Información Actual del Proyecto**
```
VPS IP: 82.29.173.205
Servicio: n8n_hemiph
URL actual: https://n8n-hemiph.v2j42m.easypanel.host
Puerto: 80 (HTTP interno, EasyPanel maneja HTTPS)
```

---

## 🚀 **Paso 1: Configurar DNS Records**

### **Opción A: DNS Apuntando Directamente al VPS**

En el panel de tu registrador de dominios (ej. Namecheap), configura estos registros DNS:

```dns
# Record Type | Host/Name | Value/Points To      | TTL
A             | @         | 82.29.173.205        | Auto/300
A             | www       | 82.29.173.205        | Auto/300
CNAME         | *         | hemispher-ia.org     | Auto/300
```

**Explicación:**
- `@` → Dominio raíz (hemispher-ia.org)
- `www` → Subdominio www (www.hemispher-ia.org)
- `*` → Wildcard para cualquier subdominio

**Tiempo de propagación**: 1-48 horas (usualmente 15 minutos a 2 horas)

---

### **Opción B: DNS con Cloudflare (RECOMENDADO)**

Cloudflare ofrece DNS gratuito, SSL automático, CDN y protección DDoS.

#### **Configuración en Cloudflare:**

1. **Crear cuenta en Cloudflare** (gratuita)
2. **Agregar tu dominio** → Cloudflare detectará tus DNS actuales
3. **Configurar estos registros DNS:**

```dns
# Type  | Name | Content          | Proxy Status | TTL
A       | @    | 82.29.173.205   | Proxied ✅   | Auto
A       | www  | 82.29.173.205   | Proxied ✅   | Auto
CNAME   | *    | hemispher-ia.org | Proxied ✅   | Auto
```

4. **Copiar los nameservers de Cloudflare** (ej. `ns1.cloudflare.com`)
5. **Ir a tu registrador** (Namecheap, GoDaddy, etc.)
6. **Cambiar nameservers** a los de Cloudflare
7. **Esperar propagación** (15 min - 2 horas)

**Ventajas de Cloudflare:**
- ✅ SSL/TLS automático y gratuito
- ✅ CDN global (carga más rápida)
- ✅ Protección DDoS
- ✅ Analytics gratis
- ✅ Cache automático de assets

---

## 🔧 **Paso 2: Configurar EasyPanel**

### **A. Acceder al Panel de EasyPanel**

```bash
# URL del panel de EasyPanel
https://v2j42m.easypanel.host

# Usuario: (el que configuraste)
# Proyecto: n8n
# Servicio: hemiph
```

### **B. Agregar Dominio Personalizado**

1. **Login a EasyPanel** → https://v2j42m.easypanel.host
2. **Navega a**: Projects → `n8n` → Service `hemiph`
3. **Ve a la sección "Domains"**
4. **Agregar nuevo dominio:**
   - Dominio principal: `hemispher-ia.org`
   - Dominio www: `www.hemispher-ia.org`
5. **Habilitar HTTPS/SSL:**
   - ✅ Enable SSL (Let's Encrypt automático)
   - ✅ Force HTTPS redirect
6. **Guardar cambios**

### **C. Actualizar Configuración del Servicio**

EasyPanel automáticamente:
- ✅ Genera certificado SSL con Let's Encrypt
- ✅ Configura reverse proxy (Traefik)
- ✅ Redirige HTTP → HTTPS
- ✅ Maneja renovación automática de SSL

---

## 📝 **Paso 3: Actualizar Configuración de la Aplicación**

### **A. Variables de Entorno (Opcional)**

Si tu app necesita conocer el dominio, actualiza las variables de entorno en EasyPanel:

```bash
# En EasyPanel → Service → Environment Variables
DOMAIN=hemispher-ia.org
BASE_URL=https://hemispher-ia.org
```

### **B. Verificar Rutas en el Código**

Tu aplicación React ya usa rutas relativas, así que **NO necesitas cambiar nada** en el código:

```typescript
// ✅ Ya está correcto - rutas relativas
<Link to="/about">...</Link>
<Link to="/projects">...</Link>

// ✅ Ya está correcto - API relativa
fetch("/api/donations", ...)
```

### **C. Actualizar CORS (si aplica)**

Si tienes APIs externas, actualiza el CORS en `server/index.js`:

```javascript
// server/index.js - Ya está configurado correctamente
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS || '*', // En producción, especifica tu dominio
  credentials: true
}));
```

Para mayor seguridad en producción, puedes agregar en EasyPanel:

```bash
# Environment Variable
ALLOWED_ORIGINS=https://hemispher-ia.org,https://www.hemispher-ia.org
```

---

## 🧪 **Paso 4: Verificación y Testing**

### **A. Verificar Propagación DNS**

```bash
# Verificar DNS desde tu computadora
nslookup hemispher-ia.org

# Verificar DNS online
# Visita: https://dnschecker.org
# Ingresa: hemispher-ia.org
# Debe mostrar: 82.29.173.205
```

### **B. Verificar SSL/HTTPS**

```bash
# Verificar certificado SSL
curl -I https://hemispher-ia.org

# Debe mostrar:
# HTTP/2 200
# strict-transport-security: max-age=...
```

### **C. Verificar Todas las Rutas**

```bash
# Homepage
https://hemispher-ia.org/

# Páginas principales
https://hemispher-ia.org/about
https://hemispher-ia.org/services
https://hemispher-ia.org/projects
https://hemispher-ia.org/contact
https://hemispher-ia.org/public-info

# API
https://hemispher-ia.org/api/health
https://hemispher-ia.org/api/donations/stats

# Admin
https://hemispher-ia.org/admin
https://hemispher-ia.org/login
```

### **D. Verificar Redirecciones**

```bash
# HTTP debe redirigir a HTTPS
http://hemispher-ia.org → https://hemispher-ia.org ✅

# www debe redirigir a no-www (o viceversa, según configuración)
https://www.hemispher-ia.org → https://hemispher-ia.org ✅
```

---

## 🔒 **Paso 5: Configuración de Seguridad (Opcional pero Recomendado)**

### **A. Headers de Seguridad**

Agregar en `server/index.js`:

```javascript
// Agregar después de app.use(cors(...))
app.use((req, res, next) => {
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});
```

### **B. Rate Limiting (Prevenir Abuso)**

```bash
# Instalar express-rate-limit
npm install express-rate-limit
```

```javascript
// server/index.js
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por IP
  message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo en 15 minutos.'
});

app.use('/api/', limiter);
```

---

## 📧 **Paso 6: Configurar Email con tu Dominio (Opcional)**

### **Opción A: Google Workspace (Pago)**
- Costo: $6/mes por usuario
- Email: `contacto@hemispher-ia.org`

### **Opción B: Email Forwarding Gratuito**

Con Cloudflare Email Routing (gratis):

1. **Cloudflare Dashboard** → Email → Email Routing
2. **Enable Email Routing**
3. **Configurar forwarding:**
   ```
   contacto@hemispher-ia.org → tu-email-personal@gmail.com
   info@hemispher-ia.org → tu-email-personal@gmail.com
   ```
4. **Verificar DNS MX records** (Cloudflare los agrega automáticamente)

### **Opción C: Hostinger Email (Barato)**
- Costo: ~$1/mes
- Cuentas ilimitadas

---

## 🎨 **Paso 7: Actualizar Branding**

### **A. Actualizar Meta Tags en `index.html`**

```html
<!-- index.html -->
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO Meta Tags -->
  <title>Hemispher-IA | Conectamos Conocimiento, Talento y Tecnología</title>
  <meta name="description" content="Plataforma profesional que conecta conocimiento, talento y tecnología para el desarrollo sostenible en América Latina y el Caribe." />
  <meta name="keywords" content="IA, desarrollo sostenible, América Latina, tecnología, conocimiento" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://hemispher-ia.org/" />
  <meta property="og:title" content="Hemispher-IA | Conectamos Conocimiento, Talento y Tecnología" />
  <meta property="og:description" content="Plataforma profesional para el desarrollo sostenible en América Latina" />
  <meta property="og:image" content="https://hemispher-ia.org/logo.jpeg" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://hemispher-ia.org/" />
  <meta property="twitter:title" content="Hemispher-IA" />
  <meta property="twitter:description" content="Plataforma profesional para el desarrollo sostenible" />
  <meta property="twitter:image" content="https://hemispher-ia.org/logo.jpeg" />

  <!-- Canonical URL -->
  <link rel="canonical" href="https://hemispher-ia.org/" />
</head>
```

### **B. Sitemap.xml (SEO)**

Crear `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://hemispher-ia.org/</loc>
    <lastmod>2025-12-10</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://hemispher-ia.org/about</loc>
    <lastmod>2025-12-10</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://hemispher-ia.org/services</loc>
    <lastmod>2025-12-10</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://hemispher-ia.org/projects</loc>
    <lastmod>2025-12-10</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://hemispher-ia.org/contact</loc>
    <lastmod>2025-12-10</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://hemispher-ia.org/public-info</loc>
    <lastmod>2025-12-10</lastmod>
    <priority>0.6</priority>
  </url>
</urlset>
```

### **C. robots.txt (SEO)**

Crear `public/robots.txt`:

```txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /login

Sitemap: https://hemispher-ia.org/sitemap.xml
```

---

## 📊 **Paso 8: Monitoreo y Analytics**

### **A. Google Analytics 4**

1. Crear cuenta en https://analytics.google.com
2. Agregar propiedad para `hemispher-ia.org`
3. Copiar el Measurement ID (ej. `G-XXXXXXXXXX`)
4. Agregar en `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### **B. Google Search Console**

1. Ir a https://search.google.com/search-console
2. Agregar propiedad `hemispher-ia.org`
3. Verificar dominio (método DNS)
4. Enviar sitemap: `https://hemispher-ia.org/sitemap.xml`

---

## 🐛 **Troubleshooting - Problemas Comunes**

### **1. DNS no propaga**
```bash
# Limpiar cache DNS local
ipconfig /flushdns  # Windows
sudo dscacheutil -flushcache  # Mac
```

### **2. SSL no funciona**
- Verificar que EasyPanel tenga habilitado Let's Encrypt
- Verificar que el puerto 443 esté abierto en el firewall
- Esperar 1-2 minutos para generación de certificado

### **3. Dominio muestra "404 Not Found"**
- Verificar que el servicio esté corriendo: `docker service ps n8n_hemiph`
- Verificar logs: `docker service logs n8n_hemiph --tail 50`
- Verificar configuración de dominio en EasyPanel

### **4. Redirecciones infinitas**
- Verificar que no haya múltiples redirecciones HTTP→HTTPS
- Verificar configuración de Cloudflare (SSL/TLS mode = Full)

---

## ✅ **Checklist Final**

### **Antes de Lanzar:**
- [ ] Dominio comprado y registrado
- [ ] DNS configurado y propagado
- [ ] EasyPanel configurado con el dominio
- [ ] SSL/HTTPS funcionando
- [ ] Todas las rutas funcionan con el nuevo dominio
- [ ] Email configurado (si aplica)
- [ ] Meta tags actualizados
- [ ] Sitemap.xml creado
- [ ] robots.txt configurado
- [ ] Google Analytics instalado
- [ ] Google Search Console configurado
- [ ] Backups configurados

### **Post-Lanzamiento:**
- [ ] Monitorear errores en logs
- [ ] Verificar métricas de Google Analytics
- [ ] Configurar alertas de uptime (ej. UptimeRobot)
- [ ] Actualizar redes sociales con nuevo dominio
- [ ] Actualizar firma de email con nuevo dominio

---

## 💰 **Costos Estimados**

| Servicio | Costo | Frecuencia | Nota |
|----------|-------|------------|------|
| **Dominio .org** | $12-15 | Anual | Requerido |
| **VPS** | YA TIENES | - | ✅ Incluido |
| **EasyPanel** | Gratis | - | ✅ Incluido |
| **SSL (Let's Encrypt)** | Gratis | - | ✅ Automático |
| **Cloudflare** | Gratis | - | ✅ Recomendado |
| **Email (opcional)** | $1-6/mes | Mensual | Opcional |
| **Total Mínimo** | ~$15 | Año 1 | Solo dominio |

---

## 🎯 **Resumen - Lo que Necesitas Hacer**

### **Mínimo (Solo Dominio):**
1. ✅ Comprar dominio (ej. `hemispher-ia.org`) - $15/año
2. ✅ Configurar DNS A record → `82.29.173.205`
3. ✅ Agregar dominio en EasyPanel
4. ✅ Habilitar SSL en EasyPanel
5. ✅ Esperar propagación DNS (15min - 2hrs)
6. ✅ Verificar que todo funcione

### **Recomendado (con Cloudflare):**
1. ✅ Todo lo anterior +
2. ✅ Cuenta Cloudflare (gratis)
3. ✅ Configurar DNS en Cloudflare
4. ✅ Cambiar nameservers en registrador
5. ✅ Habilitar proxy de Cloudflare
6. ✅ Configurar email forwarding (opcional)

**Tiempo total estimado**: 2-4 horas (incluyendo propagación DNS)

---

## 📞 **Soporte**

Si necesitas ayuda con algún paso específico, avísame y te guío paso a paso.

**Última actualización**: 2025-12-10
