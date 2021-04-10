import { VercelResponse } from '@vercel/node'
import { generateJWT, verifyJWTSignature } from '../../../../../lib/jwt'
import withJWT, {
  WithJWTRequest
} from '../../../../../lib/middlewares/auth/withJwt'
import ConnectToDatabase from '../../../../../lib/mongodb'
const handler = async (req: WithJWTRequest, res: VercelResponse) => {
  const {
    body: { uuid },
    decoded: { pin: emailPin, exp: emailExpiration }
  } = req
  const db = await ConnectToDatabase(process.env.MONGODB_URI)
  const temporaryTokensCollection = db.collection('temporary_tokens')
  const userCollection = db.collection('users')

  const temporaryToken = await temporaryTokensCollection.findOne({ _id: uuid })

  if (!temporaryToken) {
    return res.status(400).json({
      error: 'Token not found'
    })
  }

  const {
    decoded: { pin: dbPin, exp: dbExpiration, _id }
  } = await verifyJWTSignature({ token: temporaryToken.token })

  if (emailPin !== dbPin) {
    await temporaryTokensCollection.deleteOne({ _id: uuid })
    return res.status(400).json({
      error: 'Pin is look different'
    })
  }

  if (emailExpiration !== dbExpiration) {
    await temporaryTokensCollection.deleteOne({ _id: uuid })
    return res.status(400).json({
      error: 'expiration time is look different'
    })
  }

  await temporaryTokensCollection.deleteOne({ _id: uuid })
  const user = await userCollection.findOne({ _id })
  return res.status(200).json({
    ok: 'User logged with successfully',
    user,
    token: generateJWT({ payload: { _id }, customExpires: 60 * 60 })
  })
}

export default withJWT(handler)
