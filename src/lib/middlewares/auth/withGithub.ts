/* eslint-disable @typescript-eslint/no-extra-semi */
import { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'
import { verifyIfTokenIsFormated } from '../../jwt'

export interface WithGithubRequest extends VercelRequest {
  decoded: GetUserResolveProps
}

interface VerifyGithubTokenProps {
  token: string
}

interface GetUserResolveProps {
  _id: number
  name: string
  avatar: string
}

interface GetUserProps {
  authorization: string
}

type WithGithubHandler = (req: WithGithubRequest, res: VercelResponse) => any

export default function withGithub(handler: WithGithubHandler) {
  return async (req: WithGithubRequest, res: VercelResponse) => {
    try {
      const {
        headers: { authorization }
      } = req
      const { token } = await verifyIfTokenIsFormated({ authorization })
      await verifyGithubToken({ token })
      const userProps = await getUser({ authorization })
      req.decoded = userProps
      return handler(req, res)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
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
  return new Promise<GetUserResolveProps>((resolve, reject) => {
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
