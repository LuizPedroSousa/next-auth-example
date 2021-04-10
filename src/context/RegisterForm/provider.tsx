import React, { useContext, useState } from 'react'
import { Formik } from 'formik'
import { useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import RegisterFormContext from './context'
import UserContext from '../User/context'
const { Provider } = RegisterFormContext
export interface RegisterFormInitialValues {
  name: string
  surname: string
  email: string
  avatar: string
  avatarModalPreview: string
}
const RegisterFormProvider: React.FC = ({ children }) => {
  const [hasTryToRegister, setHasTryToRegister] = useState<
    boolean | undefined
  >()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { setUser, user } = useContext(UserContext)
  const toast = useToast()
  const Router = useRouter()

  const initialValues = {
    name: '',
    surname: '',
    email: '',
    avatar: '/icons/default-avatar.svg',
    avatarModalPreview: '/icons/default-avatar.svg'
  } as RegisterFormInitialValues

  const onSubmit = async (values: RegisterFormInitialValues) => {
    setHasTryToRegister(true)
    delete values.avatarModalPreview
    setUser({ email: values.email, ...user })
    try {
      await axios.post('/api/signup/email', { ...values })
      toast({
        title: 'Usuário criado com sucesso 🎉',
        description: 'redirecionando você para página de login',
        duration: 6000,
        isClosable: true,
        status: 'success',
        position: 'top-right'
      })
      return Router.push('/login')
    } catch ({ response }) {
      if (response.data.error === 'User already exists') {
        toast({
          title: 'Falha ao cadastrar',
          description: 'Usuário existente',
          duration: 6000,
          isClosable: true,
          status: 'error',
          position: 'top-right'
        })
        setHasTryToRegister(false)
        return Router.push('/login')
      }
      toast({
        title: 'Falha ao cadastrar',
        description:
          'Parece que houve uma falha ao tentar cadastrar sua conta, tente novamente mais tarde',
        duration: 6000,
        isClosable: true,
        status: 'error',
        position: 'top-right'
      })
      return setHasTryToRegister(false)
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('O nome é obrigatório'),
    surname: Yup.string().required('O sobrenome é obrigatório'),
    email: Yup.string()
      .required('Digite um email valido')
      .email('O email é obrigatório'),
    avatarModalPreview: Yup.string()
  })

  return (
    <Formik {...{ initialValues, onSubmit, validationSchema }}>
      <Provider value={{ hasTryToRegister, isOpen, onClose, onOpen }}>
        {children}
      </Provider>
    </Formik>
  )
}

export default RegisterFormProvider
