# Use the official Node.js image as the base image
FROM node:18 AS base


# Install dependencies
FROM base as deps

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install


# Hot-reloading during development
FROM base as dev

# Set the working directory
WORKDIR /app

# Copy the dependencies from the deps image
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application code to the working directory
COPY . .
COPY next.config.mjs ./next.config.mjs

# DO NOT build next.js app when building docker image. 
# source: https://github.com/vercel/next.js/discussions/29428#discussioncomment-1419341


# Rebuild the source code only when needed
FROM base AS builder

# Set the working directory
WORKDIR /app

# Copy the dependencies from the deps image
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application code to the working directory
COPY . .
COPY next.config.mjs ./next.config.mjs

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build


# Production image, copy all the files and run next
FROM base AS runner

# Set the working directory
WORKDIR /app

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

CMD ["node", "server.js"]