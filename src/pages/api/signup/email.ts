import { VercelRequest, VercelResponse } from '@vercel/node'
import * as Yup from 'yup'
import ConnectToDatabase, { insertOne } from '../../../lib/mongodb'
import { v4 as uuid } from 'uuid'
export default async (req: VercelRequest, res: VercelResponse) => {
  const {
    body: { name, surname, avatar, email }
  } = req

  const db = await ConnectToDatabase(process.env.MONGODB_URI)
  const userCollection = db.collection('users')

  if (await userCollection.findOne({ email })) {
    return res.status(400).json({
      error: 'User already exists'
    })
  }

  const data = {
    _id: uuid(),
    name,
    avatar: avatar || '/icons/default-avatar.svg',
    surname,
    email,
    isLoggedWith: 'Email',
    insertedAt: new Date()
  }

  const schema = Yup.object({
    name: Yup.string().required(),
    surname: Yup.string().required(),
    avatar: Yup.string().required(),
    email: Yup.string().email().required()
  })

  try {
    await schema.validate(data, { abortEarly: false })
    await userCollection.createIndex({ email: 1 }, { unique: true })
    const user = await insertOne(userCollection, data)

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
