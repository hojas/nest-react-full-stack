FROM node:20.10.0-alpine AS builder

WORKDIR /opt/app
COPY package.json pnpm-lock.yaml /opt/app/
RUN corepack enable && pnpm i

COPY . .
RUN cd /opt/app/libs/markdown-viewer && pnpm i && \
    cd /opt/app/libs/markdown-editor && pnpm i && \
    cd /opt/app/libs/axios && pnpm i
RUN pnpm nx build admin --prod


FROM nginx:1.25.3-alpine

WORKDIR /usr/share/nginx/html
COPY --from=builder /opt/app/dist/apps/admin ./admin
COPY nginx.conf /etc/nginx/conf.d/default.conf
