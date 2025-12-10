# Configurar hemispher-ia.org en EasyPanel - GUÍA SIMPLE

## 🎯 Objetivo
Configurar el dominio **hemispher-ia.org** en el proyecto **n8n_hemiph** de EasyPanel.

---

## ✅ Requisitos Previos

Antes de configurar en EasyPanel, **DEBES** cambiar los DNS en Hostinger:

### DNS Actual (ANTES):
```
hemispher-ia.org → 147.79.119.42 (Hostinger)
```

### DNS Requerido (DESPUÉS):
```
hemispher-ia.org → 82.29.173.205 (Tu VPS)
```

### 📌 Cambiar DNS en Hostinger (5 minutos):

1. Ir a: https://hpanel.hostinger.com/
2. **Dominios** → **hemispher-ia.org**
3. **Gestionar zona DNS**
4. **ELIMINAR** record A que apunta a `147.79.119.42`
5. **AGREGAR** record A:
   ```
   Type: A
   Name: @
   Value: 82.29.173.205
   TTL: 3600
   ```
6. **AGREGAR** record A para www:
   ```
   Type: A
   Name: www
   Value: 82.29.173.205
   TTL: 3600
   ```
7. **Guardar**

### ⏱️ Esperar Propagación (30 min - 2 horas)

Verificar cada 15 minutos:
```bash
nslookup hemispher-ia.org
```

**Continuar solo cuando muestre:** `82.29.173.205`

---

## 🚀 Pasos en EasyPanel

### 1. Acceder a EasyPanel

```
URL: https://v2j42m.easypanel.host
```

Iniciar sesión con tus credenciales.

### 2. Navegar al Proyecto

```
Projects → n8n → hemiph
```

### 3. Ir a la Configuración de Dominios

En el menú lateral del servicio **hemiph**, buscar la sección:
- **"Domains"** o
- **"Domain"** o
- **"Settings"** → **"Domains"**

### 4. Agregar el Primer Dominio

Click en botón **"Add Domain"** o **"+ Add"**

**Dominio:**
```
hemispher-ia.org
```

✅ **Marcar opciones:**
- [x] Enable SSL/TLS (Let's Encrypt)
- [x] Force HTTPS Redirect
- [x] Auto-renew SSL

**Guardar** o **Add**

### 5. Agregar el Segundo Dominio (www)

Click en **"Add Domain"** nuevamente

**Dominio:**
```
www.hemispher-ia.org
```

✅ **Marcar opciones:**
- [x] Enable SSL/TLS (Let's Encrypt)
- [x] Force HTTPS Redirect
- [x] Auto-renew SSL

**Guardar** o **Add**

### 6. Configurar Redirección (Opcional pero Recomendado)

Si EasyPanel tiene opción de **"Primary Domain"** o **"Redirect to"**:

- Seleccionar **hemispher-ia.org** como dominio primario
- Configurar **www.hemispher-ia.org** para redirigir a **hemispher-ia.org**

Esto hace que ambos dominios funcionen, pero www redirige automáticamente a la versión sin www.

### 7. Esperar Generación de SSL (2-5 minutos)

EasyPanel automáticamente:
1. Detecta que el DNS apunta al VPS
2. Genera certificado SSL de Let's Encrypt
3. Configura HTTPS automáticamente

Verás un indicador de estado:
```
✓ SSL Certificate: Active
✓ Issued by: Let's Encrypt
```

---

## ✅ Verificación Final

### 1. Verificar que el DNS apunta al VPS
```bash
nslookup hemispher-ia.org
# Debe mostrar: 82.29.173.205
```

### 2. Abrir el sitio en navegador

```
https://hemispher-ia.org
```

**Debe mostrar:**
- ✅ Sitio web de Hemispher-IA
- ✅ Candado verde 🔒 (SSL activo)
- ✅ URL dice "https://" (seguro)
- ✅ Sin advertencias de certificado

### 3. Verificar www también funciona

```
http://www.hemispher-ia.org
```

**Debe redirigir a:**
```
https://hemispher-ia.org
```

### 4. Probar todas las páginas

```
✅ https://hemispher-ia.org/about
✅ https://hemispher-ia.org/services
✅ https://hemispher-ia.org/projects
✅ https://hemispher-ia.org/contact
✅ https://hemispher-ia.org/public-info
```

---

## 🐛 Troubleshooting

### Problema: "Domain not found" en EasyPanel al agregar dominio

**Causa:** DNS aún no ha propagado

**Solución:**
1. Verificar con `nslookup hemispher-ia.org` que muestre `82.29.173.205`
2. Esperar más tiempo (puede tardar hasta 2 horas)
3. Limpiar cache DNS: `ipconfig /flushdns`
4. Intentar agregar el dominio de nuevo

### Problema: SSL no se genera ("SSL Certificate: Pending" o "Failed")

**Causa:** Let's Encrypt no puede verificar el dominio

**Solución:**
1. Verificar que DNS apunte a `82.29.173.205` (requisito obligatorio)
2. Esperar 5-10 minutos más
3. En EasyPanel, buscar botón **"Retry SSL"** o **"Regenerate Certificate"**
4. Si persiste, eliminar el dominio y agregarlo de nuevo

### Problema: "Site can't be reached" al abrir https://hemispher-ia.org

**Causa 1:** DNS aún no propagó globalmente

**Solución:**
- Esperar más tiempo
- Verificar en https://dnschecker.org

**Causa 2:** Servicio Docker no está corriendo

**Solución:**
```bash
ssh -i "C:/Users/TRENDING PC/srv750816.key" root@82.29.173.205
docker service ps n8n_hemiph
```

Si muestra error, reiniciar servicio:
```bash
docker service update --force n8n_hemiph
```

### Problema: "Too many redirects"

**Causa:** Configuración de redirección HTTPS incorrecta

**Solución:**
1. En EasyPanel, verificar que **"Force HTTPS"** esté habilitado
2. Limpiar cookies del navegador para hemispher-ia.org
3. Esperar 5 minutos y probar de nuevo

---

## 📊 Resumen de Configuración

Una vez completado, tu configuración será:

### DNS (Hostinger):
```
hemispher-ia.org    → A Record → 82.29.173.205
www.hemispher-ia.org → A Record → 82.29.173.205
```

### EasyPanel (Proyecto n8n/hemiph):
```
Dominios:
  - hemispher-ia.org (SSL ✓, HTTPS ✓)
  - www.hemispher-ia.org (SSL ✓, HTTPS ✓, Redirect → hemispher-ia.org)
```

### Resultado Final:
```
https://hemispher-ia.org → Sitio funcionando ✅
http://hemispher-ia.org  → Redirect a HTTPS ✅
www.hemispher-ia.org     → Redirect a hemispher-ia.org ✅
```

---

## ⏱️ Tiempos Estimados

| Paso | Tiempo |
|------|--------|
| Cambiar DNS en Hostinger | 5 minutos |
| Esperar propagación DNS | 30 min - 2 horas |
| Configurar dominios en EasyPanel | 2 minutos |
| Generación SSL automática | 2-5 minutos |
| **TOTAL** | **40 min - 2.5 horas** |

---

## 📞 Soporte

Si tienes problemas:

1. Verifica que DNS apunte a `82.29.173.205` (requisito #1)
2. Espera al menos 1 hora para propagación DNS
3. Toma captura de pantalla del error en EasyPanel
4. Verifica logs del servicio: `docker service logs n8n_hemiph`

---

**Última actualización:** 2025-12-10
