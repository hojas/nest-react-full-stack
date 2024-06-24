FROM node:20.15.0-alpine AS builder

WORKDIR /opt/app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install

COPY . .
RUN pnpm build

CMD pnpm start
