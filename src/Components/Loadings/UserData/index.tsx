import React, { useEffect } from 'react'
import { Center, Heading, VStack } from '@chakra-ui/layout'
import { CircularProgress } from '@chakra-ui/progress'
import { Fade, SlideFade } from '@chakra-ui/transition'
import { GiDatabase } from 'react-icons/gi'
import { useAnimation } from 'framer-motion'
import { MotionCenter } from '../../Motion'
const UserData: React.FC = () => {
  const dbAnimation = useAnimation()

  const dbAnimationStart = async () => {
    await dbAnimation.start('visible')
    return await dbAnimation.start('slideDown')
  }

  useEffect(() => {
    dbAnimationStart()
  }, [])

  const dbVariants = {
    hidden: { opacity: 0, scale: 0, y: -35 },
    visible: { opacity: [null, 0.3], scale: [null, 1] },
    slideDown: {
      opacity: [null, 1],
      y: [null, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        type: 'spring',
        repeatType: 'mirror'
      }
    }
  }
  return (
    <SlideFade in offsetX="0" offsetY="200px">
      <VStack
        w="100%"
        h="100vh"
        spacing="4"
        flexDir="column"
        justify="center"
        align="center"
      >
        <Fade in>
          <MotionCenter
            initial="hidden"
            variants={dbVariants as any}
            animate={dbAnimation}
            color="white"
            fontSize="6xl"
          >
            <GiDatabase />
          </MotionCenter>
        </Fade>
        <Center flexDirection="column">
          <Heading fontSize={['sm', 'lg']}>Aguarde um instante</Heading>
          <Heading fontSize={['sm', 'lg']}>
            Estou carregando os seus dados...
          </Heading>
        </Center>
        <CircularProgress
          trackColor="inherit"
          isIndeterminate
          color="gray.600"
        />
      </VStack>
    </SlideFade>
  )
}

export default UserData
