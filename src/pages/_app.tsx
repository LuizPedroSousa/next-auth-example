import React from 'react'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import ThemeContainer from '../context/theme/ThemeContainer'
import { UserProvider } from '../context/User/provider'
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeContainer>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeContainer>
  )
}

export default MyApp
