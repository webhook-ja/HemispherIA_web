# syntax=docker/dockerfile:1

# Build stage - compile frontend
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install all dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY . .

# Build the frontend
RUN npm run build

# Production stage - Node.js server
FROM node:20-alpine AS production
WORKDIR /app

# Set environment
ENV NODE_ENV=production
ENV PORT=80

# Copy package files
COPY package.json package-lock.json* ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy server code
COPY server ./server

# Copy built frontend from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 80

# Start the server
CMD ["node", "server/index.js"]
