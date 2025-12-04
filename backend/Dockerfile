# Use Node.js 20 LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy backend files
COPY . .

# Build TypeScript if needed (adjust if you already compile locally)
RUN npm run build

# Expose port (match your Express port)
EXPOSE 3000

# Start the server
CMD ["node", "dist/server.js"]
