import { Handler } from '@vercel/node'
import { generateJWT } from '../../../../../lib/jwt'
import generatePin from '../../../../../utils/generatePin'
import sendMail from '../../../../../lib/nodemailer'
import moment from 'moment'
import * as Yup from 'yup'
import connectDb from '../../../../../lib/middlewares/connectDb'
import User, { UserProps } from '../../../../../../models/User'
import TemporaryToken, {
  TemporaryTokenProps
} from '../../../../../../models/TemporaryToken'

const handler: Handler = async (req, res) => {
  const {
    body: { email }
  } = req
  const schema = Yup.object().shape({
    email: Yup.string().email().required()
  })

  try {
    await schema.validate({ email }, { abortEarly: false })
    const user: UserProps = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        error: 'User not exists'
      })
    }

    const pin: string = generatePin()
    const { _id }: TemporaryTokenProps = await TemporaryToken.create({
      token: generateJWT({
        payload: { pin, _id: String(user._id) },
        customExpires: 60 * 10
      })
    })

    await sendMail({
      from: process.env.NODEMAILER_AUTH_USER,
      to: email,
      subject: `Olá ${user.name} você recebeu um link mágico!`,
      context: {
        _id,
        name: user.name,
        token: generateJWT({ payload: { pin }, customExpires: 60 * 10 }),
        date: moment().locale('pt-br').format('LLLL')
      },
      template: '/magic_link'
    })
    return res.status(200).json({
      ok: 'Email sends to user with magic link'
    })
  } catch (err) {
    if (err.errors) {
      return res.status(400).json({
        error: 'Unable to resolve this: Invalid data',
        fields: err.errors
      })
    }
    console.log(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export default connectDb(handler)
