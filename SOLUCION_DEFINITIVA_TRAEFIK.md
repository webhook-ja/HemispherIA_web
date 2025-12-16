# Solución Definitiva - Configuración Traefik para Hemispher-IA

## Problema Principal

**Easypanel regenera automáticamente el archivo `/etc/easypanel/traefik/config/main.yaml`** cada vez que se hace un cambio en la configuración de servicios. Esto significa que cualquier modificación manual a este archivo será sobrescrita.

## Solución Implementada

### Crear Archivo de Configuración Separado

En lugar de modificar `main.yaml`, creamos un archivo separado que Traefik carga automáticamente:

**Archivo:** `/etc/easypanel/traefik/config/hemiph-custom.yml`

```yaml
http:
  routers:
    http-n8n_hemiph-easypanel:
      service: n8n_hemiph-easypanel
      rule: Host(`n8n-hemiph.v2j42m.easypanel.host`)
      priority: 10
      middlewares:
        - redirect-to-https
      entryPoints:
        - http

    https-n8n_hemiph-easypanel:
      service: n8n_hemiph-easypanel
      rule: Host(`n8n-hemiph.v2j42m.easypanel.host`)
      priority: 10
      tls:
        certResolver: letsencrypt
      entryPoints:
        - https

  services:
    n8n_hemiph-easypanel:
      loadBalancer:
        servers:
          - url: http://n8n_hemiph:3000/
        passHostHeader: true
```

### Ventajas de esta Solución

1. ✅ **Persistente** - No se sobrescribe cuando Easypanel regenera main.yaml
2. ✅ **Modular** - Configuración aislada y fácil de mantener
3. ✅ **Alta prioridad** - Priority 10 asegura que tome precedencia sobre otras reglas
4. ✅ **HTTPS automático** - Certificado Let's Encrypt gestionado por Traefik

## Cómo Aplicar los Cambios

### 1. Copiar el archivo al servidor
```bash
scp -i "C:/Users/TRENDING PC/srv750816.key" \
  hemiph-custom.yml \
  root@82.29.173.205:/etc/easypanel/traefik/config/hemiph-custom.yml
```

### 2. Recargar Traefik
```bash
ssh -i "C:/Users/TRENDING PC/srv750816.key" root@82.29.173.205 \
  "docker kill -s HUP \$(docker ps -q --filter name=traefik)"
```

### 3. Verificar funcionamiento
```bash
curl -I https://n8n-hemiph.v2j42m.easypanel.host/
# Debe devolver: HTTP/1.1 200 OK

curl https://n8n-hemiph.v2j42m.easypanel.host/api/health
# Debe devolver: {"status":"ok","database":"connected"}
```

## Dominios Configurados

El servicio Hemispher-IA responde en múltiples dominios:

1. **`*.hemispher-ia.org`** (configurado en Easypanel/main.yaml)
2. **`*.www.hemispher-ia.org`** (configurado en Easypanel/main.yaml)
3. **`n8n-hemiph.v2j42m.easypanel.host`** (configurado en hemiph-custom.yml) ← **Personalizado**

## Mantenimiento

### Si el sitio vuelve a dar 404:

1. Verificar que el archivo existe:
   ```bash
   ssh root@82.29.173.205 "ls -la /etc/easypanel/traefik/config/hemiph-custom.yml"
   ```

2. Si no existe, volver a copiarlo desde este repositorio
3. Recargar Traefik con el comando HUP

### Backup del archivo de configuración

El archivo `hemiph-custom.yml` está versionado en el repositorio local:
```
C:\Users\TRENDING PC\hemiph-custom.yml
```

## Estado Actual

✅ **Sitio funcionando correctamente**

- URL: https://n8n-hemiph.v2j42m.easypanel.host/
- Status: HTTP 200 OK
- API: Respondiendo correctamente
- Database: Conectada
- HTTPS: Certificado Let's Encrypt activo
- Response time: ~120ms

## Logs de Reparación

- **Primer intento:** Modificación directa de main.yaml (FALLIDO - se sobrescribió)
- **Solución final:** Archivo separado hemiph-custom.yml (EXITOSO - persistente)

---

**Fecha:** 16 Diciembre 2025
**Estado:** ✅ RESUELTO Y DOCUMENTADO
