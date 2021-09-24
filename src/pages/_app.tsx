import React from 'react'
import ThemeContainer from '../context/theme/ThemeContainer'
import { UserProvider } from '../context/User/provider'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContainer>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeContainer>
  )
}

export default MyApp
