import { extendTheme, theme } from "@chakra-ui/react";

export default extendTheme({
  colors: {
    primary: theme.colors['pink'],
  },
  semanticTokens: {
    colors: {
      error: 'red.500',
      text: {
        default: 'gray.800',
        _dark: 'gray.50',
      },
    },
  },
  styles: {
    global: {
      body: {
        backgroundColor: "primary.50"
      }
    }
  }
})