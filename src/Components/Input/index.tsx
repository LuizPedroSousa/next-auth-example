import React from 'react'
import {
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps
} from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  hasType?: string
  icon: JSX.Element
}
const Input: React.FC<InputProps> = ({ icon, hasType, ...props }) => {
  return (
    <InputGroup w="100%">
      <InputLeftElement
        pointerEvents="none"
        h="100%"
        bg="inherit"
        color="gray.600"
      >
        {icon}
      </InputLeftElement>
      <ChakraInput
        borderRadius="sm"
        border="none"
        bg="gray.900"
        focusBorderColor="blue.500"
        colorScheme="blue"
        h="14"
        w="100%"
        type={hasType || props.type}
        placeholder={hasType || props.type}
        {...props}
      />
    </InputGroup>
  )
}

export default Input
