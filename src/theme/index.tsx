import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: "'IBM Plex Mono', 'monospace'",
    body: "'IBM Plex Mono', 'monospace'",
  },
  shadows: {
    outline: '0 0 0 3px red.100',
  },
  components: {
    Input: {
      defaultProps: {
        focusBorderColor: 'red.100',
      },
    },
  },
})

export default theme
