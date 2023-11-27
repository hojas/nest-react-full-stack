# nest-react-blog 

A simple blog system built with Nest, React and Nx.

## .env file

```env
DATABASE_URL="postgresql://nest_blog:nest_blog@localhost:5432/nest_blog?schema=public&connect_timeout=300"
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES=86400s
SHA_SECRET=your_sha_secret_key

VITE_API_BASE_URL=http://localhost:4200/api
WEB_API_BASE_URL=http://localhost:8080/api
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
