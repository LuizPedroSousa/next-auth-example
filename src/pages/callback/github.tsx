import React from 'react'
import { GetServerSideProps } from 'next'
import withSession from '../../lib/middlewares/withSession'
import Head from 'next/head'
import Github from '../../components/Loadings/Github'
import axios from 'axios'
import { Flex } from '@chakra-ui/layout'
import UseAuth from '../../hooks/useAuth'
interface GithubCallbackProps {
  token: string
}

const GithubCallback: React.FC<GithubCallbackProps> = ({ token }) => {
  UseAuth({ token, provider: 'github' })
  return (
    <Flex align="center" justify="center" flexDir="column" w="100%" h="100vh">
      <Head>
        <title>Nextauth | Callback | Github</title>
      </Head>
      <Github />
    </Flex>
  )
}

export default GithubCallback

export const getServerSideProps: GetServerSideProps = withSession(
  async ({ req, query: { code, userToken } }) => {
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
    if (!code) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/auth/callback/github',
        {
          code
        }
      )
      return { props: { token: data.token } }
    } catch {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
  }
)
