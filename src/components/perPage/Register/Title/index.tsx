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
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)')

  return (
    <Flex
      zIndex={2}
      as="main"
      justify={{ base: 'center', lg: 'space-between' }}
      align={{ base: 'center', lg: 'flex-start' }}
      direction="column"
      h={'100%'}
      gridArea="title"
    >
      <Box as="figure">
        <LogoImg />
        <Box mb={4} mt={6}>
          <Heading
            as="figcaption"
            textAlign={{ base: 'center', lg: 'left' }}
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
      {isLargerThan992 && (
        <Center w="100%" as="span">
          <HeroImg />
        </Center>
      )}
    </Flex>
  )
}

export default Title
