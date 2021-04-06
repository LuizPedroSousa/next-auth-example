import { VercelRequest } from '@vercel/node'
import { CookieOptions, Handler, withIronSession } from 'next-iron-session'

export interface SessionRequest extends VercelRequest {
  session: {
    get(key: string): any
    set(key: string, value: any, options?: CookieOptions): void
    save(): Promise<void>
    destroy(): void
  }
}

export default function withSession(handler: Handler) {
  return withIronSession(handler, {
    password: process.env.SESSION_PASSWORD,
    cookieName: 'token'
  })
}
