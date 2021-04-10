import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import { Box, Center, useMediaQuery, useDisclosure } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import withSession from '../lib/middlewares/withSession'
import HeroImg from '../../public/images/hero-login.svg'
import MotionAuthBackground from '../Components/MotionAuthBackground'
import Cookies from 'js-cookie'
import UserContext from '../context/User/context'
import ModalEmailConfirmation from '../Components/perPage/Login/ModalEmailConfirmation'
import Form from '../Components/perPage/Login/Form'
import Title from '../Components/perPage/Login/Title'
import Container from '../Components/perPage/Login/Container'
const Login: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    user: { email }
  } = useContext(UserContext)
  const [isLargerThan1120] = useMediaQuery('(min-width: 1120px)')
  useEffect(() => {
    window.addEventListener('beforeunload', () =>
      Cookies.remove('viewedRegisterPage')
    )
  }, [])
  return (
    <Container>
      <Head>
        <title>Next Auth | Login</title>
      </Head>
      <MotionAuthBackground hasActivePage="Login" />
      <Title />
      <Form onOpen={onOpen} />
      <ModalEmailConfirmation email={email} isOpen={isOpen} onClose={onClose} />
      {!isLargerThan1120 && (
        <Box zIndex={2} w="100%" gridArea="hero" as="footer">
          <Center as="figure">
            <HeroImg />
          </Center>
        </Box>
      )}
    </Container>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = withSession(
  async ({ req, query: { signWithGithub } }) => {
    if (signWithGithub) {
      return {
        redirect: {
          destination: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
          statusCode: 302
        }
      }
    }
    if (req.session.get('token')) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
    return { props: {} }
  }
)
