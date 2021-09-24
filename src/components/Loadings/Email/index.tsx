/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'

import {
  Flex,
  Icon,
  CircularProgress,
  useMediaQuery,
  SlideFade
} from '@chakra-ui/react'
import { AiOutlineCheck, AiTwotoneMail } from 'react-icons/ai'
import { BiErrorAlt } from 'react-icons/bi'
import { statusType } from '../../../hooks/useUser'
import { useAnimation } from 'framer-motion'
import {
  MotionHeading,
  MotionCenter
} from '../../Motion'

interface EmailLoadingProps {
  status: statusType
}

interface LinesProps {
  line: string
}

const EmailLoading: React.FC<EmailLoadingProps> = ({ status }) => {
  const [lines, setLines] = useState<LinesProps[]>([
    { line: 'Aguarde um instante' },
    { line: 'Estou carregando suas informações' }
  ])

  const [isLargerThan1120] = useMediaQuery('(min-width: 1120px)')

  const mailAnimation = useAnimation()
  const mailAnimationStart = async () => {
    await mailAnimation.start('visible')
    await mailAnimation.start('slideDown')
    return await mailAnimation.start('flip')
  }

  useEffect(() => {
    mailAnimationStart()
  }, [])

  useEffect(() => {
    if (status === 'success') {
      setLines([
        { line: 'Tudo certo' },
        { line: 'irei te redirecionar de volta!!' }
      ])
    }
    if (status === 'error') {
      const errorLines = isLargerThan1120
        ? [
          { line: 'Parece que este link não é mais valido' },
          { line: 'tente novamente mais tarde...' }
        ]
        : [{ line: 'Parece que este link' },
          { line: 'não é mais valido' },
          { line: 'tente novamente mais tarde...' }
        ]
      setLines(errorLines)
    }
  }, [status])
  const mailIconVariants = {
    hidden: { scale: 0, opacity: 0, y: -50 },
    visible: { scale: [null, 1], opacity: [null, 0.2] },
    slideDown: {
      y: 0,
      opacity: [null, 1],

      transition: {
        duration: 2
      }
    },
    flip: {
      transition: {
        repeat: Infinity,
        repeatType: 'mirror',
        repeatDelay: 2,
        type: 'spring'
      },
      rotate: 360
    }
  }

  const statusIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      transition: { duration: 0.6, type: 'spring', repeat: Infinity, repeatType: 'mirror', repeatDelay: 2 },
      scale: [null, 1, 1.6, 1],
      opacity: [null, 1]
    }
  }

  const sentenseVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
        repeat: Infinity
      }
    }
  }

  const letterVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      opacity: [null, 1],
      y: [null, '0%']
    }
  }
  return (
    <SlideFade offsetY="200px" offsetX={0} in>
      <Flex direction="column" align="center" justify="center">
        <MotionCenter
          initial="hidden"
          animate={mailAnimation}
          variants={mailIconVariants as any}
          fontSize="6xl"
          color="white"
        >
          <Icon as={AiTwotoneMail} />
        </MotionCenter>
        <MotionHeading
          textAlign="center"
          as="h1"
          lineHeight={0}
          variants={sentenseVariants}
          initial="hidden"
          animate="visible"
          mr={[0, 4]}
          my={8}
          fontSize={['xl', '4xl']}
        >
          {
            lines.map(({ line }, index) => {
              return (
                <>
                  {
                    line.split('').map((letter, index) => (
                      <MotionHeading
                        initial="hidden"
                        animate="visible"
                        variants={letterVariants}
                        fontSize={['xl', '3xl']}
                        transition={{ duration: index / 10 }}
                        textAlign="center"
                        m={0}
                        as="span"
                        key={`${letter}-${index}`}
                      >
                        {letter}
                      </MotionHeading>
                    ))
                  }
                  <br key={`${line}-${index}`}/>
                </>
              )
            })
          }
        </MotionHeading>

        {(() => {
          if (status === 'waiting') {
            return <CircularProgress trackColor="inherit" mt={8} isIndeterminate color="blue.600" />
          }
          return (
            <MotionCenter
              h={10}
              animate="visible"
              initial="hidden"
              variants={statusIconVariants as any}
              w={10}
              borderRadius="full"
              fontSize="2xl"
              bg={status === 'success' ? 'green.500' : 'red.600'}
            >
              <Icon as={status === 'success' ? AiOutlineCheck : BiErrorAlt} />
            </MotionCenter>
          )
        })()}
      </Flex>
    </SlideFade>
  )
}

export default EmailLoading
