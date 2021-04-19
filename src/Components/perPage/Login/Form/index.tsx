import React, { useContext, useEffect, useState } from 'react'
import Input from '../../../Input'
import SubmitButton from '../../../SubmitButton'
import {
  Button,
  Center,
  CircularProgress,
  Divider,
  Flex,
  HStack,
  Icon,
  Text,
  Link as ChakraLink,
  useToast
} from '@chakra-ui/react'
import ChakraForm from '../../../../Components/Form'
import { AiOutlineMail } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { FaGithub } from 'react-icons/fa'
import NextLink from 'next/link'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import UserContext from '../../../../context/User/context'
import axios from 'axios'

interface FormProps {
  onOpen: () => void
}

const Form: React.FC<FormProps> = ({ onOpen }) => {
  const [hasTryToLogin, setHasTryToLogin] = useState<boolean | undefined>()
  const [hasSignWithGithub, setHasSignWithGithub] = useState(false)
  const {
    user: { email, ...userRest },
    setUser
  } = useContext(UserContext)

  const Router = useRouter()
  const toast = useToast()

  useEffect(() => {
    if (hasTryToLogin === false) {
      setTimeout(() => {
        setHasTryToLogin(undefined)
      }, 2000)
    }
  }, [hasTryToLogin])

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      email
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Digite um email valido')
    }),
    onSubmit: async ({ email }) => {
      setHasTryToLogin(true)
      try {
        await axios.post('/api/auth/signin/email/send', {
          email
        })
        setUser({ email, ...userRest })
        setHasTryToLogin(undefined)
        return onOpen()
      } catch ({ response }) {
        const toastProps = {
          description:
            'Parece que houve um erro interno ao tentar logar em sua conta, tente novamente mais tarde.'
        }
        if (response.data.error === 'User not exists') {
          toastProps.description = 'Usuário não encontrado'
        }
        setHasTryToLogin(false)
        return toast({
          title: 'Falha ao fazer login',
          ...toastProps,
          duration: 6000,
          status: 'error',
          isClosable: true,
          position: 'top-right'
        })
      }
    }
  })
  const handleSignWithGithub = () => {
    setHasSignWithGithub(true)
    return setTimeout(() => {
      Router.push('/login?signWithGithub=true')
    }, 1000)
  }

  return (
    <ChakraForm
      zIndex={2}
      gridArea="form"
      onSubmit={handleSubmit as any}
      py={{ base: 8, lg: 20 }}
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
          <ChakraLink ml={1} color="blue.600">
            Registre-se
          </ChakraLink>
        </NextLink>
      </HStack>
      <Flex w="100%" justify="space-between" align="center" m={6}>
        <Divider />
        <Text fontWeight="bold" fontFamily="Poppins" mx={4}>
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
              trackColor="inherit"
              color="gray.600"
              position="absolute"
              right={[4, 4]}
              size={4}
            />
          )}
        </Button>
      </Flex>
    </ChakraForm>
  )
}

export default Form
