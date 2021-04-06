/* eslint-disable @typescript-eslint/no-extra-semi */
import { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'
import { verifyIfTokenIsFormated } from './jwt'

interface ResolveProps {
  _id: number
  name: string
  avatar: string
}

interface VerifyGithubTokenProps {
  token: string
}

interface GetUserProps {
  authorization: string
}
export default (req: VercelRequest, res: VercelResponse) => {
  return new Promise<ResolveProps>((resolve, reject) => {
    const {
      headers: { authorization }
    } = req

    Promise.resolve(verifyIfTokenIsFormated({ authorization }))
      .then(token => verifyGithubToken(token))
      .then(() => getUser({ authorization }))
      .then(userProps => resolve(userProps))
      .catch(error => {
        res.status(400).json({ error })
        return reject
      })
  })
}

const verifyGithubToken = ({ token }: VerifyGithubTokenProps) => {
  return new Promise<void>((resolve, reject) => {
    axios
      .post(
        `https://api.github.com/applications/${process.env.GITHUB_CLIENT_ID}/token`,
        {
          access_token: token
        },
        {
          auth: {
            username: process.env.GITHUB_CLIENT_ID,
            password: process.env.GITHUB_CLIENT_SECRET
          }
        }
      )
      .then(() => resolve())
      .catch(() => reject('Bad token request'))
  })
}

const getUser = ({ authorization }: GetUserProps) => {
  return new Promise<ResolveProps>((resolve, reject) => {
    axios
      .get('https://api.github.com/user', {
        headers: { authorization }
      })
      .then(({ data }) =>
        resolve({ _id: data.id, name: data.name, avatar: data.avatar_url })
      )
      .catch(() => reject('Failed to get github user'))
  })
}
