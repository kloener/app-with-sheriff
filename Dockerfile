FROM public.ecr.aws/docker/library/node:22-alpine AS installer

# Install dependencies
RUN npm install -g pnpm

# Set working directory
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN export PATH="${PATH}:$(pwd)/node_modules/.bin/"
# RUN ng analytics off

FROM installer AS builder
RUN pnpm build

FROM builder AS serve

# Expose the port the app runs on
EXPOSE 4200
# Start the application
CMD ["pnpm", "start"]
# Healthcheck to ensure the app is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4200/ || exit 1
