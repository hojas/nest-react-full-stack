FROM node:18.12.1-alpine

ENV NODE_ENV=production

WORKDIR /opt/app
COPY ./dist/apps/web/package.json .
RUN yarn && yarn add @nrwl/next
COPY ./dist/apps/web .

CMD yarn start
