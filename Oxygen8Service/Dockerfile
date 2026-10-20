# syntax=docker/dockerfile:1
# API de Oxygen (Node.js + Express + MongoDB)

FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# Solo dependencias de producción; bcrypt usa binarios precompilados para glibc
RUN npm ci --omit=dev && npm cache clean --force

FROM node:22-slim
ENV NODE_ENV=production \
    PORT=8000
WORKDIR /app
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json ./
COPY --chown=node:node src ./src
USER node
EXPOSE 8000
CMD ["node", "src/service.js"]
