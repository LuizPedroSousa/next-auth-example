import React from 'react'
import { Heading, HTMLChakraProps } from '@chakra-ui/react'
import { HTMLMotionProps, motion } from 'framer-motion'
type Merge<P, T> = Omit<P, keyof T> & T
type MotionHeadingProps = Merge<HTMLChakraProps<'h2'>, HTMLMotionProps<'h2'>>
const MotionHeading: React.FC<MotionHeadingProps> = motion(Heading)

export default MotionHeading
