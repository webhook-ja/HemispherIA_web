# HemispherIA Website

Una plataforma profesional para HemispherIA que conecta conocimiento, talento y tecnología para un futuro sostenible en América Latina y el Caribe.

## Características

- Diseño responsive y moderno
- Animaciones sutiles para una experiencia de usuario mejorada
- Efectos de sonido interactivos
- Componentes reutilizables
- Optimizado para SEO
- Compatible con EasyPanel deployment

## Despliegue en EasyPanel

### Prerrequisitos

1. Cuenta en GitHub
2. Cuenta en EasyPanel (https://easypanel.io)
3. Acceso al repositorio

### Pasos para el despliegue

1. **Fork o clona este repositorio**
   ```bash
   git clone https://github.com/tu-usuario/hemispheria-website.git
   ```

2. **Configura el proyecto en EasyPanel**
   - Ingresa a tu panel de EasyPanel
   - Crea un nuevo proyecto
   - Selecciona "Static Site"
   - Conecta tu repositorio de GitHub
   - Configura las variables de entorno si es necesario
   - Establece el directorio de salida como `dist`

3. **Configuración de build**
   El comando de build está configurado en `package.json`:
   ```bash
   npm run build
   ```

4. **Despliegue automático**
   - EasyPanel se encargará de hacer build y deploy automáticamente en cada push a la rama principal
   - Puedes configurar despliegues en ramas específicas si lo deseas

## Despliegue con Docker en EasyPanel

La aplicación también puede publicarse mediante una imagen Docker, útil si prefieres controlar el runtime o reutilizar la misma imagen en varios entornos.

1. **Construye la imagen localmente (opcional)**
   ```bash
   docker build -t tu-usuario/hemispheria:latest .
   ```

2. **Sube la imagen a tu registro**
   ```bash
   docker push tu-usuario/hemispheria:latest
   ```

3. **En EasyPanel**
   - Crea un nuevo proyecto y elige la opción **Docker Image**
   - Indica la URL de la imagen (por ejemplo, `tu-usuario/hemispheria:latest`)
   - Define la variable de entorno `PORT=80` si EasyPanel lo requiere
   - No necesitas comandos adicionales: la imagen ya expone el puerto 80 y ejecuta nginx con la SPA

> El archivo `Dockerfile` utiliza una build multi-stage para compilar la aplicación con Node.js y servirla con nginx usando la configuración incluida en `nginx.conf`.

## Desarrollo local

### Prerrequisitos

- Node.js >= 16
- npm o yarn

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para producción

```bash
npm run build
```

## Estructura del proyecto

```
src/
├── components/          # Componentes reutilizables
├── hooks/               # Hooks personalizados
├── lib/                 # Utilidades y librerías
├── pages/               # Páginas principales
├── App.tsx              # Componente principal
├── main.tsx             # Punto de entrada
└── globals.css          # Estilos globales
```

## Futuras mejoras planificadas

### Panel de administración
- Sistema de autenticación
- Dashboard con estadísticas
- Gestor de contenido (CMS)
- Sistema de comentarios y moderación

### Funcionalidades avanzadas
- Integración con bases de datos
- Sistema de análisis y métricas
- Formularios de contacto con almacenamiento
- Gestión de multimedia (imágenes, videos)
- Blog con sistema de publicación

### API y servicios
- Endpoints para estadísticas en tiempo real
- Integración con servicios de correo
- Conexión con redes sociales
- API para consumo de datos

## Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Realiza tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Desarrollo futuro

Este proyecto está diseñado para ser extensible. Las áreas clave para futuras mejoras incluyen:

1. **Panel de control administrativo**
   - Autenticación de usuarios
   - Dashboard con métricas
   - Gestor de contenido
   - Sistema de comentarios

2. **Integración de contenido multimedia**
   - Gestor de imágenes y videos
   - Optimización automática de assets
   - CDN para entrega rápida

3. **Sistema de análisis**
   - Seguimiento de usuarios
   - Métricas de engagement
   - Reportes personalizados

4. **Funcionalidades sociales**
   - Sistema de comentarios
   - Compartir en redes sociales
   - Notificaciones

Para implementar estas características, se pueden integrar servicios como:
- Supabase (backend como servicio)
- Cloudinary (gestión de multimedia)
- Plausible o Google Analytics (análisis)
- EmailJS o similar (formularios de contacto)

## Licencia

Este proyecto es privado y propiedad de HemispherIA.

## Contacto

Para soporte técnico o preguntas sobre el desarrollo: [tu-email@dominio.com]