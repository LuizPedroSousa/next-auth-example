import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  Text,
  Link as ChakraLink,
  Button,
  Heading,
  useToast,
  CircularProgress,
  Grid,
  useMediaQuery
} from '@chakra-ui/react'
import * as Yup from 'yup'
import NextLink from 'next/link'
import { FaGithub } from 'react-icons/fa'
import Input from '../Components/Input'
import Form from '../Components/Form'
import { AiOutlineMail } from 'react-icons/ai'
import SubmitButton from '../Components/SubmitButton'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import withSession from '../lib/session'
import LogoImg from '../../public/images/logo.svg'
import { useRouter } from 'next/router'
import HeroImg from '../../public/images/hero-login.svg'
import MotionAuthBackground from '../Components/MotionAuthBackground'
import Cookies from 'js-cookie'
import { useFormik } from 'formik'

const Login: React.FC = () => {
  const [hasSignWithGithub, setHasSignWithGithub] = useState(false)
  const [hasTryToLogin, setHasTryToLogin] = useState<boolean | undefined>()
  const toast = useToast()
  const Router = useRouter()
  const [isLargerThan1120] = useMediaQuery('(min-width: 1120px)')
  useEffect(() => {
    window.addEventListener('beforeunload', () =>
      Cookies.remove('viewedRegisterPage')
    )
  }, [])

  useEffect(() => {
    if (hasTryToLogin === false) {
      setTimeout(() => {
        setHasTryToLogin(undefined)
      }, 2000)
    }
  }, [hasTryToLogin])
  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Digite um email valido')
    }),
    onSubmit: values => {
      setHasTryToLogin(true)
      setTimeout(async () => {
        try {
          await axios.post('/users/auth/email', {})
        } catch {
          setHasTryToLogin(false)
          toast({
            title: 'Falha ao logar',
            description:
              'Parece que houve um erro ao tentar logar em sua conta, tente novamente mais tarde.',
            duration: 6000,
            status: 'error',
            isClosable: true,
            position: 'top-right'
          })
        }
      }, 2000)
    }
  })
  const handleSignWithGithub = () => {
    setHasSignWithGithub(true)
    setTimeout(() => {
      Router.push('/login?signWithGithub=true')
    }, 1000)
  }
  return (
    <Grid
      as="section"
      gridTemplateRows={[
        'max-content max-content max-content',
        '1fr max-content 1fr'
      ]}
      gridTemplateColumns={['1fr', '1fr 36rem 6rem max-content 1fr']}
      rowGap={['10', 0]}
      alignItems="center"
      justifyItems="center"
      gridTemplateAreas={[
        "'title' 'form' 'hero'",
        "'. . . . .' '. title . form .' '. . . . .'"
      ]}
      py={[12, 0]}
      w="100%"
      h={['100%', '100vh']}
      px={[4, 0]}
    >
      <Head>
        <title>Next Auth | Login</title>
      </Head>
      <MotionAuthBackground hasActivePage="Login" />
      <Flex
        zIndex="2"
        as="main"
        gridArea="title"
        h="100%"
        w="100%"
        justify="space-evenly"
        align="center"
        flexDir="column"
      >
        <Flex
          w="100%"
          direction={['column', 'row-reverse']}
          align="center"
          justify={['center', 'space-between']}
          mb={[0, 6]}
        >
          <Center as="span" mb={[3, 0]}>
            <LogoImg />
          </Center>
          <Box>
            <Heading as="h1" fontSize="4xl">
              Para começar
            </Heading>
            <Heading as="h2" maxW="13.9rem" fontSize="4xl">
              faça login em sua conta
            </Heading>
          </Box>
        </Flex>
        {isLargerThan1120 && (
          <Center w="70%" as="figure">
            <HeroImg />
          </Center>
        )}
      </Flex>
      <Form
        zIndex="2"
        gridArea="form"
        onSubmit={handleSubmit as any}
        py={['8', '20']}
      >
        <Flex flexDir="column" w="100%">
          <Input
            {...getFieldProps('email')}
            icon={<AiOutlineMail />}
            hasType="email"
          />
          <SubmitButton hasSubmit={hasTryToLogin}>Entrar</SubmitButton>
        </Flex>
        <HStack mt="6" w="100%" align="center" justify="center">
          <Text fontWeight="medium" fontSize={['md', 'lg']}>
            Não tem uma conta?
          </Text>
          <NextLink href="/register" passHref>
            <ChakraLink ml="1" color="blue.600">
              Registre-se
            </ChakraLink>
          </NextLink>
        </HStack>
        <Flex w="100%" justify="space-between" align="center" m="6">
          <Divider />
          <Text fontWeight="bold" fontFamily="Poppins" mx="4">
            Ou
          </Text>
          <Divider />
        </Flex>
        <Flex
          w="100%"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize="md" fontWeight="bold">
            Entre com
          </Text>
          <Button
            w="70%"
            size="md"
            borderRadius="sm"
            fontSize="lg"
            _hover={{ bg: 'blue.400' }}
            bg="gray.700"
            onClick={handleSignWithGithub}
          >
            GITHUB
            <Center as="span" ml="2.5">
              <Icon as={FaGithub} />
            </Center>
            {hasSignWithGithub && (
              <CircularProgress
                isIndeterminate
                color="gray.600"
                position="absolute"
                right={['4', '4']}
                size="4"
              />
            )}
          </Button>
        </Flex>
      </Form>
      {!isLargerThan1120 && (
        <Box zIndex="2" w="100%" gridArea="hero" as="footer">
          <Center as="figure">
            <HeroImg />
          </Center>
        </Box>
      )}
    </Grid>
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
