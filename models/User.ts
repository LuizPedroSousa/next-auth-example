import { Schema, Document, models, model, Model } from 'mongoose'
import { v4 as uuid } from 'uuid'
export interface UserProps extends Document {
  _id: string | number
  name: string
  surname: string
  avatar: string
  email: string
  isLoggedWith: string
  insertedAt: Date
}

const userSchema = new Schema<UserProps>({
  _id: {
    type: String
  },
  avatar: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  isLoggedWith: {
    type: String,
    required: true
  },
  insertedAt: {
    type: Date,
    default: new Date(),
    required: true
  }
})

userSchema.pre('save', function (next) {
  if (!this._id) {
    this._id = uuid()
  }
  next()
})
const User: Model<UserProps> = models.User || model('User', userSchema)

export default User
