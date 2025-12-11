# Activar hemispher-ia.org - Guía Completa Paso a Paso

**Fecha:** 2025-12-11
**Estado:** LISTO PARA EJECUTAR

---

## Estado Actual Verificado

```
Dominio: hemispher-ia.org
DNS Actual: 147.79.119.234 (Hostinger - OLD)
DNS Destino: 82.29.173.205 (Tu VPS - NEW)
Servicio VPS: Running (verificado)
Sitio temporal: https://n8n-hemiph.v2j42m.easypanel.host (funcionando)
```

---

## PARTE 1: Cambiar DNS en Hostinger (15 minutos)

### Paso 1.1: Acceder a Hostinger

1. Abre tu navegador
2. Ve a: **https://hpanel.hostinger.com/**
3. Inicia sesión con tu cuenta de Hostinger

### Paso 1.2: Ir a la Gestión del Dominio

1. En el panel principal, busca el menú lateral izquierdo
2. Click en **"Dominios"** o **"Domains"**
3. Verás tu lista de dominios
4. Click en **"hemispher-ia.org"**

### Paso 1.3: Abrir Gestión de DNS

1. Dentro de la página del dominio, busca:
   - **"Gestionar zona DNS"** (español)
   - **"DNS Zone"** o **"Manage DNS"** (inglés)
2. Click en ese botón

### Paso 1.4: Eliminar Records Antiguos

Verás una tabla con records DNS. Busca y **ELIMINA** estos:

#### Record A (apunta a IP vieja):
```
Type: A
Name: @ o hemispher-ia.org
Points to: 147.79.119.234 o 147.79.119.42 o 147.79.116.159
```
**Acción:** Click en el icono de papelera/eliminar ❌

#### Record CNAME para www (si existe):
```
Type: CNAME
Name: www
Points to: *.cdn.hstgr.net o cualquier cosa
```
**Acción:** Click en el icono de papelera/eliminar ❌

### Paso 1.5: Agregar Nuevos Records

Ahora agrega 2 records nuevos:

#### Record 1 (Dominio principal):
1. Click en **"Agregar registro"** o **"Add Record"**
2. Completa así:
   ```
   Type: A
   Name: @ (o déjalo vacío, o pon "hemispher-ia.org")
   Points to: 82.29.173.205
   TTL: 3600 (o "Automatic")
   ```
3. Click **"Guardar"** o **"Add Record"**

#### Record 2 (Subdominio www):
1. Click en **"Agregar registro"** o **"Add Record"** nuevamente
2. Completa así:
   ```
   Type: A
   Name: www
   Points to: 82.29.173.205
   TTL: 3600 (o "Automatic")
   ```
3. Click **"Guardar"** o **"Add Record"**

### Paso 1.6: Verificar y Confirmar

Después de agregar, la tabla debe verse así:

```
✅ A    | @   | 82.29.173.205 | TTL: 3600
✅ A    | www | 82.29.173.205 | TTL: 3600
```

Si ves eso, **¡PERFECTO!** Puedes cerrar Hostinger.

---

## PARTE 2: Esperar Propagación DNS (30 min - 2 horas)

### ¿Qué está pasando?

Los servidores DNS del mundo están actualizando tu dominio con la nueva IP. Esto tarda un poco.

### Verificación cada 15 minutos

Abre la terminal (Git Bash o CMD) y ejecuta:

```bash
nslookup hemispher-ia.org
```

**Resultado ANTES (todavía no propagó):**
```
Addresses: 147.79.119.234  ← IP vieja (Hostinger)
```

**Resultado DESPUÉS (ya propagó):**
```
Address: 82.29.173.205  ← IP nueva (Tu VPS) ✅
```

### Herramienta en línea

También puedes usar: **https://dnschecker.org**
- Busca: `hemispher-ia.org`
- Type: `A`
- Espera hasta que la mayoría de servidores muestren: `82.29.173.205`

### NO continúes al Paso 3 hasta que nslookup muestre 82.29.173.205

---

## PARTE 3: Configurar Dominio en EasyPanel (5 minutos)

**IMPORTANTE:** Solo hacer DESPUÉS de que DNS apunte a 82.29.173.205

### Paso 3.1: Acceder a EasyPanel

1. Abre tu navegador
2. Ve a: **https://v2j42m.easypanel.host**
3. Inicia sesión con tus credenciales de EasyPanel

### Paso 3.2: Navegar al Servicio

1. En el menú lateral, click en **"Projects"**
2. Click en el proyecto **"n8n"**
3. Verás una lista de servicios
4. Click en el servicio **"hemiph"**

### Paso 3.3: Ir a Configuración de Dominios

En la página del servicio "hemiph":
1. Busca en el menú lateral o tabs superiores:
   - **"Domains"** o
   - **"Domain"** o
   - **"Settings"** → **"Domains"**
2. Click ahí

### Paso 3.4: Agregar Primer Dominio (sin www)

1. Busca el botón **"Add Domain"** o **"+ Add"**
2. Click en él
3. Aparecerá un formulario
4. Completa:
   ```
   Domain: hemispher-ia.org
   ```
5. **Marcar estas opciones:**
   - ✅ Enable SSL/TLS (Let's Encrypt)
   - ✅ Force HTTPS Redirect
   - ✅ Auto-renew SSL certificates

6. Click **"Add"** o **"Save"**

### Paso 3.5: Agregar Segundo Dominio (con www)

1. Click en **"Add Domain"** o **"+ Add"** nuevamente
2. Completa:
   ```
   Domain: www.hemispher-ia.org
   ```
3. **Marcar estas opciones:**
   - ✅ Enable SSL/TLS (Let's Encrypt)
   - ✅ Force HTTPS Redirect
   - ✅ Auto-renew SSL certificates

4. Click **"Add"** o **"Save"**

### Paso 3.6: Configurar Dominio Primario (Opcional pero Recomendado)

Si EasyPanel tiene opción de **"Primary Domain"**:
1. Selecciona **hemispher-ia.org** (sin www) como primario
2. Esto hará que www.hemispher-ia.org redirija a hemispher-ia.org

### Paso 3.7: Esperar Certificados SSL (2-5 minutos)

EasyPanel generará automáticamente certificados SSL de Let's Encrypt.

Verás un indicador de estado junto a cada dominio:
```
hemispher-ia.org
  SSL Certificate: Pending... → Active ✅

www.hemispher-ia.org
  SSL Certificate: Pending... → Active ✅
```

**Espera hasta que ambos muestren "Active" o "Valid" ✅**

Si tarda más de 5 minutos:
- Verifica que `nslookup hemispher-ia.org` muestre 82.29.173.205
- Busca botón "Retry SSL" o "Regenerate Certificate" y click

---

## PARTE 4: Verificación Final (2 minutos)

### Test 1: DNS Final
```bash
nslookup hemispher-ia.org
```
**Debe mostrar:** `82.29.173.205` ✅

### Test 2: Abrir Sitio Principal
Abre tu navegador y ve a:
```
https://hemispher-ia.org
```

**Debe mostrar:**
- ✅ Tu sitio web de Hemispher-IA
- ✅ Candado verde 🔒 en la barra de direcciones
- ✅ URL dice "https://" (seguro)
- ✅ Sin advertencias de certificado

### Test 3: Probar www
```
http://www.hemispher-ia.org
```

**Debe redirigir a:**
```
https://hemispher-ia.org
```

### Test 4: Probar Todas las Páginas

Abre cada una de estas URLs:
```
✅ https://hemispher-ia.org/
✅ https://hemispher-ia.org/about
✅ https://hemispher-ia.org/services
✅ https://hemispher-ia.org/projects
✅ https://hemispher-ia.org/contact
✅ https://hemispher-ia.org/public-info
✅ https://hemispher-ia.org/admin (debe pedir login)
```

### Test 5: Verificación Técnica SSL
```bash
curl -I https://hemispher-ia.org
```

**Debe incluir:**
```
HTTP/2 200 OK
strict-transport-security: max-age=...
```

---

## PARTE 5: Desvincular de Hostinger (Opcional)

### ¿Necesitas hacer esto?

**NO** si:
- Solo quieres usar el dominio (ya está funcionando)
- Hostinger solo gestiona tu DNS (no hay sitio web allí)

**SÍ** si:
- Tienes un plan de hosting activo en Hostinger que ya no usas
- Quieres cancelar servicios de hosting

### Cómo Desvincular (si lo necesitas)

1. Ve a https://hpanel.hostinger.com/
2. **Hosting** → **Servicios activos**
3. Busca el plan asociado a hemispher-ia.org
4. Si hay un hosting activo:
   - Click en **"Gestionar"**
   - Scroll hasta el final
   - Click en **"Cancelar servicio"** o **"No renovar"**

**IMPORTANTE:**
- Esto NO afecta tu dominio (el dominio seguirá siendo tuyo)
- Solo cancela el hosting (espacio web) que ya no usas
- El dominio seguirá apuntando a tu VPS (82.29.173.205)

### Mantener Solo el Dominio en Hostinger

Si pagaste por el dominio en Hostinger:
- Déjalo ahí (no hay problema)
- Solo gestiona el DNS como hiciste en Parte 1
- Renueva solo el dominio cuando expire (2026-11-12)

---

## Resumen de Tiempos

| Paso | Tiempo |
|------|--------|
| 1. Cambiar DNS en Hostinger | 5-10 min |
| 2. Esperar propagación DNS | 30 min - 2 horas |
| 3. Configurar EasyPanel | 3-5 min |
| 4. Esperar SSL | 2-5 min |
| 5. Verificación | 2 min |
| **TOTAL** | **40 min - 2.5 horas** |

---

## Troubleshooting

### Problema 1: nslookup sigue mostrando IP vieja después de 2 horas

**Soluciones:**
```bash
# 1. Limpiar cache DNS local
ipconfig /flushdns

# 2. Verificar nuevamente
nslookup hemispher-ia.org

# 3. Si persiste, verificar en Hostinger que guardaste los cambios
```

### Problema 2: SSL no se genera en EasyPanel ("Failed")

**Causa:** Let's Encrypt no puede verificar el dominio

**Soluciones:**
1. Verificar que `nslookup hemispher-ia.org` muestre `82.29.173.205` (requisito obligatorio)
2. Esperar 5-10 minutos más
3. En EasyPanel, buscar botón **"Retry SSL"** o **"Regenerate Certificate"**
4. Si persiste, eliminar el dominio de EasyPanel y agregarlo de nuevo

### Problema 3: "Site can't be reached"

**Soluciones:**
```bash
# Verificar DNS
nslookup hemispher-ia.org
# Debe mostrar: 82.29.173.205

# Verificar servicio Docker corriendo
ssh -i "C:/Users/TRENDING PC/srv750816.key" root@82.29.173.205 "docker service ps n8n_hemiph"
# Debe mostrar: Running

# Si no está corriendo, reiniciar:
ssh -i "C:/Users/TRENDING PC/srv750816.key" root@82.29.173.205 "docker service update --force n8n_hemiph"
```

### Problema 4: "Too many redirects"

**Soluciones:**
1. Limpiar cookies del navegador para hemispher-ia.org
2. Verificar en EasyPanel que "Force HTTPS" esté habilitado
3. Esperar 5 minutos y probar en modo incógnito

### Problema 5: Certificado SSL "Not Secure" o "Invalid"

**Soluciones:**
1. Esperar 5-10 minutos más (SSL puede tardar)
2. Verificar que DNS apunte a 82.29.173.205 (requisito para SSL)
3. Regenerar certificado en EasyPanel

---

## Contacto y Soporte

Si tienes problemas:
1. Documenta en qué paso estás
2. Captura de pantalla del error
3. Resultado de: `nslookup hemispher-ia.org`
4. Resultado de: `curl -I https://hemispher-ia.org`

---

## ¡LISTO!

Si todos los tests pasaron, tu sitio está **COMPLETAMENTE FUNCIONAL** en:

🌐 **https://hemispher-ia.org**

Próximos pasos opcionales:
- Google Search Console
- Google Analytics
- Configurar email corporativo (@hemispher-ia.org)
- Actualizar redes sociales con nueva URL

---

**Última actualización:** 2025-12-11 12:15 UTC
**Creado por:** Claude Sonnet 4.5
