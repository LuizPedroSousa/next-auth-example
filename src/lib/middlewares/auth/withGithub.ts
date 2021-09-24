/* eslint-disable @typescript-eslint/no-extra-semi */
import { Middleware } from '@vercel/node'
import axios from 'axios'
import { checkFormatting } from '../../jwt'

export interface WithGithubRequest {
  decoded: GetUserResolveProps
}

interface CheckGithubTokenProps {
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

const checkGithubToken = async ({
  token
}: CheckGithubTokenProps): Promise<void> => {
  try {
    return await axios.post(
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
  } catch {
    throw 'Bad token request'
  }
}

const getUser = async ({
  authorization
}: GetUserProps): Promise<GetUserResolveProps> => {
  try {
    const { data } = await axios.get('https://api.github.com/user', {
      headers: { authorization }
    })
    return { _id: data.id, name: data.name, avatar: data.avatar_url }
  } catch {
    throw 'Failed to get github user'
  }
}
const withGithub: Middleware<WithGithubRequest> = handler => {
  return async (req, res) => {
    try {
      const {
        headers: { authorization }
      } = req
      const { token } = checkFormatting({ authorization })
      await checkGithubToken({ token })
      const userProps = await getUser({ authorization })
      req.decoded = userProps
      return handler(req, res)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}

export { withGithub }
