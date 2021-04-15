import { VercelRequest, VercelResponse } from '@vercel/node'

type MiddlewareRequest<T extends VercelRequest> = T & VercelRequest
declare module '@vercel/node' {
  export type Handler<T = {}> = (
    req: MiddlewareRequest<T>,
    res: VercelResponse
  ) => void
  export type Middleware<T = {}> = (
    handler: Handler
  ) => (req: MiddlewareRequest<T>, res: VercelResponse) => Promise<void | any>
}
