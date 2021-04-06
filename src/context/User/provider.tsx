import React, { useState } from 'react'
import UserContext, { userType } from './context'

const { Provider, Consumer: UserConsumer } = UserContext
const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<userType>({} as userType)
  return <Provider value={{ user, setUser }}>{children}</Provider>
}

export { UserProvider, UserConsumer }
