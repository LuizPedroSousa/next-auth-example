import React, { useEffect } from 'react'
import { Flex, useToast } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import EmailLoading from '../../components/Loadings/Email'
import Head from 'next/head'
import UseAuth from '../../hooks/useAuth'
import withSession from '../../lib/middlewares/withSession'

interface EmailCallbackProps {
  token: string
  uuid: string
}
const Email: React.FC<EmailCallbackProps> = ({ token, uuid }) => {
  const { status } = UseAuth({ token, uuid, provider: 'email' })
  const toast = useToast()

  useEffect(() => {
    if (status === 'success') {
      toast({
        title: 'Tudo pronto!',
        description:
          'aguarde um instante, estou redirecionando você para a pagina principal...',
        position: 'top-right',
        status
      })
    }
  }, [status])

  return (
    <Flex w="100%" h="100vh" align="center" justify="center">
      <Head>
        <title>Nextauth | Callback | Email</title>
      </Head>
      <EmailLoading status={status} />
    </Flex>
  )
}

export default Email

export const getServerSideProps: GetServerSideProps = withSession(
  async ({ req, query: { token, uuid, userToken } }) => {
    if (userToken) {
      req.session.set('token', userToken)
      await req.session.save()
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
    return {
      props: { token, uuid }
    }
  }
)
