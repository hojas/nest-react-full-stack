#!/bin/sh

# turn on bash's job control
set -m

pnpm run prisma:migrate
node main.js
