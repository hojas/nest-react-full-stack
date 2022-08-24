FROM --platform=linux/amd64 node:16.17.0-alpine

ENV NODE_ENV=production

WORKDIR /opt/app
RUN mkdir admin && yarn add express
COPY ./apps/admin/src/server.js .
COPY ./dist/apps/admin ./admin

CMD node server.js
