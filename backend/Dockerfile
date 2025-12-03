# --------- 1. Build Stage ---------
FROM node:20-alpine AS build

WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install all dependencies (including dev, for tsc)
RUN npm install

# Copy the rest of your backend app
COPY . .

# Build TypeScript → dist/
RUN npm run build


# --------- 2. Runtime Stage ---------
FROM node:20-alpine AS production

WORKDIR /app

# Only install production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy compiled JS from the build stage
COPY --from=build /app/dist ./dist

# Expose your backend port (change if not 3000)
EXPOSE 3000

# Start the server
CMD ["node", "dist/server.js"]
