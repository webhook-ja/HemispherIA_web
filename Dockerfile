# Etapa de build
FROM node:18-alpine AS build

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar el resto del código
COPY . .

# Build de la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos build al servidor nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx si existe
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer puerto
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]