import { VercelRequest, VercelResponse } from '@vercel/node'
import { generateJWT } from '../../../../../lib/jwt'
import ConnectToDatabase, { insertOne } from '../../../../../lib/mongodb'
import generatePin from '../../../../../utils/generatePin'
import { v4 as uuid } from 'uuid'
import sendMail from '../../../../../lib/nodemailer'
import moment from 'moment'
import * as Yup from 'yup'
export default async (req: VercelRequest, res: VercelResponse) => {
  const {
    body: { email }
  } = req
  const db = await ConnectToDatabase(process.env.MONGODB_URI)
  const userCollection = db.collection('users')
  const temporaryTokensCollection = db.collection('temporary_tokens')

  const schema = Yup.object().shape({
    email: Yup.string().email().required()
  })
  try {
    await schema.validate({ email }, { abortEarly: false })
    const user = await userCollection.findOne({ email })
    if (!user) {
      return res.status(400).json({
        error: 'User not exists'
      })
    }

    const pin = generatePin()
    const { _id } = await insertOne(temporaryTokensCollection, {
      _id: uuid(),
      token: generateJWT({
        payload: { pin, _id: String(user._id) },
        customExpires: 60 * 10
      }),
      createdAt: new Date()
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
  }
}
