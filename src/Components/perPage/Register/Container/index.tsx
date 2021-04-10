import React from 'react'
import { Grid, GridProps } from '@chakra-ui/react'
const Container: React.FC<GridProps> = ({ children }) => {
  return (
    <Grid
      h={['100%', '100vh']}
      w="100%"
      gridTemplateRows={[
        '2rem max-content max-content max-content 2rem',
        '1fr max-content 1fr'
      ]}
      gridTemplateColumns={['1fr', '1fr max-content 6rem max-content 1fr']}
      gridTemplateAreas={[
        "'.' 'title' 'form' 'hero' '.'",
        "'. . . . .' '. form . title .' '. . . . .'"
      ]}
      px={[4, 0]}
      alignItems={['center', 'flex-start']}
      columnGap={[6, 0]}
      rowGap={[6, 0]}
    >
      {children}
    </Grid>
  )
}

export default Container
