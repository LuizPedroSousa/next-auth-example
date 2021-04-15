/* eslint-disable @typescript-eslint/no-extra-semi */
import { Middleware } from '@vercel/node'
import { Decoded } from 'jsonwebtoken'
import { checkFormatting, checkSignature } from '../../jwt'

export interface WithJWTRequest<T = {}> {
  decoded: Decoded<T>
}

const withJWT: Middleware<WithJWTRequest> = handler => {
  return async (req, res) => {
    const {
      headers: { authorization }
    } = req

    try {
      const { token } = checkFormatting({ authorization })
      const { decoded } = checkSignature({ token })
      req.decoded = decoded
      return handler(req, res)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}

export default withJWT
