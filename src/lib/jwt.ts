/* eslint-disable indent */
import jwt from 'jsonwebtoken'

interface GenerateTokenProps {
  payload: any
  customExpires?: number | string
}
interface VerifyTokenProps {
  token: string
}

interface VerifyJWTSignatureResolveProps {
  decoded: any
}

interface VerifyIfTokenIsFormatedProps {
  authorization: string | undefined
}

interface VerifyIfTokenIsFormatedResolveProps {
  token: string
}

export const generateJWT = ({ payload, customExpires }: GenerateTokenProps) => {
  return jwt.sign(payload, getRSAKey('Private'), {
    expiresIn: customExpires || '1h',
    algorithm: 'RS256'
  })
}

export const verifyJWTSignature = ({ token }: VerifyTokenProps) => {
  return new Promise<VerifyJWTSignatureResolveProps>((resolve, reject) => {
    jwt.verify(token, getRSAKey('Public'), (err: any, decoded: any) => {
      if (err) {
        return reject('Invalid token')
      }
      return resolve({ decoded })
    })
  })
}

export const verifyIfTokenIsFormated = ({
  authorization
}: VerifyIfTokenIsFormatedProps) => {
  return new Promise<VerifyIfTokenIsFormatedResolveProps>((resolve, reject) => {
    if (!authorization) {
      return reject('No token provided')
    }

    const { parts, scheme, token } = getTokenParts(authorization)

    if (parts.length !== 2) {
      return reject('Token error')
    }
    if (!/^Bearer$/i.test(scheme)) {
      return reject('Token malformated')
    }
    return resolve({ token })
  })
}

export const getTokenParts = (authorization: string) => {
  const parts = authorization.split(' ')
  const [scheme, token] = parts

  return { parts, scheme, token }
}

const getRSAKey = (howKey: 'Public' | 'Private') => {
  const formatRsaKey = (keyToFormat: string | undefined) => {
    return JSON.parse(JSON.stringify(keyToFormat?.replace(/\\n/g, '\n')))
  }

  if (howKey === 'Private') {
    return formatRsaKey(process.env.PRIVATE_KEY)
  }
  if (howKey === 'Public') {
    return formatRsaKey(process.env.PUBLIC_KEY)
  }
}
