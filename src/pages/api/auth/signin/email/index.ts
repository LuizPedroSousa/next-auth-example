import { Handler } from '@vercel/node'
import TemporaryToken, {
  TemporaryTokenProps
} from '../../../../../../models/TemporaryToken'
import User, { UserProps } from '../../../../../../models/User'
import { generateJWT, checkSignature } from '../../../../../lib/jwt'
import withJWT, {
  WithJWTRequest
} from '../../../../../lib/middlewares/auth/withJwt'
import connectDb from '../../../../../lib/middlewares/connectDb'

interface EmailDecoded {
  pin: string
}

interface DbDecoded extends EmailDecoded {
  _id: string
}

const handler: Handler<WithJWTRequest<EmailDecoded>> = async (req, res) => {
  const {
    body: { uuid },
    decoded: { pin: emailPin, exp: emailExpiration }
  } = req
  const temporaryToken: TemporaryTokenProps = await TemporaryToken.findOne({
    _id: uuid
  })

  if (!temporaryToken) {
    return res.status(400).json({
      error: 'Token not found'
    })
  }

  const {
    decoded: { pin: dbPin, exp: dbExpiration, _id }
  } = checkSignature<DbDecoded>({ token: temporaryToken.token })
  if (emailPin !== dbPin) {
    await TemporaryToken.deleteOne({ _id: uuid })
    return res.status(400).json({
      error: 'Pin is look different'
    })
  }

  if (emailExpiration !== dbExpiration) {
    await TemporaryToken.deleteOne({ _id: uuid })
    return res.status(400).json({
      error: 'expiration time is look different'
    })
  }
  await TemporaryToken.deleteOne({ _id: uuid })

  const user: UserProps = await User.findOne({ _id })
  return res.status(200).json({
    ok: 'User logged with successfully',
    user,
    token: generateJWT({ payload: { _id }, customExpires: 60 * 60 })
  })
}

export default withJWT(connectDb(handler))
