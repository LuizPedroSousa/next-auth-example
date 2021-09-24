import { Handler } from '@vercel/node'
import { generateJWT } from 'lib/jwt'
import * as Yup from 'yup'
import { withGithub, WithGithubRequest } from 'lib/middlewares/auth/withGithub'
import connectDb from 'lib/middlewares/connectDb'
import User, { UserProps } from '../../../../../models/User'

const handler: Handler<WithGithubRequest> = async (req, res) => {
  const {
    decoded: { _id, avatar, name }
  } = req

  let user: UserProps = await User.findOne({ _id })
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
      user = await User.create(data)
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

export default withGithub(connectDb(handler))
