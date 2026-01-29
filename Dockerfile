# Stage 1: Build
FROM node:20-alpine AS builder

# SOLUCIÓN CLAVE: Instalamos la librería de compatibilidad para binarios
RUN apk add --no-cache libc6-compat

WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

COPY package.json package-lock.json ./

# Instalamos dependencias (incluyendo devDependencies)
RUN npm install

COPY . .

# Ahora sí, el build funcionará porque tenemos libc6-compat
RUN npm run build

# Stage 2: Serve (Producción)
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

ENV FRONTEND_PORT=3000
EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]