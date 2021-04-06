import React from 'react'
import { ColorModeProvider, ChakraProvider } from '@chakra-ui/react'

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import CustomTheme from '../../../styles/theme'

const ThemeContainer: React.FC = ({ children }) => {
  return (
    <ChakraProvider resetCSS theme={CustomTheme}>
      <ColorModeProvider options={{ initialColorMode: 'dark' }}>
        <EmotionThemeProvider theme={CustomTheme}>
          {children}
        </EmotionThemeProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default ThemeContainer
