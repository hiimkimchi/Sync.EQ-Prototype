# --- Build stage ---
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build Angular SSR (browser + server)
RUN npm run build:ssr

# --- Runtime stage ---
FROM node:18-slim
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist

EXPOSE 4000
CMD ["node", "dist/synceq/server/server.mjs"]
