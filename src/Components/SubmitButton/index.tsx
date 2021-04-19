import React from 'react'
import { Button, ButtonProps } from '@chakra-ui/button'
import { CircularProgress } from '@chakra-ui/progress'
import { Center } from '@chakra-ui/layout'
import Icon from '@chakra-ui/icon'
import { BiErrorAlt } from 'react-icons/bi'
interface SubmitButtonProps extends ButtonProps {
  hasSubmit?: boolean | undefined
}
const SubmitButton: React.FC<SubmitButtonProps> = ({
  hasSubmit,
  children,
  ...props
}) => {
  return (
    <Button
      marginTop="6"
      fontSize="2xl"
      w="100%"
      p={7}
      size="lg"
      bg={hasSubmit === false ? 'red.400' : 'blue.400'}
      _hover={{ bg: hasSubmit === false ? 'red.600' : 'blue.600' }}
      type="submit"
      {...props}
    >
      {children}
      {hasSubmit && (
        <CircularProgress
          isIndeterminate
          position="absolute"
          right="6"
          size="8"
          trackColor="inherit"
          thickness="8"
        />
      )}
      {hasSubmit === false && (
        <Center fontSize="2xl" color="red.500" right={6} position="absolute">
          <Icon as={BiErrorAlt} />
        </Center>
      )}
    </Button>
  )
}

export default SubmitButton
