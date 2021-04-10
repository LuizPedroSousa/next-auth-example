import React from 'react'
import {
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  useMediaQuery,
  Link as ChakraLink
} from '@chakra-ui/react'
import { BsArrowLeftShort } from 'react-icons/bs'
import LogoImg from '../../../../../public/images/logo.svg'
import HeroImg from '../../../../../public/images/hero-register.svg'
import NextLink from 'next/link'

const Title: React.FC = () => {
  const [isLargerThan1120] = useMediaQuery('(min-width: 1120px)')

  return (
    <Flex
      zIndex={2}
      as="main"
      justify={['center', 'space-between']}
      align={['center', 'flex-start']}
      direction="column"
      h={'100%'}
      gridArea="title"
    >
      <Box as="figure">
        <LogoImg />
        <Box mb={4} mt={6}>
          <Heading
            as="figcaption"
            textAlign={['center', 'left']}
            fontSize="4xl"
          >
            Crie sua conta
            <br />é facil e gratuito
          </Heading>
        </Box>
      </Box>
      <NextLink href="/login" passHref>
        <ChakraLink
          my={4}
          color="blue.400"
          _hover={{ color: 'blue.500' }}
          d="flex"
        >
          <Center>
            <Icon fontSize="lg" as={BsArrowLeftShort} />
          </Center>
          Voltar para login
        </ChakraLink>
      </NextLink>
      {isLargerThan1120 && (
        <Center w="100%" as="span">
          <HeroImg />
        </Center>
      )}
    </Flex>
  )
}

export default Title
