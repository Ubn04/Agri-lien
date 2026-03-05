# Dockerfile pour Agri-Lien - Application Next.js avec PostgreSQL
# Optimisé pour Render.com

# Stage 1: Dépendances et build
FROM node:18-alpine AS builder

# Installer les dépendances système nécessaires pour PostgreSQL
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    postgresql-dev \
    libc6-compat

WORKDIR /app

# Copier les fichiers de configuration des dépendances
COPY package.json package-lock.json* ./

# Installer les dépendances
RUN npm ci --only=production --legacy-peer-deps && npm cache clean --force

# Copier le code source
COPY . .

# Construire l'application Next.js
RUN npm run build

# Stage 2: Production
FROM node:18-alpine AS runner

# Installer les dépendances runtime PostgreSQL
RUN apk add --no-cache \
    postgresql-client \
    && addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

WORKDIR /app

# Copier les fichiers de production depuis le stage builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copier les fichiers de configuration nécessaires
COPY --from=builder /app/database ./database
COPY --from=builder /app/scripts ./scripts

# Changer la propriété des fichiers
RUN chown -R nextjs:nodejs /app
USER nextjs

# Exposer le port
EXPOSE 3000

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Commande de démarrage
CMD ["node", "server.js"]