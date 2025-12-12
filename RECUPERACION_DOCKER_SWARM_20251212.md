# Recuperación de Docker Swarm - 12 de Diciembre 2025

## Resumen
Recuperación exitosa del Docker Swarm después de eliminación accidental del servicio Traefik. El sitio web hemispher-ia.org está ahora completamente funcional con SSL.

## Estado Final
- ✅ Sitio web accesible: https://hemispher-ia.org
- ✅ HTTP → HTTPS redirect funcionando (308)
- ✅ Certificados SSL válidos (Let's Encrypt)
- ✅ Todos los 26 servicios Docker en ejecución
- ✅ Base de datos PostgreSQL conectada
- ✅ React SPA sirviendo correctamente

## Problemas Resueltos

### 1. Servicio Traefik Eliminado (Heredado de sesión anterior)
**Problema**: Servicio Traefik fue eliminado accidentalmente
**Solución**: Recreado manualmente con configuración correcta

### 2. Fallo de Red Docker Swarm
**Problema**: Servicios no podían comunicarse (ping 100% packet loss)
**Solución**:
- Creado backup completo en `/root/backup_20251212_073448/`
- Reiniciado Docker daemon: `systemctl restart docker`
- Todos los 26 servicios recuperados automáticamente

### 3. Errores de EntryPoint en Traefik
**Problema**: Traefik retornando "404 page not found"
**Causa**: Configuración usaba entryPoints "http"/"https", pero Traefik creado con "web"/"websecure"
**Solución**:
- Editado `/etc/easypanel/traefik/config/main.yaml`
- Cambiado todos los entryPoints a "web" y "websecure"

### 4. Errores de Conexión a Base de Datos
**Problema**: `Database initialization error: Error: connect EHOSTUNREACH 10.11.0.22:5432`
**Solución**: Reiniciado servicio n8n_hemiph: `docker service update --force n8n_hemiph`

### 5. DNS IPv6 Incorrecto
**Problema**: `ERR_SSL_UNRECOGNIZED_NAME_ALERT`
**Causa**: IPv6 DNS (AAAA) apuntando a servidor incorrecto (Hostinger WordPress)
**Descubrimiento**:
```
✅ Registro A (IPv4):    82.29.173.205  ← Correcto (nuestro VPS)
❌ Registro AAAA (IPv6): 2a02:4780:27:1418:0:c69:6d33:3  ← INCORRECTO
✅ Nuestro VPS IPv6:     2a02:4780:28:fc0d::1  ← Debería ser este
```
**Solución**: Usuario corrigió DNS en panel de Hostinger

### 6. Reglas de Routing Incorrectas en Traefik
**Problema CRÍTICO**: Configuración tenía wildcard patterns que no matcheaban dominios exactos
**Configuración Incorrecta**:
```yaml
"rule": "HostRegexp(`^.+\\.hemispher-ia.org$`) && PathPrefix(`/`)"
"main": "*.hemispher-ia.org"
```

**Problema de Persistencia**: Intentos previos de corregir el archivo con Python no persistieron. El archivo fue sobrescrito o regenerado.

**Solución Final** (16:16 UTC):
```python
# Reemplazo línea por línea en Python
if 'HostRegexp' in lines[469] and 'hemispher-ia.org' in lines[469]:
    lines[469] = '        "rule": "Host(`hemispher-ia.org`) || Host(`www.hemispher-ia.org`)",\n'
# Aplicado a líneas 470, 482, 501, 513
```

**Configuración Correcta**:
```yaml
# Línea 470 - HTTP router hemispher-ia.org
"rule": "Host(`hemispher-ia.org`) || Host(`www.hemispher-ia.org`)"

# Línea 482 - HTTPS router hemispher-ia.org
"rule": "Host(`hemispher-ia.org`) || Host(`www.hemispher-ia.org`)"

# Línea 491 - SSL domain configuration
"main": "hemispher-ia.org"

# Línea 501 - HTTP router www
"rule": "Host(`www.hemispher-ia.org`)"

# Línea 513 - HTTPS router www
"rule": "Host(`www.hemispher-ia.org`)"

# Línea 522 - SSL www
"main": "www.hemispher-ia.org"
```

## Archivos Modificados

### En el Servidor (VPS 82.29.173.205)
1. `/etc/easypanel/traefik/config/main.yaml`
   - Modificado: 2025-12-12 16:16:23
   - Cambios: Reglas de routing y entryPoints

2. `/etc/easypanel/traefik/acme.json`
   - Permisos: `chmod 600` (requerido por Traefik)
   - Certificados SSL generados: 2025-12-12 16:11

### En el Repositorio Local
1. `server/index.js`
   - Agregado soporte ACME challenge para Let's Encrypt
   - Middleware antes del catch-all de SPA

## Backups Creados

### 1. Backup Completo Docker Swarm
**Ubicación**: `/root/backup_20251212_073448/`
**Contenido**:
- Configuraciones de 26 servicios (JSON)
- Configuración de EasyPanel completa
- Listados de redes y volúmenes
- Estado de todos los servicios

### 2. Backup Configuración Traefik
**Ubicación**: `/root/backup_traefik_*/`
**Contenido**:
- `main.yaml.backup` - Configuración antes de correcciones
- Múltiples versiones timestamped

## Cambios en Código (server/index.js)

```javascript
// ACME challenge support for Let's Encrypt (must be before SPA catch-all)
const acmeDir = path.join(__dirname, '../.well-known/acme-challenge');
if (!fs.existsSync(acmeDir)) {
  fs.mkdirSync(acmeDir, { recursive: true });
}
app.use('/.well-known/acme-challenge', express.static(acmeDir));

// Handle SPA routing - send all other requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});
```

## Comandos Ejecutados

### Recuperación Docker
```bash
# Backup completo
mkdir -p /root/backup_$(date +%Y%m%d_%H%M%S)
docker service ls > services_list.txt
for service in $(docker service ls --format "{{.Name}}"); do
    docker service inspect $service > "service_${service}.json"
done

# Reiniciar Docker
systemctl restart docker

# Verificar servicios
docker service ls
```

### Corrección Traefik
```bash
# Backup config
cp /etc/easypanel/traefik/config/main.yaml /root/backup_traefik_*/main.yaml.backup

# Reiniciar Traefik después de cambios
docker service update --force traefik

# Verificar logs
docker service logs traefik --tail 20
```

### Verificación SSL
```bash
# Verificar certificados
cat /etc/easypanel/traefik/acme.json | python3 -m json.tool | grep "hemispher-ia.org"

# Permisos correctos
chmod 600 /etc/easypanel/traefik/acme.json

# Probar acceso
curl -I https://hemispher-ia.org
```

## Verificación Final

### HTTP Redirect
```bash
$ curl -I http://hemispher-ia.org
HTTP/1.1 308 Permanent Redirect
Location: https://hemispher-ia.org/
```

### HTTPS OK
```bash
$ curl -I https://hemispher-ia.org
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
X-Powered-By: Express
```

### Contenido Correcto
```bash
$ curl -s https://hemispher-ia.org | grep title
<title>Hemispher-IA - Conectando Conocimiento, Talento y Tecnología</title>
```

## Lecciones Aprendidas

1. **Siempre hacer backup completo antes de cambios críticos**
   - Backup salvó meses de trabajo
   - Reinicio de Docker preferable a reinit de Swarm

2. **Verificar persistencia de cambios en archivos**
   - Primer intento de corrección no persistió
   - EasyPanel puede regenerar archivos
   - Verificar cambios con `cat` después de modificar

3. **Documentar estado de DNS externo**
   - IPv6 mal configurado causó problemas SSL
   - Verificar tanto A como AAAA records

4. **EntryPoints de Traefik deben coincidir**
   - Config usaba "http"/"https"
   - Servicio creado con "web"/"websecure"
   - Causó todos los routers inválidos

5. **Wildcards SSL no incluyen dominio root**
   - `*.domain.com` NO incluye `domain.com`
   - Usar dominio específico + sans

## Contactos y Referencias

- **VPS**: 82.29.173.205
- **SSH Key**: `C:/Users/TRENDING PC/srv750816.key`
- **DNS**: Hostinger (corregido por usuario)
- **SSL**: Let's Encrypt (automático via Traefik)
- **Base de Datos**: postgres_postgres (10.11.0.22:5432)

## Timestamp
- **Inicio recuperación**: 2025-12-12 07:34:48 UTC
- **Corrección Traefik**: 2025-12-12 16:16:23 UTC
- **Sitio funcional**: 2025-12-12 17:42:33 UTC
- **Duración total**: ~10 horas

## Estado de Servicios

```
ID     NAME                       MODE         REPLICAS   IMAGE
...    traefik                    global       1/1        traefik:v2.11
...    n8n_hemiph                 replicated   1/1        easypanel/n8n/hemiph:latest
...    postgres_postgres          replicated   1/1        postgres:17-alpine
...    (23 servicios adicionales funcionando correctamente)
```

---

**Documentado por**: Claude Code (Claude Sonnet 4.5)
**Fecha**: 12 de Diciembre, 2025
**Verificado**: Sitio web completamente operacional
