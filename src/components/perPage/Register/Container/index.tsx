import React from 'react'
import { Grid, GridProps } from '@chakra-ui/react'
const Container: React.FC<GridProps> = ({ children }) => {
  return (
    <Grid
      h={{ base: '100%', lg: '100vh' }}
      w="100%"
      gridTemplateRows={{
        base: '2rem repeat(3, max-content) 2rem',
        lg: '1fr max-content 1fr'
      }}
      gridTemplateColumns={{
        base: '1fr',
        lg: '1fr max-content 6rem max-content 1fr'
      }}
      gridTemplateAreas={{
        base: "'.' 'title' 'form' 'hero' '.'",
        lg: "'. . . . .' '. form . title .' '. . . . .'"
      }}
      justifyItems="center"
      px={{ base: 4, sm: 6, lg: 0 }}
      alignItems={{ base: 'center', lg: 'flex-start' }}
      columnGap={{ base: 6, lg: 0 }}
      rowGap={{ base: 5, lg: 0 }}
    >
      {children}
    </Grid>
  )
}

export default Container
