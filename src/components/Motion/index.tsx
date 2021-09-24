import React from 'react'
import {
  Box,
  Center,
  Flex,
  Heading,
  Link,
  Text,
  TextProps,
  FlexProps,
  LinkProps,
  BoxProps,
  CenterProps,
  HeadingProps
} from '@chakra-ui/react'
import { HTMLMotionProps, motion } from 'framer-motion'

type Merge<P, T> = Omit<P, keyof T> & T
export type MotionHeadingProps = Merge<HeadingProps, HTMLMotionProps<'h2'>>
export type MotionCenterProps = Merge<CenterProps, HTMLMotionProps<'div'>>
export type MotionBoxProps = Merge<BoxProps, HTMLMotionProps<'div'>>
export type MotionTextProps = Merge<TextProps, HTMLMotionProps<'p'>>
export type MotionFLexProps = Merge<FlexProps, HTMLMotionProps<'div'>>

export type MotionLinkProps = Merge<LinkProps, HTMLMotionProps<'a'>>

export const MotionHeading: React.FC<MotionHeadingProps> = motion(Heading)
export const MotionCenter: React.FC<MotionCenterProps> = motion(Center)
export const MotionText: React.FC<MotionTextProps> = motion(Text)
export const MotionBox: React.FC<MotionBoxProps> = motion(Box)
export const MotionLink: React.FC<MotionLinkProps> = motion(Link)
export const MotionFlex: React.FC<MotionFLexProps> = motion(Flex)
