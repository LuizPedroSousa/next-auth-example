import React from 'react'
import { Grid, GridProps } from '@chakra-ui/layout'

const Container: React.FC<GridProps> = ({ children, ...props }) => {
  return (
    <Grid
      {...props}
      gridTemplateRows={{
        base: 'repeat(3, max-content)',
        lg: '1fr repeat(2, max-content) 1fr',
        xl: '1fr max-content 1fr'
      }}
      gridTemplateColumns={{
        base: '1fr',
        lg: 'repeat(2, 1fr)',
        xl: '1fr 36rem 6rem max-content 1fr'
      }}
      rowGap={{ base: 10, xl: 0 }}
      columnGap={{ base: 0, lg: 20, xl: 0 }}
      alignItems="center"
      justifyItems="center"
      gridTemplateAreas={{
        base: "'title' 'form' 'hero'",
        lg: "'. .''title form''hero hero''. .'",
        xl: "'. . . . .' '. title . form .' '. . . . .'"
      }}
      py={{ base: 12, xl: 0 }}
      w="100%"
      h={{ base: '100%', xl: '100vh' }}
      px={{ base: 4, md: 24, xl: 0 }}
    >
      {children}
    </Grid>
  )
}

export default Container
