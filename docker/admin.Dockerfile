FROM node:18.12.1-alpine

ENV NODE_ENV=production

WORKDIR /opt/app
RUN yarn add express
COPY ./apps/admin/src/server.js .
COPY ./dist/apps/admin ./admin

CMD node server.js
