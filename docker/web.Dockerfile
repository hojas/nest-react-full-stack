FROM --platform=linux/amd64 node:16.17.0-alpine

ENV NODE_ENV=production

WORKDIR /opt/app
COPY ./dist/apps/web/package.json .
RUN yarn && yarn add @nrwl/next
COPY ./dist/apps/web .

CMD yarn start
