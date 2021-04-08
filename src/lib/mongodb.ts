import {
  Collection,
  CollectionInsertOneOptions,
  Db,
  MongoClient
} from 'mongodb'

let cachedDb: Db = null
export default async function ConnectToDatabase(uri: string) {
  if (cachedDb) {
    console.log('Using the same cache of db 🔥')
    return cachedDb
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const dbName = new URL(uri).pathname.substr(1)

  const db = client.db(dbName)

  cachedDb = db
  return cachedDb
}

export async function insertOne(
  collection: Collection,
  data: any,
  options?: CollectionInsertOneOptions
) {
  try {
    const { ops } = await collection.insertOne(data, options)
    return { ...ops[0] }
  } catch {
    throw new Error('Failed to insert data')
  }
}
