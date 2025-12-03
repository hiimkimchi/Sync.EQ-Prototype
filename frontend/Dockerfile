# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy frontend code
COPY . .

# Build Angular SSR app
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy build output
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --production

EXPOSE 4000

CMD [ "node", "dist/synceq/server/server.mjs"]