# Flujo de Trabajo: Repositorio Privado + Deploy EasyPanel

## ESTADO ACTUAL
✅ Todo guardado en GitHub: https://github.com/webhook-ja/HemispherIA_web
✅ Últimos commits subidos (12 dic 2025)
✅ Repositorio actualmente PÚBLICO

---

## PASO 1: HACER EL REPOSITORIO PRIVADO

### Opción A: Desde GitHub Web (Recomendado)
1. Ve a: https://github.com/webhook-ja/HemispherIA_web
2. Click en **Settings** (Configuración)
3. Scroll hasta el final de la página
4. En la sección **Danger Zone** (Zona de Peligro)
5. Click en **Change repository visibility**
6. Selecciona **Make private**
7. Escribe el nombre del repositorio para confirmar: `webhook-ja/HemispherIA_web`
8. Click en **I understand, make this repository private**

### Opción B: Con GitHub CLI (Alternativa)
```bash
gh repo edit webhook-ja/HemispherIA_web --visibility private
```

---

## PASO 2: CONFIRMAR QUE CLAUDE CODE SIGUE TENIENDO ACCESO

**¿Puede Claude Code seguir trabajando con repositorios privados?**

**SÍ, COMPLETAMENTE.** Claude Code puede:
- ✅ Leer archivos de repos privados
- ✅ Hacer commits
- ✅ Hacer push/pull
- ✅ Crear ramas
- ✅ Todo lo que hace con repos públicos

**¿Cómo funciona?**
- Claude Code usa TUS credenciales de Git locales
- Si tú tienes acceso al repo, Claude Code también
- No necesita configuración adicional

**Verificación** (después de hacer el repo privado):
```bash
cd "C:/Users/TRENDING PC/HemispherIA_web_git"
git pull origin main
```

Si esto funciona sin error, todo está correcto.

---

## PASO 3: FLUJO DE TRABAJO COMPLETO

### Cuando quieras actualizar la web:

```
┌─────────────────────────────────────────────────────────┐
│ 1. DESARROLLO LOCAL (con Claude Code)                  │
│    - Claude Code hace cambios en archivos              │
│    - Claude Code hace commit                           │
│    - Claude Code hace push a GitHub                    │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 2. GITHUB (Repositorio Privado)                        │
│    - Código actualizado guardado de forma segura       │
│    - Nadie más puede ver o descargar tu código         │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 3. SERVIDOR VPS (Deploy Manual)                        │
│    Opción A: Git Pull en servidor                      │
│    Opción B: SCP directo de archivos                   │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 4. REBUILD DOCKER + UPDATE SERVICE                     │
│    - docker build -t easypanel/n8n/hemiph:latest .      │
│    - docker service update --force n8n_hemiph           │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 5. WEB ACTUALIZADA                                      │
│    ✅ https://hemispher-ia.org                          │
└─────────────────────────────────────────────────────────┘
```

---

## COMANDOS PARA DEPLOY EN SERVIDOR

### Método 1: Git Pull en el Servidor (Recomendado)

**Requisitos previos** (solo primera vez):
```bash
# Conectar por SSH
ssh -i "C:/Users/TRENDING PC/srv750816.key" root@82.29.173.205

# Navegar al directorio del código
cd /etc/easypanel/projects/n8n/hemiph/code

# Configurar Git (solo si no existe .git)
git init
git remote add origin https://github.com/webhook-ja/HemispherIA_web.git
git pull origin main
```

**Para actualizar (cada vez que hagas cambios):**
```bash
ssh -i "C:/Users/TRENDING PC/srv750816.key" root@82.29.173.205 << 'ENDSSH'
cd /etc/easypanel/projects/n8n/hemiph/code

# Traer últimos cambios de GitHub
git pull origin main

# Rebuild imagen Docker
docker build -t easypanel/n8n/hemiph:latest .

# Actualizar servicio
docker service update --force --image easypanel/n8n/hemiph:latest n8n_hemiph

# Verificar
curl -I https://hemispher-ia.org
ENDSSH
```

### Método 2: SCP de Archivos Específicos (Alternativa)

Si solo cambiaste archivos específicos:

```bash
# Ejemplo: Actualizar server/index.js
scp -i "C:/Users/TRENDING PC/srv750816.key" \
  "C:/Users/TRENDING PC/HemispherIA_web_git/server/index.js" \
  root@82.29.173.205:/etc/easypanel/projects/n8n/hemiph/code/server/

# Luego rebuild
ssh -i "C:/Users/TRENDING PC/srv750816.key" root@82.29.173.205 \
  "cd /etc/easypanel/projects/n8n/hemiph/code && \
   docker build -t easypanel/n8n/hemiph:latest . && \
   docker service update --force --image easypanel/n8n/hemiph:latest n8n_hemiph"
```

---

## EJEMPLO COMPLETO DE FLUJO DE TRABAJO

**Escenario**: Quieres cambiar el título de la página web

### 1. Le pides a Claude Code:
```
"Cambia el título de la página a 'Hemispher-IA - Innovación Social'"
```

### 2. Claude Code hace:
```bash
# Edita src/pages/Index.tsx
# Hace commit
git add .
git commit -m "feat: Actualizar título de la página"
git push origin main
```

### 3. Tú verificas en GitHub:
- Ve a: https://github.com/webhook-ja/HemispherIA_web/commits/main
- Confirma que el commit está ahí

### 4. Despliegas al servidor:
```bash
ssh -i "C:/Users/TRENDING PC/srv750816.key" root@82.29.173.205 << 'ENDSSH'
cd /etc/easypanel/projects/n8n/hemiph/code
git pull origin main
npm run build
docker build -t easypanel/n8n/hemiph:latest .
docker service update --force --image easypanel/n8n/hemiph:latest n8n_hemiph
ENDSSH
```

### 5. Verificas:
- Abres https://hemispher-ia.org
- Ves el nuevo título

---

## SEGURIDAD: REPOSITORIO PRIVADO

### ¿Qué cambia cuando haces el repo privado?

**ANTES (Público):**
- ❌ Cualquiera puede ver tu código
- ❌ Cualquiera puede clonar tu repo
- ❌ Cualquiera puede ver tu historial de commits
- ❌ Aparece en búsquedas de GitHub

**DESPUÉS (Privado):**
- ✅ Solo tú y colaboradores autorizados pueden ver el código
- ✅ Nadie más puede clonar el repo
- ✅ Tu historial de commits es privado
- ✅ No aparece en búsquedas públicas
- ✅ Claude Code SIGUE funcionando normalmente (usa TUS credenciales)

### ¿Qué NO cambia?
- ✅ El sitio web sigue siendo público (hemispher-ia.org)
- ✅ Claude Code puede seguir haciendo cambios
- ✅ Tú puedes seguir haciendo commits/push
- ✅ El servidor puede seguir haciendo git pull (porque usa tu SSH key)

---

## AUTOMATIZACIÓN (Opcional - Avanzado)

Si quieres automatizar el deploy, puedes crear un webhook de GitHub:

1. En GitHub: Settings → Webhooks → Add webhook
2. Payload URL: `https://tu-servidor.com/deploy` (necesitas crear este endpoint)
3. Cuando hagas push a main, GitHub llama a tu endpoint
4. Tu endpoint ejecuta: `git pull && docker build && docker service update`

**Pero esto requiere:**
- Crear un endpoint `/deploy` en tu servidor
- Configurar autenticación segura
- Manejar errores

**Recomendación**: Por ahora, usa deploy manual (más seguro y controlado)

---

## CHECKLIST DE SEGURIDAD

Antes de hacer el repo privado, asegúrate de:

- [ ] No tener credenciales o API keys en el código
- [ ] Archivos `.env` están en `.gitignore`
- [ ] SSH keys NO están en el repo
- [ ] Contraseñas de base de datos NO están en el código
- [ ] Todo está en Git (nada sin guardar)

**En tu caso:**
- ✅ Las credenciales están en variables de entorno en EasyPanel
- ✅ SSH key está solo en tu computadora local
- ✅ `.env` no está versionado
- ✅ Todo guardado en Git

**ESTÁS LISTO PARA HACER EL REPO PRIVADO**

---

## RESUMEN EJECUTIVO

1. **HAZ EL REPO PRIVADO** en GitHub Settings
2. **CLAUDE CODE SEGUIRÁ FUNCIONANDO** sin cambios
3. **FLUJO DE TRABAJO**:
   - Claude Code hace cambios → commit → push a GitHub (privado)
   - Tú haces SSH al servidor
   - `git pull origin main`
   - `docker build` + `docker service update`
   - Web actualizada
4. **SEGURIDAD**: Tu código ahora es privado, pero la web sigue pública

---

## SOPORTE

Si tienes problemas después de hacer el repo privado:
- "Claude, no puedo hacer git pull en el servidor"
- "Claude, el deploy falló con este error: [copiar error]"
- "Claude, quiero automatizar el deploy"

¡Estaré aquí para ayudarte!
