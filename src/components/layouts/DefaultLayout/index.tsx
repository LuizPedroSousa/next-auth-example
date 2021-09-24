import { Box } from '@chakra-ui/layout'
import React from 'react'
const DefaultLayout: React.FC = ({ children }) => {
  return (
    <Box w="full" css={{ '> main': { width: '100%', position: 'relative' } }}>
      {children}
    </Box>
  )
}

export { DefaultLayout }
