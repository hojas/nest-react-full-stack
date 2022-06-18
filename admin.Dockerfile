FROM --platform=linux/amd64 node:16.15.1-alpine

WORKDIR /opt/app/admin
COPY ./dist/apps/admin .

# TODO: 静态资源加上 /admin/ 前缀

RUN yarn global add serve
WORKDIR /opt/app

CMD serve -p 3001 .
