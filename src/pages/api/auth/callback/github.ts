import { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'
export default async (req: VercelRequest, res: VercelResponse) => {
  const { code } = req.body
  try {
    const { data } = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      }
    )
    if (/bad_verification_code/g.test(data)) {
      return res.status(400).json({
        error: 'Github code expires'
      })
    }
    const token = data.split('=')[1].split('&')[0]
    return res.status(200).json({ token })
  } catch ({ response }) {
    if (response) {
      return res.status(500).json({ ...response.data })
    }

    return res.status(500).json({ error: 'Internal server error' })
  }
}
