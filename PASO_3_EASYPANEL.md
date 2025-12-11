# PASO 3: Configurar Dominio en EasyPanel

**⚠️ REQUISITO:** Solo ejecutar DESPUÉS de que DNS apunte a 82.29.173.205

---

## ✅ Pre-requisitos

Antes de comenzar, verifica:

```bash
nslookup hemispher-ia.org
```

**Debe mostrar:**
```
Address: 82.29.173.205  ✅
```

Si todavía muestra IPs de Hostinger (193.x.x.x o 147.x.x.x), **ESPERA MÁS TIEMPO**.

---

## 🔧 Configuración en EasyPanel

### 3.1 Acceder a EasyPanel

1. Abre tu navegador
2. Ve a: **https://v2j42m.easypanel.host**
3. Inicia sesión con tus credenciales

### 3.2 Navegar al Servicio

4. En el panel principal, busca **"Projects"** en el menú lateral
5. Click en el proyecto **"n8n"**
6. Verás una lista de servicios
7. Click en el servicio **"hemiph"**

### 3.3 Acceder a Configuración de Dominios

8. Dentro del servicio "hemiph", busca en el menú:
   - Puede estar en un tab superior llamado **"Domains"**
   - O en el menú lateral como **"Domain"**
   - O dentro de **"Settings"** → **"Domains"**

### 3.4 Agregar Primer Dominio (sin www)

9. Click en el botón **"Add Domain"** o **"+ Add"** o **"+ New Domain"**

10. Aparecerá un formulario. Completa:
    ```
    Domain name: hemispher-ia.org
    ```

11. **Marca estas opciones (IMPORTANTE):**
    - ✅ **Enable SSL/TLS** (Let's Encrypt)
    - ✅ **Force HTTPS Redirect**
    - ✅ **Auto-renew SSL certificates**

12. Click **"Save"** o **"Add"** o **"Create"**

### 3.5 Agregar Segundo Dominio (con www)

13. Click en **"Add Domain"** o **"+ Add"** nuevamente

14. Completa:
    ```
    Domain name: www.hemispher-ia.org
    ```

15. **Marca las mismas opciones:**
    - ✅ **Enable SSL/TLS** (Let's Encrypt)
    - ✅ **Force HTTPS Redirect**
    - ✅ **Auto-renew SSL certificates**

16. Click **"Save"** o **"Add"** o **"Create"**

### 3.6 Configurar Dominio Primario (Opcional)

Si EasyPanel tiene opción de **"Primary Domain"** o **"Default Domain"**:

17. Selecciona **hemispher-ia.org** (sin www) como el dominio primario
18. Esto hará que www.hemispher-ia.org redirija automáticamente a hemispher-ia.org

### 3.7 Esperar Generación de Certificados SSL

**Tiempo estimado:** 2-5 minutos

EasyPanel ahora va a:
1. Detectar que el DNS apunta a tu VPS
2. Contactar a Let's Encrypt
3. Validar el dominio
4. Generar certificados SSL automáticamente
5. Configurar HTTPS

**Verás indicadores de estado:**
```
hemispher-ia.org
  SSL Certificate: Pending... ⏳

(Después de 2-5 minutos)

hemispher-ia.org
  SSL Certificate: Active ✅
  Issued by: Let's Encrypt
  Valid until: [fecha 3 meses adelante]
```

**Lo mismo para www:**
```
www.hemispher-ia.org
  SSL Certificate: Active ✅
```

---

## ⚠️ Troubleshooting

### Problema: "Domain not found" o "Invalid domain"

**Causa:** DNS todavía no ha propagado completamente

**Solución:**
1. Verifica: `nslookup hemispher-ia.org`
2. Debe mostrar: `82.29.173.205`
3. Espera 15-30 minutos más
4. Intenta agregar el dominio de nuevo

### Problema: SSL Certificate "Pending" por más de 10 minutos

**Causa:** Let's Encrypt no puede verificar el dominio

**Soluciones:**
1. **Verifica DNS (CRÍTICO):**
   ```bash
   nslookup hemispher-ia.org
   # DEBE mostrar: 82.29.173.205
   ```

2. **Verifica servicio Docker:**
   ```bash
   ssh -i "C:/Users/TRENDING PC/srv750816.key" root@82.29.173.205
   docker service ps n8n_hemiph
   # DEBE mostrar: Running
   ```

3. **Busca botón "Retry SSL"** en EasyPanel y click

4. **Si persiste, elimina el dominio y agrégalo de nuevo:**
   - Click en el dominio
   - Busca "Delete" o "Remove"
   - Espera 2 minutos
   - Agrega el dominio nuevamente

### Problema: SSL Certificate "Failed"

**Causa más común:** Puerto 80 o 443 bloqueado

**Soluciones:**
1. Verifica firewall del VPS:
   ```bash
   ssh -i "C:/Users/TRENDING PC/srv750816.key" root@82.29.173.205
   iptables -L -n | grep -E "(80|443)"
   ```

2. Verifica que el servicio Docker esté en el puerto correcto:
   ```bash
   docker service inspect n8n_hemiph --format='{{json .Endpoint.Ports}}' | jq
   ```

3. Reinicia el servicio:
   ```bash
   docker service update --force n8n_hemiph
   ```

---

## ✅ Señales de que todo está bien

Después de agregar los dominios, deberías ver:

**En la lista de dominios de EasyPanel:**
```
✅ hemispher-ia.org          SSL: Active ✅  HTTPS: Forced ✅
✅ www.hemispher-ia.org      SSL: Active ✅  HTTPS: Forced ✅
```

**Iconos o indicadores verdes:**
- 🟢 Estado: Active/Running
- 🔒 SSL: Valid/Enabled
- ↪️  HTTPS: Forced/Enabled

---

## 🎯 Cuando veas "SSL: Active" en ambos dominios

**¡LISTO!** Continúa al **PASO 4: Verificación Final**

---

## 📞 Notas Importantes

1. **DNS PRIMERO:** Si agregas el dominio antes de que DNS propague, SSL fallará
2. **Paciencia con SSL:** Puede tardar hasta 5 minutos en generar
3. **No elimines el subdominio antiguo:** `n8n-hemiph.v2j42m.easypanel.host` puede seguir como backup

---

**Tiempo total estimado:** 5-10 minutos (después de que DNS propague)

**¿Problemas?** Vuelve a la sección Troubleshooting o consulta `ACTIVAR_DOMINIO_COMPLETO.md`
