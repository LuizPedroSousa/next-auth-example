/* eslint-disable @typescript-eslint/no-extra-semi */
import { VercelRequest, VercelResponse } from '@vercel/node'
import { verifyIfTokenIsFormated, verifyJWTSignature } from '../../jwt'
export interface WithJWTRequest extends VercelRequest {
  decoded: any
}
type WithJWTHandler = (req: WithJWTRequest, res: VercelResponse) => any

export default function withJWT(handler: WithJWTHandler) {
  return async (req: WithJWTRequest, res: VercelResponse) => {
    const {
      headers: { authorization }
    } = req

    try {
      const { token } = await verifyIfTokenIsFormated({ authorization })
      const { decoded } = await verifyJWTSignature({ token })
      req.decoded = decoded
      return handler(req, res)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}
