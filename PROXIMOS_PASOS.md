# ✅ PRÓXIMOS PASOS - Activar hemispher-ia.org

## 🎯 Objetivo
Hacer que tu sitio web esté disponible en **https://hemispher-ia.org** con SSL activo.

## 📊 Estado Actual

### ✅ Completado
- [x] Código listo y desplegado en VPS (82.29.173.205)
- [x] Dominio registrado: hemispher-ia.org (expira 2026-11-12)
- [x] Sitemap.xml y robots.txt creados
- [x] Meta tags SEO configurados
- [x] Variables de entorno para producción
- [x] Documentación completa creada
- [x] Todos los enlaces usan @hemispher-ia.org

### ⏳ Pendiente (REQUIERE TU ACCIÓN)
- [ ] Cambiar DNS records en Hostinger
- [ ] Esperar propagación DNS
- [ ] Configurar dominio en EasyPanel
- [ ] Verificar SSL y sitio funcionando

---

## 🚀 PASO 1: Cambiar DNS en Hostinger (15 minutos)

### Acceder a tu panel
1. Ir a: https://hpanel.hostinger.com/
2. Iniciar sesión
3. Click en **"Dominios"**
4. Seleccionar **"hemispher-ia.org"**

### Modificar DNS Records
5. Click en **"Gestionar zona DNS"** o **"DNS Zone"**

6. **ELIMINAR** estos records antiguos:
   ```
   Type: A | Name: @ | Points to: 147.79.119.42  [Eliminar ❌]
   Type: A | Name: @ | Points to: 147.79.116.159 [Eliminar ❌]
   ```

7. **AGREGAR** estos 2 nuevos records:

   **Record 1:**
   ```
   Type: A
   Name: @
   Points to: 82.29.173.205
   TTL: 3600 (o Automatic)
   ```

   **Record 2:**
   ```
   Type: A
   Name: www
   Points to: 82.29.173.205
   TTL: 3600 (o Automatic)
   ```

8. **ELIMINAR** el CNAME para `www` si existe:
   ```
   Type: CNAME | Name: www | Points to: *.cdn.hstgr.net [Eliminar ❌]
   ```

9. Click en **"Guardar"** o **"Save Changes"**

### ✅ Verificación en Panel
Después de guardar, deberías ver:
```
✓ A Record    | @   | 82.29.173.205 | 3600
✓ A Record    | www | 82.29.173.205 | 3600
```

---

## ⏱️ PASO 2: Esperar Propagación DNS (30 min - 2 horas)

### ¿Qué es la propagación?
Es el tiempo que tardan los servidores DNS del mundo en actualizar tu nueva IP.

### Mientras esperas...
- ☕ Toma un café
- 📧 Revisa emails
- 📚 Lee las guías de documentación

### Verificar propagación (cada 15 minutos)

**Opción 1: Desde tu computadora**
```bash
# Limpiar cache DNS local
ipconfig /flushdns

# Verificar nueva IP
nslookup hemispher-ia.org
```

**Resultado esperado:**
```
Nombre:  hemispher-ia.org
Address: 82.29.173.205  ← Debe aparecer ESTA IP
```

**Opción 2: Verificación en línea**
- Ir a: https://dnschecker.org
- Buscar: `hemispher-ia.org`
- Type: `A`
- Debe mostrar `82.29.173.205` en verde en la mayoría de ubicaciones

### ⏭️ Continuar cuando:
- `nslookup hemispher-ia.org` muestre **82.29.173.205** ✅
- Al menos 80% de servidores en dnschecker.org muestren la IP correcta ✅

---

## 🔧 PASO 3: Configurar EasyPanel (5 minutos)

**⚠️ IMPORTANTE:** Solo hacer este paso DESPUÉS de que DNS propague.

### Acceder a EasyPanel
1. Ir a: https://v2j42m.easypanel.host
2. Iniciar sesión

### Configurar Dominios
3. Navegar a: **Projects** → **n8n** → **Service: hemiph**

4. En la sección **"Domains"**, click en **"Add Domain"**

5. Agregar el primer dominio:
   ```
   hemispher-ia.org
   ```
   Click **"Add"** o **"Save"**

6. Agregar el segundo dominio:
   ```
   www.hemispher-ia.org
   ```
   Click **"Add"** o **"Save"**

### Habilitar SSL
7. En la configuración de cada dominio:
   - ✅ Enable **SSL/TLS** (Let's Encrypt)
   - ✅ Enable **Force HTTPS Redirect**
   - ✅ Enable **Auto-renew SSL**

8. Click en **"Save"** o **"Apply"**

### Esperar Certificado SSL
⏰ **Tiempo:** 2-5 minutos

EasyPanel generará automáticamente certificados SSL de Let's Encrypt.

Verás algo como:
```
✓ SSL Certificate: Active
✓ Issued by: Let's Encrypt
✓ Valid until: [fecha 3 meses adelante]
```

---

## ✅ PASO 4: Verificar Sitio Funcionando (2 minutos)

### 1. Verificar DNS Final
```bash
nslookup hemispher-ia.org
# Debe mostrar: 82.29.173.205 ✅
```

### 2. Abrir Sitio en Navegador
```
https://hemispher-ia.org
```

**Debe mostrar:**
- ✅ Sitio web de Hemispher-IA cargado
- ✅ Candado verde 🔒 en la barra de direcciones
- ✅ No hay advertencias de certificado
- ✅ URL dice "https://" (seguro)

### 3. Probar Todas las Páginas
```
✅ https://hemispher-ia.org/
✅ https://hemispher-ia.org/about
✅ https://hemispher-ia.org/services
✅ https://hemispher-ia.org/projects
✅ https://hemispher-ia.org/contact
✅ https://hemispher-ia.org/public-info
```

### 4. Verificar Redirecciones
```
http://hemispher-ia.org → https://hemispher-ia.org ✅
www.hemispher-ia.org → hemispher-ia.org ✅
```

### 5. Verificar SSL Técnicamente
```bash
curl -I https://hemispher-ia.org
```

**Debe incluir:**
```
HTTP/2 200
strict-transport-security: max-age=...
```

---

## 🎉 ¡LISTO!

Si todos los checks anteriores pasaron, tu sitio está **COMPLETAMENTE FUNCIONAL** en:

🌐 **https://hemispher-ia.org**

### Próximos pasos opcionales:

#### 1. Google Search Console
- Agregar propiedad `hemispher-ia.org`
- Enviar sitemap: `https://hemispher-ia.org/sitemap.xml`

#### 2. Google Analytics
- Crear propiedad GA4
- Agregar Measurement ID al código

#### 3. Email Forwarding (Cloudflare)
- Si usaste Cloudflare: configurar email routing
- Crear: `contacto@hemispher-ia.org` → tu Gmail

#### 4. Redes Sociales
- Actualizar biografías con https://hemispher-ia.org
- Crear posts de lanzamiento

---

## 📚 Documentación de Referencia

Si tienes problemas en algún paso, consulta:

- **`HOSTINGER_DNS_CAMBIO.md`** - Guía detallada DNS Hostinger
- **`CONFIGURACION_DNS_PASO_A_PASO.md`** - Opciones Cloudflare y troubleshooting
- **`GUIA_CONFIGURACION_DOMINIO.md`** - Guía completa general
- **`README.md`** - Arquitectura y deployment

---

## ❓ Troubleshooting

### Problema: DNS no cambia después de 2 horas
**Solución:**
- Verificar que guardaste cambios en Hostinger
- Limpiar cache DNS: `ipconfig /flushdns`
- Probar en modo incógnito del navegador
- Verificar en múltiples herramientas (dnschecker.org, whatsmydns.net)

### Problema: "Site can't be reached"
**Solución:**
- Verificar que DNS apunte a 82.29.173.205
- Esperar más tiempo (puede tardar hasta 24h en casos raros)
- Verificar que VPS esté corriendo

### Problema: Certificado SSL no válido
**Solución:**
- Esperar 5-10 minutos más
- Verificar que DNS YA apunte a 82.29.173.205 (requisito para SSL)
- Re-generar certificado en EasyPanel

### Problema: "Too many redirects"
**Solución:**
- En EasyPanel, verificar que "Force HTTPS" esté habilitado
- Limpiar cookies del navegador
- Esperar 5 minutos y probar de nuevo

---

## 📞 Contacto

Si necesitas ayuda en algún paso, documenta:
1. ¿En qué paso estás?
2. ¿Qué error ves exactamente? (captura de pantalla)
3. ¿Qué muestra `nslookup hemispher-ia.org`?

---

**Última actualización:** 2025-12-10 23:45 UTC
**Creado por:** Claude Sonnet 4.5
