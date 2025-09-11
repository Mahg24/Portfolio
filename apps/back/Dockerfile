FROM public.ecr.aws/docker/library/node:20-alpine
WORKDIR /app

# Habilitar corepack para usar pnpm administrado por Node
ARG PNPM_VERSION=9.12.1
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Instalar dependencias
COPY package.json pnpm-lock.yaml ./
RUN pnpm --version && pnpm install --no-frozen-lockfile

# Copiar configuración y código fuente
COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src

# Construir la aplicación NestJS
RUN pnpm build

# Copiar templates de Handlebars al directorio de salida
COPY src/common/templates ./dist/common/templates


FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Crear usuario no root
RUN addgroup -S nodejs && adduser -S nodeuser -G nodejs

# Habilitar corepack para pnpm en runtime
ARG PNPM_VERSION=9.12.1
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
COPY package.json pnpm-lock.yaml ./

# Copiar dependencias ya instaladas y podarlas a producción
COPY --from=builder /app/node_modules ./node_modules
RUN pnpm prune --prod

# Copiar artefactos construidos
COPY --from=builder /app/dist ./dist

# Puerto por defecto de NestJS
EXPOSE 3000

# Comando de inicio
CMD ["node", "dist/main"]


