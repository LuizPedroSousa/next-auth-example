import React, { useEffect } from 'react'
import Icon from '@chakra-ui/icon'
import { Flex, Heading, VStack } from '@chakra-ui/layout'
import { CircularProgress } from '@chakra-ui/progress'
import { AiFillGithub } from 'react-icons/ai'
import { SlideFade } from '@chakra-ui/transition'
import { useAnimation } from 'framer-motion'
import { MotionCenter } from '../../Motion'

const GithubLoading: React.FC = () => {
  const githubAnimation = useAnimation()
  const githubAnimationStart = async () => {
    await githubAnimation.start('visible')
    return await githubAnimation.start('slideUp')
  }

  useEffect(() => {
    githubAnimationStart()
  }, [])

  const githubVariants = {
    hidden: { opacity: 0, scale: 0, y: 0 },
    visible: {
      opacity: [null, 0.2],
      scale: [null, 1.6, 1]
    },
    slideUp: {
      transition: {
        duration: 3,
        type: 'spring',
        repeat: Infinity,
        repeatType: 'mirror'
      },
      y: [null, -20],
      opacity: [null, 1]
    }
  }
  return (
    <SlideFade offsetY="200px" offsetX={0} in>
      <Flex direction="column" align="center" justify="center">
        <MotionCenter
          initial="hidden"
          variants={githubVariants as any}
          animate={githubAnimation}
          mb={8}
          fontSize="6xl"
          color="white"
        >
          <Icon as={AiFillGithub} />
        </MotionCenter>
        <VStack flexDir={{ base: 'column', lg: 'row' }} spacing={[4, 0]}>
          <Heading
            mr={[0, 4]}
            fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }}
          >
            Carregando informações...
          </Heading>
          <CircularProgress
            trackColor="inherit"
            isIndeterminate
            color="blue.600"
          />
        </VStack>
      </Flex>
    </SlideFade>
  )
}

export default GithubLoading
