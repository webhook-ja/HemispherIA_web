# Cambiar DNS de hemispher-ia.org en Hostinger - GUÍA RÁPIDA

## Estado Actual Detectado

```
✅ Dominio: hemispher-ia.org (ACTIVO hasta 2026-11-12)
❌ DNS Actual: Apunta a servidores de Hostinger
   - hemispher-ia.org → 147.79.119.42, 147.79.116.159
   - www.hemispher-ia.org → CDN Hostinger (77.37.50.230)

🎯 DNS Objetivo: Apuntar a nuestro VPS
   - IP del VPS: 82.29.173.205
```

---

## Pasos para Cambiar DNS en Hostinger

### Paso 1: Acceder al Panel de Hostinger

1. Ir a: https://hpanel.hostinger.com/
2. Iniciar sesión con tu cuenta
3. En el menú principal, seleccionar **"Dominios"**
4. Buscar y hacer click en **"hemispher-ia.org"**

### Paso 2: Ir a la Zona DNS

1. En la página del dominio, buscar la sección **"DNS / Nameservers"**
2. Hacer click en **"Gestionar zona DNS"** o **"DNS Zone"**

### Paso 3: Cambiar los Records A

**ELIMINAR los records A existentes:**

Busca y ELIMINA (icono de papelera) estos records:
- Type: `A` | Name: `@` | Points to: `147.79.119.42` (o similar)
- Type: `A` | Name: `@` | Points to: `147.79.116.159` (o similar)

**AGREGAR nuevos records A:**

Click en **"Agregar Record"** o **"Add Record"** y crear estos 2 records:

```
Type: A
Name: @
Points to: 82.29.173.205
TTL: 3600 (o dejar en "Automatic")
```

```
Type: A
Name: www
Points to: 82.29.173.205
TTL: 3600 (o dejar en "Automatic")
```

### Paso 4: Eliminar/Actualizar Record CNAME para www (si existe)

Si existe un record CNAME para `www` que apunta a `hemispher-ia.org.cdn.hstgr.net`:

**OPCIÓN A (Recomendada):**
- ELIMINAR el record CNAME para `www`
- Ya tendrás el record A para `www` del paso anterior

**OPCIÓN B (Alternativa):**
- Mantener el CNAME pero cambiar el destino a `hemispher-ia.org` (sin el .cdn.hstgr.net)

### Paso 5: Opcional - Agregar Record CNAME Wildcard

Si quieres que cualquier subdominio funcione (ej: `api.hemispher-ia.org`, `blog.hemispher-ia.org`):

```
Type: CNAME
Name: *
Points to: hemispher-ia.org
TTL: 3600
```

### Paso 6: Guardar Cambios

1. Click en **"Guardar"** o **"Save"**
2. Confirmar los cambios si te pide confirmación

---

## Verificar los Cambios

### Inmediatamente (desde el panel)

En Hostinger, debería aparecer algo como:

```
✅ A Record    | @    | 82.29.173.205  | 3600
✅ A Record    | www  | 82.29.173.205  | 3600
✅ CNAME Record| *    | hemispher-ia.org| 3600 (opcional)
```

### Desde tu computadora (15-30 minutos después)

```bash
# Limpiar cache DNS local
ipconfig /flushdns

# Verificar cambios
nslookup hemispher-ia.org
# Debe mostrar: 82.29.173.205

nslookup www.hemispher-ia.org
# Debe mostrar: 82.29.173.205
```

### En línea (verificar propagación global)

Ir a: https://dnschecker.org

1. Buscar: `hemispher-ia.org`
2. Type: `A`
3. Click en "Search"

**Resultado esperado:**
- Mayoría de ubicaciones muestran: `82.29.173.205`
- Color verde en la mayoría de servidores

---

## Tiempos de Propagación

| Fase | Tiempo Estimado |
|------|----------------|
| Cambios guardados en Hostinger | Inmediato |
| DNS visible en dnschecker.org | 5-15 minutos |
| Propagación global (80%) | 30 minutos - 2 horas |
| Propagación completa (100%) | 24-48 horas |

**Recomendación:** Esperar al menos 1 hora antes de configurar EasyPanel y SSL.

---

## Siguiente Paso: Configurar EasyPanel

Una vez que `nslookup hemispher-ia.org` muestre `82.29.173.205`, continuar con:

### 1. Acceder a EasyPanel

```
URL: https://v2j42m.easypanel.host
Usuario: [tu usuario de EasyPanel]
Contraseña: [tu contraseña]
```

### 2. Ir al Servicio

```
Projects → n8n → Service: hemiph
```

### 3. Agregar Dominios

En la sección **"Domains"**:

Click en **"Add Domain"** y agregar uno por uno:

```
Dominio 1: hemispher-ia.org
Dominio 2: www.hemispher-ia.org
```

### 4. Habilitar SSL

Después de agregar los dominios:

- ✅ **Enable SSL/TLS** (Let's Encrypt)
- ✅ **Force HTTPS Redirect**
- ✅ **Auto-renew SSL**

Click en **"Save"** o **"Apply"**

⏱️ **Esperar:** 2-5 minutos para que se genere el certificado SSL

---

## Verificación Final

### 1. Verificar DNS
```bash
nslookup hemispher-ia.org
# Resultado: 82.29.173.205
```

### 2. Verificar Sitio Web
Abrir en navegador:
```
https://hemispher-ia.org
```

**Debe mostrar:**
- ✅ Sitio web de HemispherIA cargado
- ✅ Candado verde (SSL activo)
- ✅ Todas las páginas funcionan
- ✅ No aparece error de certificado

### 3. Verificar Redirecciones

```
http://hemispher-ia.org → https://hemispher-ia.org ✅
www.hemispher-ia.org → hemispher-ia.org ✅
```

---

## Troubleshooting

### Problema: DNS no cambia después de 1 hora

**Solución:**
1. Verificar que guardaste los cambios en Hostinger
2. Limpiar cache DNS:
   ```bash
   ipconfig /flushdns
   ```
3. Reiniciar navegador
4. Probar en modo incógnito
5. Verificar en https://dnschecker.org

### Problema: "Site can't be reached" después de cambiar DNS

**Solución:**
1. Verificar que el VPS esté corriendo:
   ```bash
   ssh -i "C:/Users/TRENDING PC/srv750816.key" root@82.29.173.205 "docker service ps n8n_hemiph"
   ```
2. Si el servicio está corriendo, el DNS aún no ha propagado → esperar más

### Problema: Certificado SSL no válido

**Solución:**
1. Esperar 5 minutos más (Let's Encrypt tarda un poco)
2. Verificar en EasyPanel que SSL esté habilitado
3. Verificar que el DNS YA apunte a 82.29.173.205 (requisito para SSL)

---

## Checklist de Configuración

### DNS en Hostinger:
- [ ] Eliminé record A viejo (@) que apuntaba a Hostinger
- [ ] Creé record A nuevo (@) → 82.29.173.205
- [ ] Creé record A para www → 82.29.173.205
- [ ] Guardé los cambios
- [ ] Esperé al menos 30 minutos

### Verificación DNS:
- [ ] `nslookup hemispher-ia.org` muestra 82.29.173.205
- [ ] `nslookup www.hemispher-ia.org` muestra 82.29.173.205
- [ ] dnschecker.org muestra propagación en verde

### EasyPanel:
- [ ] Agregué dominio hemispher-ia.org
- [ ] Agregué dominio www.hemispher-ia.org
- [ ] Habilitécertificado SSL
- [ ] Habilité HTTPS redirect
- [ ] Esperé 5 minutos para certificado

### Verificación Final:
- [ ] https://hemispher-ia.org carga correctamente
- [ ] Candado verde visible
- [ ] Todas las páginas funcionan (/about, /services, /projects, /contact, /public-info)
- [ ] Redirecciones funcionan (http→https, www→no-www o viceversa)

---

## ¿Necesitas Ayuda?

Si algún paso no funciona como se describe, toma una captura de pantalla del error y avísame.

**Última actualización:** 2025-12-10
