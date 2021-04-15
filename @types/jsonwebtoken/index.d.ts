import 'jsonwebtoken'

interface DefaultDecodedProps {
  exp: number
  iat: number
}

type DecodedType<T extends DefaultDecodedProps> = T & DefaultDecodedProps

declare module 'jsonwebtoken' {
  export type Decoded<T> = DecodedType<T>
}
