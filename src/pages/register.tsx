import React, { useEffect } from 'react'
import Head from 'next/head'
import HeroImg from '../../public/images/hero-register.svg'
import { Box, useMediaQuery } from '@chakra-ui/react'

import MotionBackgroundAnim from '../components/MotionAuthBackground'
import Cookies from 'js-cookie'
import Title from '../components/perPage/Register/Title'
import Container from '../components/perPage/Register/Container'
import ModalAvatarEdit from '../components/perPage/Register/ModalAvatarEdit'
import Form from '../components/perPage/Register/Form'
import RegisterFormProvider from '../context/RegisterForm/provider'
const Register: React.FC = () => {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)')
  useEffect(() => {
    Cookies.set('viewedRegisterPage', 'true')
  }, [])
  return (
    <Container>
      <Head>
        <title>NextAuth | Cadastro</title>
      </Head>
      <MotionBackgroundAnim hasActivePage="Register" />

      <Title />
      <RegisterFormProvider>
        <ModalAvatarEdit />
        <Form />
      </RegisterFormProvider>
      {!isLargerThan992 && (
        <Box
          gridArea="hero"
          zIndex={2}
          as="footer"
          w={['100%', '80%', '60%', '100%']}
        >
          <HeroImg />
        </Box>
      )}
    </Container>
  )
}

export default Register
