FROM node:22-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

FROM base AS install
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=install /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

FROM node:22-alpine AS runner
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/dist ./dist

ENV PORT=0307
EXPOSE 0307

CMD ["sh", "-c", "serve -s dist -l $PORT"]
