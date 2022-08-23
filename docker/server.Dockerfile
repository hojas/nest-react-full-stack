FROM --platform=linux/amd64 node:16.17.0-alpine

ENV NODE_ENV=production

WORKDIR /opt/app
COPY package.json pnpm-lock.yaml .npmrc ./docker/server-entrypoint.sh ./
RUN corepack enable && pnpm i --prod && mkdir ./prisma
COPY ./prisma ./prisma
COPY ./dist/apps/server .

RUN pnpm prisma:generate

CMD ./server-entrypoint.sh
