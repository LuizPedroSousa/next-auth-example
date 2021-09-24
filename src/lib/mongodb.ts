import mongoose from 'mongoose'

export const createConnection = async (uri: string) => {
  await mongoose.connect(uri)
}

export const getConnection = () => {
  const connection = mongoose.connections[0].readyState
  return connection
}
