/* eslint-disable indent */
import jwt, { Decoded } from 'jsonwebtoken'

interface GenerateTokenProps {
  payload: any
  customExpires?: number | string
}

interface CheckSignature {
  token: string
}

interface CheckSignatureResolveProps<T> {
  decoded: Decoded<T>
}

interface CheckFormattingProps {
  authorization: string | undefined
}

interface CheckFormattingResolveProps {
  token: string
}

interface GetTokenPartsResolveProps {
  parts: string[]
  scheme: string
  token: string
}

export const generateJWT = ({ payload, customExpires }: GenerateTokenProps) => {
  return jwt.sign(payload, getRSAKey('Private'), {
    expiresIn: customExpires || '1h',
    algorithm: 'RS256'
  })
}

export const checkSignature = <T>({
  token
}: CheckSignature): CheckSignatureResolveProps<T> => {
  const { decoded }: any = jwt.verify(
    token,
    getRSAKey('Public'),
    (err: any, decoded: Decoded<T>) => {
      if (err) {
        throw 'Invalid token'
      }
      return { decoded }
    }
  )
  return { decoded }
}

export const checkFormatting = ({
  authorization
}: CheckFormattingProps): CheckFormattingResolveProps => {
  if (!authorization) {
    throw 'No token provided'
  }
  const { parts, scheme, token } = getTokenParts(authorization)

  if (parts.length !== 2) {
    throw 'Token error'
  }
  if (!/^Bearer$/i.test(scheme)) {
    throw 'Token malformated'
  }
  return { token }
}

export const getTokenParts = (
  authorization: string
): GetTokenPartsResolveProps => {
  const parts = authorization.split(' ')
  const [scheme, token] = parts

  return { parts, scheme, token }
}

const getRSAKey = (howKey: 'Public' | 'Private'): string => {
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
