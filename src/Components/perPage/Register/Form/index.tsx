import React, { useContext } from 'react'
import {
  HStack,
  Stack,
  Text,
  FormControl,
  Avatar,
  AvatarBadge,
  Button
} from '@chakra-ui/react'
import { AiFillEdit, AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import ChakraForm from '../../../Form'
import Input from '../../../Input'
import SubmitButton from '../../../SubmitButton'
import { useFormikContext } from 'formik'
import RegisterFormContext from '../../../../context/RegisterForm/context'
import { RegisterFormInitialValues } from '../../../../context/RegisterForm/provider'

const Form: React.FC = () => {
  const { onOpen, hasTryToRegister } = useContext(RegisterFormContext)
  const {
    values: { name, surname, avatar },
    getFieldProps,
    handleSubmit,
    errors,
    touched
  } = useFormikContext<RegisterFormInitialValues>()

  return (
    <ChakraForm
      zIndex={2}
      onSubmit={handleSubmit as any}
      align="flex-start"
      h={['lg', 'xl']}
      py={[12, 14]}
      px={[6, 10]}
      justify="space-between"
      gridArea="form"
    >
      <HStack spacing={4}>
        <Button
          onClick={onOpen}
          m={0}
          bg="inherit"
          p={0}
          borderRadius="full"
          w={14}
          h={14}
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
    </ChakraForm>
  )
}

export default Form
