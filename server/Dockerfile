FROM node:20.12.2-alpine

WORKDIR /opt/app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm i

COPY . .
RUN pnpm prisma:generate && pnpm build

CMD pnpm prisma:migrate && pnpm start
