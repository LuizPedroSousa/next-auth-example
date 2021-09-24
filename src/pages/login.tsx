import React, { useEffect } from 'react'
import { Box, Center, useMediaQuery, useDisclosure } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import withSession from 'lib/middlewares/withSession'
import HeroImg from '../../public/images/hero-login.svg'
import MotionAuthBackground from 'components/MotionAuthBackground'
import Cookies from 'js-cookie'
import ModalEmailConfirmation from 'components/perPage/Login/ModalEmailConfirmation'
import Form from 'components/perPage/Login/Form'
import Title from 'components/perPage/Login/Title'
import Container from 'components/perPage/Login/Container'
import { useUser } from 'hooks/useUser'
import Seo from 'components/Seo'
import { DefaultLayout } from 'components/layouts/DefaultLayout'

const Login: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    user: { email }
  } = useUser({})

  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

  useEffect(() => {
    window.addEventListener('beforeunload', () =>
      Cookies.remove('viewedRegisterPage')
    )
  }, [])

  return (
    <DefaultLayout>
      <Seo
        title="Login"
        description="Para começar basta realizar seu login!"
        thumb=""
      />
      <main>
        <Container>
          <MotionAuthBackground hasActivePage="Login" />
          <Title />
          <Form onOpen={onOpen} />
          <ModalEmailConfirmation
            email={email}
            isOpen={isOpen}
            onClose={onClose}
          />
          {!isLargerThan1280 && (
            <Box
              zIndex={2}
              w={['100%', '80%', '60%']}
              gridArea="hero"
              as="footer"
            >
              <Center as="figure">
                <HeroImg />
              </Center>
            </Box>
          )}
        </Container>
      </main>
    </DefaultLayout>
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
          destination: '/dashboard',
          permanent: false
        }
      }
    }
    return { props: {} }
  }
)
