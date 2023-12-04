FROM node:20.10.0-alpine AS builder

WORKDIR /opt/app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install
COPY . .
RUN pnpm run prisma:generate && pnpm nx build server --prod


FROM node:20.10.0-alpine

WORKDIR /opt/app
RUN corepack enable
COPY . .
COPY --from=builder /opt/app/node_modules ./node_modules
COPY --from=builder /opt/app/dist/apps/server ./dist/apps/server

CMD pnpm run prisma:migrate && node dist/apps/server/main.js
