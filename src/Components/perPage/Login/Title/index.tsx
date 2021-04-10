import React from 'react'
import { Box, Center, Flex, Heading, useMediaQuery } from '@chakra-ui/react'
import HeroImg from '../../../../../public/images/hero-login.svg'
import LogoImg from '../../../../../public/images/logo.svg'
const Title: React.FC = () => {
  const [isLargerThan1120] = useMediaQuery('(min-width: 1120px)')
  return (
    <Flex
      zIndex={2}
      as="main"
      gridArea="title"
      h="100%"
      w="100%"
      justify="space-evenly"
      align="center"
      flexDir="column"
    >
      <Flex
        w="100%"
        direction={['column', 'row-reverse']}
        align="center"
        as="figure"
        justify={['center', 'space-between']}
        mb={[0, 6]}
      >
        <LogoImg />
        <Box mt={[3, 0]}>
          <Heading as="figcaption" fontSize="4xl">
            Para começar
            <br />
            faça login
            <br />
            em sua conta
          </Heading>
        </Box>
      </Flex>
      {isLargerThan1120 && (
        <Center w="70%" as="span">
          <HeroImg />
        </Center>
      )}
    </Flex>
  )
}

export default Title
