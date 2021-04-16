import { Schema, Document, Model, model, models } from 'mongoose'
import { v4 as uuid } from 'uuid'
export interface TemporaryTokenProps extends Document {
  _id: string
  token: string
  insertedAt: string
}
const temporaryTokenSchema = new Schema({
  _id: {
    type: String
  },
  token: {
    type: String,
    required: true
  },
  insertedAt: {
    type: Date,
    default: new Date()
  }
})

temporaryTokenSchema.pre('save', function (next) {
  if (!this._id) {
    this._id = uuid()
  }
  next()
})

const TemporaryToken: Model<TemporaryTokenProps> =
  models.TemporaryToken || model('TemporaryToken', temporaryTokenSchema)
export default TemporaryToken
