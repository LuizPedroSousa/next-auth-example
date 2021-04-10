import { VercelResponse } from '@vercel/node'
import { generateJWT } from '../../../../lib/jwt'
import ConnectToDatabase, { insertOne } from '../../../../lib/mongodb'
import * as Yup from 'yup'
import withGithub, {
  WithGithubRequest
} from '../../../../lib/middlewares/auth/withGithub'

const handler = async (req: WithGithubRequest, res: VercelResponse) => {
  const {
    decoded: { _id, avatar, name }
  } = req

  const db = await ConnectToDatabase(process.env.MONGODB_URI)
  const collection = db.collection('users')

  let user = await collection.findOne({ _id })
  let statusCode = 200
  if (!user) {
    const data = {
      _id,
      avatar,
      name,
      surname: '-',
      email: '-',
      isLoggedWith: 'Github',
      insertedAt: new Date()
    }
    const schema = Yup.object().shape({
      _id: Yup.number().required(),
      avatar: Yup.string().required(),
      name: Yup.string().required(),
      surname: Yup.string().required(),
      email: Yup.string().required(),
      isLoggedWith: Yup.string().required(),
      insertedAt: Yup.date().required()
    })
    try {
      await schema.validate(data, { abortEarly: false })
      user = await insertOne(collection, data)
      statusCode = 201
    } catch (err) {
      if (err.errors) {
        return res.status(400).json({
          error: 'Invalid data',
          fields: err.errors
        })
      }
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  return res.status(statusCode).json({
    ok: 'User logged with successfully',
    user,
    token: generateJWT({ payload: { _id } })
  })
}

export default withGithub(handler)
