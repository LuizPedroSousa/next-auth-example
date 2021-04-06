/* eslint-disable @typescript-eslint/no-extra-semi */
import { VercelRequest, VercelResponse } from '@vercel/node'
import { verifyIfTokenIsFormated, verifyJWTSignature } from './jwt'
interface MiddlewareResolveProps {
  decoded: any
}
export default (req: VercelRequest, res: VercelResponse) => {
  return new Promise<MiddlewareResolveProps>((resolve, reject) => {
    const {
      headers: { authorization }
    } = req

    Promise.resolve(verifyIfTokenIsFormated({ authorization }))
      .then(({ token }) => verifyJWTSignature({ token }))
      .then(decoded => resolve(decoded))
      .catch(error => {
        res.status(400).json({ error })
        return reject
      })
  })
}
