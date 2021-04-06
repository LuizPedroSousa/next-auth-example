import { createContext, Dispatch, SetStateAction } from 'react'

export type userType = {
  _id: number | string
  name: string
  avatar: string
  surname: string
  email: string
}
interface UserContextProps {
  user: userType
  setUser: Dispatch<SetStateAction<userType>>
}

const UserContext = createContext({} as UserContextProps)

export default UserContext
