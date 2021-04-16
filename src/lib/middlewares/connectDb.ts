import { Middleware } from '@vercel/node'
import { createConnection, getConnection } from '../mongodb'

const connectDb: Middleware = handler => {
  return async (req, res) => {
    if (getConnection()) {
      console.log('Using the same cache of db 🔥')
      return handler(req, res)
    }
    await createConnection(process.env.MONGODB_URI)
    return handler(req, res)
  }
}

export default connectDb
