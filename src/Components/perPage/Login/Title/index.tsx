import React from 'react'
import { Box, Center, Flex, Heading, useMediaQuery } from '@chakra-ui/react'
import HeroImg from '../../../../../public/images/hero-login.svg'
import LogoImg from '../../../../../public/images/logo.svg'
const Title: React.FC = () => {
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
  return (
    <Flex
      zIndex={2}
      as="main"
      gridArea="title"
      h="100%"
      w="100%"
      justify="center"
      align="center"
      flexDir="column"
    >
      <Flex
        w="100%"
        direction={{
          base: 'column',
          md: 'row-reverse',
          lg: 'column',
          xl: 'row-reverse'
        }}
        align={{ base: 'center', lg: 'flex-start', xl: 'center' }}
        as="figure"
        justify={{ base: 'center', md: 'space-around', lg: 'space-between' }}
        mb={{ base: 0, md: 6, lg: 0, xl: 6 }}
      >
        <LogoImg />
        <Box
          ml={{ base: 0, lg: 4, xl: 0 }}
          mt={{ base: 3, md: 0, lg: 8, xl: 0 }}
        >
          <Heading as="figcaption" fontSize="4xl">
            Para começar
            <br />
            faça login
            <br />
            em sua conta
          </Heading>
        </Box>
      </Flex>
      {isLargerThan1280 && (
        <Center w="70%" as="span">
          <HeroImg />
        </Center>
      )}
    </Flex>
  )
}

export default Title
