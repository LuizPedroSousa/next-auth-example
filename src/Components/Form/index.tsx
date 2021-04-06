import React from 'react'
import { Flex, FlexProps } from '@chakra-ui/layout'
const Form: React.FC<FlexProps> = ({ children, ...props }) => {
  return (
    <Flex
      {...props}
      as="form"
      boxShadow={props.boxShadow || 'lg'}
      w={props.w || ['100%', 'md']}
      h={props.h || ['sm', 'lg']}
      flexDir={props.flexDir || 'column'}
      borderRadius={props.borderRadius || 'lg'}
      justify={props.justify || 'center'}
      align={props.align || 'center'}
      px={props.px || ['4', '16']}
    >
      {children}
    </Flex>
  )
}

export default Form
