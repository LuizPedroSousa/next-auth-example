import React, { useContext } from 'react'
import {
  Avatar,
  Button,
  Center,
  Divider,
  FormControl,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react'
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai'
import Input from '../../../Input'
import SubmitButton from '../../../SubmitButton'
import { useFormikContext } from 'formik'
import RegisterFormContext from '../../../../context/RegisterForm/context'
import { RegisterFormInitialValues } from '../../../../context/RegisterForm/provider'
const ModalAvatarEdit: React.FC = () => {
  const { isOpen, onClose } = useContext(RegisterFormContext)
  const {
    values: { name, surname, avatar, avatarModalPreview },
    setFieldValue,
    touched,
    errors,
    getFieldProps
  } = useFormikContext<RegisterFormInitialValues>()

  const handleSaveAvatarEdit = () => {
    setFieldValue('avatar', avatarModalPreview)
    return onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay sx={{ backdropFilter: 'blur(8px)' }} />
      <ModalContent mx={[2]} px={[0, 4]} w="lg" bg="gray.800">
        <ModalHeader position="relative">
          <Button
            bg="inherit"
            _hover={{ background: 'inherit' }}
            onClick={onClose}
            position="absolute"
            right={4}
          >
            <Center as="span" color="white">
              <AiOutlineClose />
            </Center>
          </Button>
        </ModalHeader>
        <ModalBody
          py={10}
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
            w={36}
            h={36}
          />
          <Stack align="center" w="100%" spacing={1} my={4}>
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
  )
}

export default ModalAvatarEdit
