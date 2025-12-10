# Configuración DNS Paso a Paso - hemispher-ia.org

**Dominio:** hemispher-ia.org
**Estado:** ✅ Activo (expira 2026-11-12)
**Registrador:** (Panel donde estás viendo esto)
**VPS IP:** 82.29.173.205

---

## 🎯 **OPCIÓN 1: Configuración Rápida (DNS Directo)**

### **Paso 1: Cambiar Nameservers**

En tu panel del registrador, donde estás viendo la información del dominio:

**ACTUALMENTE tienes:**
```
ns1.dns-parking.com
ns2.dns-parking.com
```

**CAMBIAR A nameservers del registrador:**

Busca una opción que diga algo como:
- "Use registrar nameservers"
- "Use default nameservers"
- "Custom DNS" o "Advanced DNS"

Los nameservers varían según el registrador. Algunos comunes:

**Si es Namecheap:**
```
dns1.registrar-servers.com
dns2.registrar-servers.com
```

**Si es GoDaddy:**
```
ns01.domaincontrol.com
ns02.domaincontrol.com
```

**Si es Hostinger:**
```
ns1.dns-parking.com → ns1.hostinger.com
ns2.dns-parking.com → ns2.hostinger.com
```

### **Paso 2: Configurar DNS Records**

Una vez cambies los nameservers, ve a la sección de **DNS Management** o **Advanced DNS** en tu panel.

**Agregar estos 3 records:**

```dns
Tipo    | Host/Name | Value/Apunta a  | TTL
----------------------------------------------------
A       | @         | 82.29.173.205   | Automatic (o 300)
A       | www       | 82.29.173.205   | Automatic (o 300)
CNAME   | *         | hemispher-ia.org | Automatic (o 300)
```

**Explicación:**
- `@` = dominio raíz (hemispher-ia.org)
- `www` = subdominio www (www.hemispher-ia.org)
- `*` = wildcard para cualquier subdominio

**Elimina cualquier otro record A o CNAME que exista para @ y www**

### **Paso 3: Esperar Propagación**

⏰ **Tiempo:** 15 minutos a 2 horas (usualmente 30 minutos)

Verificar con:
```bash
nslookup hemispher-ia.org
```

O en: https://dnschecker.org

Debe mostrar: **82.29.173.205**

---

## 🚀 **OPCIÓN 2: Configuración con Cloudflare (RECOMENDADO)**

### **¿Por qué Cloudflare?**
- ✅ SSL/TLS automático
- ✅ CDN global (sitio más rápido)
- ✅ Protección DDoS
- ✅ Analytics gratis
- ✅ Email forwarding gratis
- ✅ Todo 100% GRATIS

### **Paso 1: Crear Cuenta en Cloudflare**

1. Ir a https://dash.cloudflare.com/sign-up
2. Crear cuenta (gratis)
3. Click en "Add a Site"
4. Ingresar: `hemispher-ia.org`
5. Seleccionar plan: **Free** (gratis)

### **Paso 2: Cloudflare Escaneará tu DNS**

Cloudflare detectará automáticamente tus records actuales. Continúa.

### **Paso 3: Configurar DNS Records en Cloudflare**

En el panel de Cloudflare → DNS → Records:

**Agregar/Editar estos records:**

```dns
Type   | Name | Content         | Proxy status | TTL
----------------------------------------------------------
A      | @    | 82.29.173.205  | Proxied ✅   | Auto
A      | www  | 82.29.173.205  | Proxied ✅   | Auto
CNAME  | *    | hemispher-ia.org| Proxied ✅   | Auto
```

**IMPORTANTE:** Asegúrate que "Proxy status" esté en **Proxied** (naranja ☁️) para obtener CDN y SSL gratis.

**Elimina cualquier otro record A o CNAME para @ y www**

### **Paso 4: Copiar Nameservers de Cloudflare**

Cloudflare te dará 2 nameservers, algo como:

```
aaaa.ns.cloudflare.com
bbbb.ns.cloudflare.com
```

**¡COPIA ESTOS NAMESERVERS!** Los necesitarás en el siguiente paso.

### **Paso 5: Cambiar Nameservers en tu Registrador**

Vuelve al panel de tu registrador (donde compraste el dominio).

**Busca la sección "Nameservers" o "DNS/Nameservers"**

**CAMBIAR DE:**
```
ns1.dns-parking.com
ns2.dns-parking.com
```

**A LOS NAMESERVERS QUE CLOUDFLARE TE DIO:**
```
aaaa.ns.cloudflare.com
bbbb.ns.cloudflare.com
```

### **Paso 6: Configurar SSL en Cloudflare**

En Cloudflare Dashboard:

1. Ve a **SSL/TLS** (menú lateral)
2. Selecciona modo: **Full** o **Full (strict)**
3. Habilita **Always Use HTTPS**
4. Habilita **Automatic HTTPS Rewrites**

### **Paso 7: Esperar Activación**

⏰ **Tiempo:** 15 minutos a 24 horas (usualmente 1-2 horas)

Cloudflare te enviará un email cuando esté activo.

Verificar en: https://dnschecker.org → debe mostrar IPs de Cloudflare (no directamente 82.29.173.205)

---

## 🔧 **Paso FINAL: Configurar EasyPanel**

Una vez que el DNS esté propagado (Opción 1 o 2), configura EasyPanel:

### **1. Acceder a EasyPanel**

```
URL: https://v2j42m.easypanel.host
```

### **2. Ir a tu Servicio**

```
Projects → n8n → Service: hemiph
```

### **3. Configurar Dominios**

En la sección **"Domains"** o **"Settings"**:

**Click en "Add Domain"** y agregar:

```
Dominio 1: hemispher-ia.org
Dominio 2: www.hemispher-ia.org
```

### **4. Habilitar SSL**

✅ **Enable SSL/TLS** (Let's Encrypt)
✅ **Force HTTPS Redirect**
✅ **Auto-renew SSL**

Click en **"Save"** o **"Apply"**

### **5. Esperar Certificado SSL**

⏰ **Tiempo:** 1-5 minutos

EasyPanel generará automáticamente un certificado SSL de Let's Encrypt.

---

## ✅ **Verificación Final**

### **1. Verificar DNS**

```bash
nslookup hemispher-ia.org
nslookup www.hemispher-ia.org
```

Debe mostrar:
- **Opción 1 (DNS directo):** 82.29.173.205
- **Opción 2 (Cloudflare):** IPs de Cloudflare (104.x.x.x)

### **2. Verificar Sitio Web**

Abrir en navegador:
```
https://hemispher-ia.org
```

**Debe mostrar:** Tu sitio de HemispherIA ✅

### **3. Verificar Todas las Rutas**

```
✅ https://hemispher-ia.org/
✅ https://hemispher-ia.org/about
✅ https://hemispher-ia.org/services
✅ https://hemispher-ia.org/projects
✅ https://hemispher-ia.org/contact
✅ https://hemispher-ia.org/public-info
✅ https://hemispher-ia.org/api/health
```

### **4. Verificar SSL/HTTPS**

```bash
curl -I https://hemispher-ia.org
```

Debe mostrar:
```
HTTP/2 200
strict-transport-security: max-age=...
```

### **5. Verificar Redirecciones**

```
http://hemispher-ia.org → https://hemispher-ia.org ✅
www.hemispher-ia.org → hemispher-ia.org ✅ (o viceversa)
```

---

## 🐛 **Troubleshooting**

### **Problema 1: DNS no propaga**

**Síntomas:** `nslookup hemispher-ia.org` no muestra la IP correcta

**Soluciones:**
1. Esperar más tiempo (hasta 48 horas en casos extremos)
2. Verificar que configuraste los records correctamente
3. Limpiar cache DNS local:
   ```bash
   ipconfig /flushdns  # Windows
   ```
4. Verificar en múltiples herramientas:
   - https://dnschecker.org
   - https://whatsmydns.net

### **Problema 2: "Site can't be reached" / "Unable to connect"**

**Síntomas:** El navegador no puede conectar al sitio

**Soluciones:**
1. Verificar que el VPS esté corriendo:
   ```bash
   ssh -i "C:/Users/TRENDING PC/srv750816.key" root@82.29.173.205 "docker service ps n8n_hemiph"
   ```
2. Verificar que el puerto 80 y 443 estén abiertos en el firewall
3. Verificar logs del servicio:
   ```bash
   docker service logs n8n_hemiph --tail 50
   ```

### **Problema 3: SSL no funciona / "Not Secure"**

**Síntomas:** El navegador muestra advertencia de certificado

**Soluciones:**

**Si usas Opción 1 (DNS directo):**
1. Verificar en EasyPanel que SSL esté habilitado
2. Esperar 5 minutos más (Let's Encrypt tarda un poco)
3. Verificar logs de EasyPanel

**Si usas Opción 2 (Cloudflare):**
1. Verificar que SSL mode en Cloudflare esté en **Full**
2. Verificar que los records estén **Proxied** (naranja)
3. Esperar propagación de SSL (puede tardar 1-2 horas)

### **Problema 4: "Too many redirects" / Redirecciones infinitas**

**Síntomas:** El navegador muestra error de demasiadas redirecciones

**Solución para Cloudflare:**
1. Ir a Cloudflare → SSL/TLS
2. Cambiar modo a **Full** (no Flexible)
3. Esperar 1 minuto y refrescar

---

## 📧 **BONUS: Configurar Email Forwarding (Cloudflare)**

### **1. Ir a Cloudflare Dashboard**

Email → Email Routing

### **2. Habilitar Email Routing**

Click en **"Enable Email Routing"**

### **3. Verificar Dominio**

Cloudflare agregará automáticamente los records MX necesarios.

### **4. Crear Addresses**

**Ejemplos:**
```
contacto@hemispher-ia.org → cafeaustral1@gmail.com
info@hemispher-ia.org → cafeaustral1@gmail.com
jorge@hemispher-ia.org → cafeaustral1@gmail.com
```

### **5. Verificar Email**

Cloudflare enviará un email de verificación a `cafeaustral1@gmail.com`.

Click en el link para confirmar.

### **6. Probar**

Envía un email a `contacto@hemispher-ia.org` y verifica que llegue a tu Gmail.

---

## 📊 **BONUS: Google Analytics + Search Console**

### **Google Analytics 4**

1. Ir a https://analytics.google.com
2. Crear propiedad para `hemispher-ia.org`
3. Copiar Measurement ID (ej. `G-XXXXXXXXXX`)
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

### **Google Search Console**

1. Ir a https://search.google.com/search-console
2. Agregar propiedad `hemispher-ia.org`
3. Verificar dominio:
   - **Opción DNS:** Agregar record TXT que Google te da
   - **Opción Cloudflare:** Más fácil, usar verificación HTML
4. Enviar sitemap: `https://hemispher-ia.org/sitemap.xml`

---

## ✅ **Checklist Final**

### **DNS Configurado:**
- [ ] Nameservers cambiados
- [ ] Record A para @ configurado
- [ ] Record A para www configurado
- [ ] Record CNAME para * configurado (opcional)
- [ ] DNS propagado (verificado con nslookup)

### **EasyPanel Configurado:**
- [ ] Dominio agregado en EasyPanel
- [ ] SSL habilitado
- [ ] HTTPS redirect habilitado
- [ ] Certificado SSL generado

### **Verificaciones:**
- [ ] https://hemispher-ia.org funciona
- [ ] Todas las páginas cargan correctamente
- [ ] API endpoints funcionan
- [ ] SSL muestra candado verde
- [ ] Redirecciones funcionan (http→https, www→no-www)

### **Opcional:**
- [ ] Email forwarding configurado (Cloudflare)
- [ ] Google Analytics instalado
- [ ] Google Search Console configurado
- [ ] Sitemap enviado a Google

---

## 🎯 **Tu Próximo Paso AHORA**

**DECIDE:**

### **Opción A: Configuración Rápida (15 min)**
1. Cambiar nameservers a los de tu registrador
2. Configurar 3 DNS records
3. Configurar EasyPanel
4. ✅ Listo

### **Opción B: Configuración con Cloudflare (30 min)**
1. Crear cuenta Cloudflare
2. Agregar dominio
3. Configurar DNS en Cloudflare
4. Cambiar nameservers a Cloudflare
5. Configurar EasyPanel
6. ✅ Listo + CDN + SSL + Email forwarding gratis

**Recomendación:** **Opción B (Cloudflare)** - vale la pena los 15 minutos extra por todas las ventajas.

---

## 📞 **¿Necesitas Ayuda?**

Si tienes dudas en algún paso específico, avísame y te guío en tiempo real.

**Última actualización:** 2025-12-10
