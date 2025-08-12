# Usar una imagen ligera de Node.js
FROM node:18-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias (incluyendo devDependencies para el build)
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# --- Fase de producción ---
FROM node:18-alpine AS production

WORKDIR /app

# Instalar 'serve' para servir archivos estáticos
RUN npm install -g serve

# Copiar solo los archivos estáticos construidos desde la fase anterior
COPY --from=build /app/dist ./dist

# Exponer el puerto 3000
EXPOSE 3000

# Variables de entorno para producción (ajusta según necesites)
ENV NODE_ENV=production

# Comando para servir la aplicación
CMD ["serve", "-s", "dist", "-l", "3000"]