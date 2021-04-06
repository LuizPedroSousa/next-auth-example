/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  HTMLMotionProps,
  motion,
  useAnimation,
  useViewportScroll
} from 'framer-motion'
import { chakra, HTMLChakraProps } from '@chakra-ui/system'
import Cookies from 'js-cookie'
import { useMediaQuery } from '@chakra-ui/media-query'
type Merge<P, T> = Omit<P, keyof T> & T
type MotionBoxProps = Merge<HTMLChakraProps<'div'>, HTMLMotionProps<'div'>>
const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div)
interface MotionAuthBackgroundProps {
  hasActivePage: 'Login' | 'Register'
}

const MotionAuthBackground: React.FC<MotionAuthBackgroundProps> = ({
  hasActivePage
}) => {
  const [breakPoints, setBreakPoints] = useState(-1)
  const { scrollYProgress } = useViewportScroll()
  const backgroundAnim = useAnimation()
  const [isLargerThan1120] = useMediaQuery('(min-width: 1120px)')

  scrollYProgress.onChange(() => {
    if (scrollYProgress.get() >= 0 && scrollYProgress.get() < 0.3) {
      setBreakPoints(0)
    }
    if (scrollYProgress.get() >= 0.3 && scrollYProgress.get() < 0.8) {
      setBreakPoints(0.5)
    }
    if (scrollYProgress.get() >= 0.8) {
      setBreakPoints(1)
    }
  })
  useEffect(() => {
    if (hasActivePage === 'Login' && !Cookies.get('viewedRegisterPage')) {
      (async () => await backgroundAnim.start({
        background: [
          'linear-gradient(-45deg, #e9de7f  49%, #333 49%)',
          'linear-gradient(-45deg, #333  49%, #e9de7f 49%)',
          'linear-gradient(-45deg,  #121214 49%, #583b9c 49%)'
        ],
        scale: [0, 2, isLargerThan1120 ? 20 : 15],
        transition: { delay: 0.5 }
      }))()

      return
    }
    if (hasActivePage === 'Login') {
      (async () => await backgroundAnim.start({
        rotate: [360, 0, 0],
        background: [
          'linear-gradient(-45deg,  #583b9c 49%, #121214  49%)',
          'linear-gradient(-45deg,  #583b9c 49%, #121214 49%)',
          'linear-gradient(-45deg,  #121214 49%, #583b9c 49%)',
          'linear-gradient(-45deg,  #121214 49%, #583b9c 49%)'
        ],
        scale: [20, 10, 8, isLargerThan1120 ? 20 : 15],
        transition: { duration: 1.5, delay: 0.5 }
      }))()
      return
    }
    if (hasActivePage === 'Register') {
      (async () => await backgroundAnim.start({
        rotate: [0, 360, 360],
        background: [
          'linear-gradient(-45deg,  #121214 49%, #583b9c 49%)',
          'linear-gradient(-45deg,  #121214 49%, #583b9c 49%)',
          'linear-gradient(-45deg,  #583b9c 49%, #121214  49%)'
        ],
        scale: [20, 10, isLargerThan1120 ? 20 : 15],
        transition: { duration: 1.5, delay: 0.5 }
      }))()
    }
  }, [])

  useEffect(() => {
    if (breakPoints === 0) {
      (async () => await backgroundAnim.start({
        scale: 15,
        y: 0
      }))()
    }
    if (breakPoints === 0.5) {
      (async () => await backgroundAnim.start({
        rotate: 0,
        y: 200,
        scale: 8
      }))()
    }
    if (breakPoints === 1) {
      (async () => await backgroundAnim.start({
        rotate: 180,
        scale: 15
      }))()
    }
  }, [breakPoints])
  return (
    <MotionBox
      initial={{ scale: 0 }}
      animate={backgroundAnim}
      transition={{ duration: 1 }}
      bgGradient={'linear-gradient(-45deg, gray.900 49%, #583b9c 49% )'}
      w={['100%', '60%']}
      left={0}
      h={['55%', '100%']}
      position="fixed"
      zIndex="1"
    />
  )
}

export default MotionAuthBackground
