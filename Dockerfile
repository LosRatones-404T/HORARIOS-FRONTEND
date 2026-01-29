# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# --- CAPTURA DE VARIABLES DE ENTORNO ---
# Recibimos la variable desde el docker-compose (build args)
ARG VITE_API_URL
# La establecemos como variable de entorno para que Vite la use al compilar
ENV VITE_API_URL=${VITE_API_URL}

# Copiar dependencias
COPY package.json package-lock.json ./
RUN npm ci

# Copiar código y construir
COPY . .
# En este paso, Vite reemplaza 'import.meta.env.VITE_API_URL' por el valor real
RUN npm run build

# Stage 2: Serve (Producción)
FROM node:20-alpine

WORKDIR /app

# Instalar servidor estático ligero
RUN npm install -g serve

# Copiar solo los archivos compilados del paso anterior
COPY --from=builder /app/dist ./dist

# --- AJUSTE DE PUERTO ESPEJO ---
# Cambiamos 8100 por 3000 para consistencia total con el Docker Compose
ENV FRONTEND_PORT=3000

# Exponer el puerto
EXPOSE 3000

# Comando de inicio
# -s: Single Page App (redirige todo a index.html)
# -l: Puerto de escucha
CMD ["sh", "-c", "serve -s dist -l 3000"]