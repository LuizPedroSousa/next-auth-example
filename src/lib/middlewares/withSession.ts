import { IncomingMessage } from 'http'
import { GetServerSidePropsContext } from 'next'
import { SessionOptions, withIronSession } from 'next-iron-session'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'
import { ParsedUrlQuery } from 'querystring'

export type SessionRequest = {
  session: {
    get(key: string): any
    set(key: string, value: any, options?: SessionOptions): void
    save(): Promise<void>
    destroy(): void
  }
}

export interface SessionGetServerSidePropsContext<Q extends ParsedUrlQuery>
  extends GetServerSidePropsContext<Q> {
  req: IncomingMessage & { cookies: NextApiRequestCookies } & SessionRequest
}

export type SessionGetServerSideProps<
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = (context: SessionGetServerSidePropsContext<Q>) => Promise<any>

export default function withSession<Q extends ParsedUrlQuery>(
  handler: SessionGetServerSideProps<Q>
) {
  return withIronSession(handler, {
    password: process.env.SESSION_PASSWORD,
    cookieName: 'token'
  })
}
