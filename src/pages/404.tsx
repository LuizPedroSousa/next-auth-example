import React from 'react'
import { Flex } from '@chakra-ui/react'

import { DefaultLayout } from 'components/layouts/DefaultLayout'
import { MotionLink, MotionHeading, MotionText } from 'components/Motion/index'
import Seo from 'components/Seo'
import NextLink from 'next/link'

export default function notFound() {
  return (
    <DefaultLayout>
      <Seo title="404" description="Página não encontrada" thumb="/404.png" />

      <main>
        <Flex
          flexDir="column"
          w="full"
          h="100vh"
          align="center"
          mx={{ base: 'auto' }}
          maxW={{ base: 'full', sm: '2xl' }}
          justify="center"
          px={{ base: 4, sm: 0 }}
        >
          <MotionHeading
            fontWeight="bold"
            initial={{ opacity: 0, y: -25 }}
            animate={{
              opacity: [null, 1],
              y: [null, 0],
              transition: { duration: 0.5, type: 'spring' }
            }}
            fontFamily="Poppins"
            bgGradient="linear(to-r, blue.500, pink.500)"
            bgClip="text"
            fontSize={{ base: '8xl', md: '9rem' }}
          >
            Oops!
          </MotionHeading>
          <MotionText
            as="strong"
            fontSize={{ base: 'xl', sm: '4xl' }}
            textAlign="center"
            w="full"
            whiteSpace="nowrap"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [null, 1],
              transition: { duration: 0.5, type: 'tween', delay: 0.5 }
            }}
          >
            404 - Página não encontrada
          </MotionText>
          <MotionText
            lineHeight="short"
            color="gray.500"
            fontSize={{ base: 'sm', sm: 'xl' }}
            maxW={{ base: 0, lg: '80%' }}
            fontWeight="medium"
            mt={0.5}
            textAlign="center"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [null, 1],
              transition: { duration: 1, type: 'tween', delay: 0.75 }
            }}
          >
            A página que você procura talvez tenha sido removida, nome alterado
            ou temporariamente indisponivel.
          </MotionText>
          <NextLink href="/" passHref>
            <MotionLink
              mt={{ base: 4, lg: 8 }}
              bg="blue.500"
              px={{ base: 4, sm: 8 }}
              py={{ base: 3, sm: 4 }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [null, 1],
                transition: { type: 'tween', duration: 1, delay: 1 }
              }}
              whileHover={{
                scale: [1, 0.92, 0.94, 0.92],
                transition: { duration: 1.25 }
              }}
              fontSize={{ base: 'sm', sm: 'md' }}
              _hover={{ bg: 'blue.700', borderWidth: '2px' }}
              rounded={['lg', 'xl']}
              fontFamily="Poppins"
            >
              Voltar para página principal
            </MotionLink>
          </NextLink>
        </Flex>
      </main>
    </DefaultLayout>
  )
}
