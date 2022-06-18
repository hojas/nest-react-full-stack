FROM --platform=linux/amd64 node:16.15.1-alpine

WORKDIR /opt/app
COPY ./dist/apps/frontend .
RUN yarn

CMD yarn start
