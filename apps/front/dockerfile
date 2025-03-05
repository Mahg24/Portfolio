# Etapa 1: Construcción de la aplicación
FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps                   
COPY . .
RUN npm run build

# Etapa 2: Servidor de producción con Next.js
FROM node:18
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start"]
