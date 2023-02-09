# NxBlog

A simple blog system built with Nest, React and Nx.

## .env file

```env
DATABASE_URL="postgresql://nx_blog:nx_blog@db:5432/nx_blog?schema=public&connect_timeout=300"
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES=86400s
SHA_SECRET=your_sha_secret_key
NX_AXIOS_BASE_URL=/api
```

## Development

Install:

```shell
$ pnpm install
$ pnpm run prisma:generate
```

Run server:

```shell
$ pnpm nx serve server
```

Run admin:

```shell
$ pnpm nx serve admin
```

Run web:

```shell
$ pnpm nx serve web
```

## Build docker images

```shell
# server app
$ pnpm nx build server --prod
$ make server

# web app
$ pnpm nx build web --prod
$ make web

# admin app
$ pnpm nx build admin --prod
$ make admin
```
