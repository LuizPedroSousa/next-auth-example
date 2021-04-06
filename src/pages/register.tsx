import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Form from '../Components/Form'
import Input from '../Components/Input'
import HeroImg from '../../public/images/hero-register.svg'
import {
  AiFillEdit,
  AiOutlineClose,
  AiOutlineMail,
  AiOutlineUser
} from 'react-icons/ai'
import { BsArrowLeftShort } from 'react-icons/bs'
import * as Yup from 'yup'
import {
  Flex,
  Grid,
  Heading,
  HStack,
  Stack,
  Center,
  Text,
  Link as ChakraLink,
  Avatar,
  Icon,
  useToast,
  Box,
  useMediaQuery,
  Button,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Divider,
  ModalFooter,
  AvatarBadge,
  ModalHeader,
  FormControl
} from '@chakra-ui/react'
import SubmitButton from '../Components/SubmitButton'
import NextLink from 'next/link'
import LogoImg from '../../public/images/logo.svg'
import MotionBackgroundAnim from '../Components/MotionAuthBackground'
import Cookies from 'js-cookie'
import { useFormik } from 'formik'
import axios from 'axios'
import { useRouter } from 'next/router'
const Register: React.FC = () => {
  const [hasTryToRegister, setHasTryToRegister] = useState<
    boolean | undefined
  >()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLargerThan1120] = useMediaQuery('(min-width: 1120px)')
  const Router = useRouter()

  const {
    values: { name, surname, avatar, avatarModalPreview },
    getFieldProps,
    handleSubmit,
    setFieldValue,
    errors,
    touched
  } = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      avatar: '/icons/default-avatar.svg',
      avatarModalPreview: '/icons/default-avatar.svg'
    },
    validationSchema: Yup.object({
      name: Yup.string().required('O nome é obrigatório'),
      surname: Yup.string().required('O sobrenome é obrigatório'),
      email: Yup.string()
        .required('Digite um email valido')
        .email('O email é obrigatório'),
      avatarModalPreview: Yup.string()
    }),
    onSubmit: values => {
      setHasTryToRegister(true)
      setTimeout(async () => {
        const data = { ...values, isLoggedWith: 'Email' }
        delete data.avatarModalPreview
        try {
          const user = await axios.post('', data)
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
          setHasTryToRegister(false)
        }
      }, 2000)
    }
  })

  useEffect(() => {
    Cookies.set('viewedRegisterPage', 'true')
  }, [])
  const handleSaveAvatarEdit = () => {
    setFieldValue('avatar', avatarModalPreview)
    return onClose()
  }
  return (
    <Grid
      h={['100%', '100vh']}
      w="100%"
      gridTemplateRows={[
        '2rem max-content max-content max-content 2rem',
        '1fr max-content 1fr'
      ]}
      gridTemplateColumns={['1fr', '1fr max-content 6rem max-content 1fr']}
      gridTemplateAreas={[
        "'.' 'title' 'form' 'hero' '.'",
        "'. . . . .' '. form . title .' '. . . . .'"
      ]}
      px={[4, 0]}
      alignItems={['center', 'flex-start']}
      columnGap={[6, 0]}
      rowGap={[6, 0]}
    >
      <Head>
        <title>NextAuth | Cadastro</title>
      </Head>
      <MotionBackgroundAnim hasActivePage="Register" />

      {/* Title */}
      <Flex
        zIndex="2"
        as="main"
        justify={['center', 'space-between']}
        align={['center', 'flex-start']}
        direction="column"
        h={'100%'}
        gridArea="title"
      >
        {/* Next-auth logo */}
        <Box mb={['4', 0]} as="span">
          <LogoImg />
        </Box>
        <Box mb="2">
          <Heading textAlign={['center', 'left']} as="h1" fontSize="4xl">
            Crie sua conta
          </Heading>
          <Heading fontSize={'4xl'}>é facil e gratuito</Heading>
        </Box>
        <NextLink href="/login" passHref>
          <ChakraLink
            my={4}
            color="blue.400"
            _hover={{ color: 'blue.500' }}
            d="flex"
          >
            <Center>
              <Icon fontSize="lg" as={BsArrowLeftShort} />
            </Center>
            Voltar para login
          </ChakraLink>
        </NextLink>

        {/* render Hero-Image  when MediaQuery is Larger then 1120px */}
        {isLargerThan1120 && (
          <Center w="100%" as="figure">
            <HeroImg />
          </Center>
        )}
      </Flex>

      {/* Modal avatar-image edit */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay style={{ backdropFilter: 'blur(8px)' }} />
        <ModalContent mx={[2]} px={[0, 4]} w="lg" bg="gray.800">
          <ModalHeader position="relative">
            <Button
              bg="inherit"
              _hover={{ background: 'inherit' }}
              onClick={onClose}
              position="absolute"
              right="4"
            >
              <Center as="span" color="white">
                <AiOutlineClose />
              </Center>
            </Button>
          </ModalHeader>
          <ModalBody
            py="10"
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              bg="green.400"
              name={name}
              src={
                avatarModalPreview && !errors.avatarModalPreview
                  ? avatarModalPreview
                  : avatar
              }
              w="36"
              h="36"
            />
            <Stack align="center" w="100%" spacing={1} my="4">
              <Text textAlign="center" fontWeight="bold">
                {`${name} ${surname}`}
              </Text>
              <Divider w="80%" />
            </Stack>
          </ModalBody>
          <ModalFooter mb={[8, 14]}>
            <Stack spacing={4} w="100%">
              <FormControl>
                {touched.avatarModalPreview && errors.avatarModalPreview}
                <Input
                  hasType="Url do avatar"
                  {...getFieldProps('avatarModalPreview')}
                  icon={<AiOutlineUser />}
                />
              </FormControl>
              <SubmitButton onClick={handleSaveAvatarEdit}>Salvar</SubmitButton>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Form */}
      <Form
        zIndex="2"
        onSubmit={handleSubmit as any}
        align="flex-start"
        h={['lg', 'xl']}
        py={['12', '14']}
        px={['6', '10']}
        justify="space-between"
        gridArea="form"
      >
        <HStack spacing={4}>
          <Button
            onClick={onOpen}
            m="0"
            bg="inherit"
            p="0"
            borderRadius="full"
            w="14"
            h="14"
          >
            <Avatar
              bgColor="green.500"
              name={name}
              src={avatar}
              w="100%"
              h="100%"
            >
              <AvatarBadge borderColor="gray.800" as="span" bg="blue.400">
                <AiFillEdit color="white" />
              </AvatarBadge>
            </Avatar>
          </Button>
          <Text fontSize={20} fontFamily="Inter" fontWeight="bold">
            {`${name} ${surname}`}
          </Text>
        </HStack>
        <Stack spacing={5} w="100%">
          {/*
           * use touched to get errors when user touch input
           */}
          <FormControl>
            {touched.name && errors.name}
            <Input
              {...getFieldProps('name')}
              icon={<AiOutlineUser />}
              hasType="Seu nome"
            />
          </FormControl>
          <FormControl>
            {touched.surname && errors.surname}
            <Input
              {...getFieldProps('surname')}
              icon={<AiOutlineUser />}
              hasType="Seu sobrenome"
            />
          </FormControl>
          <FormControl>
            {touched.email && errors.email}
            <Input
              {...getFieldProps('email')}
              icon={<AiOutlineMail />}
              hasType="Seu email"
            />
          </FormControl>
        </Stack>
        <SubmitButton hasSubmit={hasTryToRegister}>CRIAR CONTA</SubmitButton>
      </Form>

      {!isLargerThan1120 && (
        <Box gridArea="hero" zIndex="2" as="footer" w="100%">
          <Center as="figure">
            <HeroImg />
          </Center>
        </Box>
      )}
    </Grid>
  )
}

export default Register
