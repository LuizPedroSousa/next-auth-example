import { createContext } from 'react'
interface RegisterFormContextProps {
  onOpen: () => void
  onClose: () => void
  isOpen: boolean
  hasTryToRegister: boolean | undefined
}
const RegisterFormContext = createContext({} as RegisterFormContextProps)

export default RegisterFormContext
