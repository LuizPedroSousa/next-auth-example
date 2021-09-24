import React from 'react'
import {
  Center,
  Divider,
  VStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  HStack,
  ModalFooter
} from '@chakra-ui/react'
import SendEmailImg from '../../../../../public/images/email.svg'
import CloseTab from '../../../../../public/images/close-tab.svg'
import { AiOutlineEdit } from 'react-icons/ai'

interface ModalEmailConfirmationProps {
  email: string
  isOpen: boolean
  onClose: () => void
}
const ModalEmailConfirmation: React.FC<ModalEmailConfirmationProps> = ({
  email,
  isOpen,
  onClose
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay sx={{ backdropFilter: 'blur(8px)' }} />
      <ModalContent bg="gray.800" py={4} px={4}>
        <ModalHeader>
          <VStack>
            <Center w={[28, 32]}>
              <SendEmailImg />
            </Center>
            <Text fontSize="2xl">Confirme seu email</Text>
          </VStack>
          <Divider bg="blue.500" />
        </ModalHeader>
        <ModalBody>
          <VStack mb={12} mt={6} spacing={0}>
            <Text fontWeight="medium" fontSize={18}>
              Um link magico foi enviado para
            </Text>
            <HStack cursor="pointer" onClick={onClose}>
              <Text color="blue.500" fontWeight="bold">
                {email}
              </Text>
              <Center
                border="1px"
                p="0.5"
                borderRadius="sm"
                borderColor="blue.600"
                w={4}
                h={4}
                color="blue.500"
                as="span"
              >
                <AiOutlineEdit />
              </Center>
            </HStack>
            <Text fontFamily="Inter" fontWeight="medium" textAlign="center">
              Clique no link, aguarde a validação e vuala você estará logado
            </Text>
          </VStack>
          <Divider bg="blue.500" />
        </ModalBody>
        <ModalFooter>
          <VStack w="100%">
            <Text fontWeight="medium" fontSize="20" color="gray.400">
              você pode fechar esta aba
            </Text>
            <Center as="span" w={[28, 32]}>
              <CloseTab />
            </Center>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalEmailConfirmation
