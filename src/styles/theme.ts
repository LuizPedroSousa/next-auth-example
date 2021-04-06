import { extendTheme } from '@chakra-ui/react'

const CustomTheme = extendTheme({
  fonts: {
    body: 'Roboto, Inter, Rajdhani, Poppins, system-ui, sans-serif',
    heading: 'Roboto, Inter, Rajdhani, Poppins, sans-serif',
    mono: 'Menlo, monospace'
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  },
  fontSizes: {
    '4xl': '2.5rem'
  },
  space: {
    5: '1.375rem'
  },
  radii: {
    sm: '5px',
    md: '8px'
  },
  styles: {
    global: {
      'html, body': {
        bg: 'gray.900'
      },
      form: {
        bg: 'gray.800'
      },
      'strong, a': {
        fontFamily: 'Poppins'
      }
    }
  },
  components: {
    Link: {
      baseStyle: {
        _hover: {
          color: 'purple.700'
        }
      }
    },
    Divider: {
      baseStyle: {
        bg: 'gray.900'
      }
    },
    Button: {
      baseStyle: {
        fontWeight: 'bold'
      },
      sizes: {
        md: {
          h: 12
        },
        lg: {
          h: [14, 16]
        }
      }
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
        fontFamily: 'Rajdhani'
      }
    }
  },
  colors: {
    gray: {
      400: '#A8A8B3',
      700: '#29292E',
      800: '#202024',
      900: '#121214'
    },
    blue: {
      400: '#6C63FF',
      500: '#5248F3',
      600: '#4238DD',
      700: '#342ACE'
    }
  }
})
export default CustomTheme
