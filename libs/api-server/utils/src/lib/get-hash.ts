import { createHmac } from 'crypto'

export const getHash = (password: string) =>
  createHmac('sha256', process.env.SHA_SECRET).update(password).digest('hex')
