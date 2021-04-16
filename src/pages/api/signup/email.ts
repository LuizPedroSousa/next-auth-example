import { Handler } from '@vercel/node'
import * as Yup from 'yup'
import connectDb from '../../../lib/middlewares/connectDb'
import User, { UserProps } from '../../../../models/User'

const handler: Handler = async (req, res) => {
  const {
    body: { name, surname, avatar, email }
  } = req

  if (await User.findOne({ email })) {
    return res.status(400).json({
      error: 'User already exists'
    })
  }

  const data = {
    name,
    avatar: avatar || '/icons/default-avatar.svg',
    surname,
    email,
    isLoggedWith: 'Email'
  }

  const schema = Yup.object({
    name: Yup.string().required(),
    surname: Yup.string().required(),
    avatar: Yup.string().required(),
    email: Yup.string().email().required()
  })

  try {
    await schema.validate(data, { abortEarly: false })
    const user: UserProps = await User.create(data)

    return res.status(201).json({
      ok: 'User created with successfully',
      user
    })
  } catch (err) {
    if (err.errors) {
      return res.status(400).json({
        error: 'Unable to resolve this: Invalid data',
        fields: err.errors
      })
    }
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
}

export default connectDb(handler)
