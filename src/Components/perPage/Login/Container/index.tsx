import React from 'react'
import { Grid, GridProps } from '@chakra-ui/layout'

const Container: React.FC<GridProps> = ({ children, ...props }) => {
  return (
    <Grid
      {...props}
      gridTemplateRows={[
        'max-content max-content max-content',
        '1fr max-content 1fr'
      ]}
      gridTemplateColumns={['1fr', '1fr 36rem 6rem max-content 1fr']}
      rowGap={[10, 0]}
      alignItems="center"
      justifyItems="center"
      gridTemplateAreas={[
        "'title' 'form' 'hero'",
        "'. . . . .' '. title . form .' '. . . . .'"
      ]}
      py={[12, 0]}
      w="100%"
      h={['100%', '100vh']}
      px={[4, 0]}
    >
      {children}
    </Grid>
  )
}

export default Container
