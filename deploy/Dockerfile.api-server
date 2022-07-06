FROM --platform=linux/amd64 node:16.15.1-alpine

WORKDIR /opt/app

RUN mkdir ./prisma
COPY ../prisma ./prisma
COPY ../dist/apps/api-server .

COPY ../package.json .
COPY ../pnpm-lock.yaml .
RUN corepack enable && pnpm i --production && pnpm i prisma && pnpm prisma:generate

CMD node ./main.js
