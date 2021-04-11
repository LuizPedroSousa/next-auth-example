import React from 'react'
import { Center, HTMLChakraProps } from '@chakra-ui/react'
import { HTMLMotionProps, motion } from 'framer-motion'
type Merge<P, T> = Omit<P, keyof T> & T
type MotionCenterProps = Merge<HTMLChakraProps<'div'>, HTMLMotionProps<'div'>>

const MotionCenter: React.FC<MotionCenterProps> = motion(Center)
export default MotionCenter
