import { extendTheme, theme } from "@chakra-ui/react";

export default extendTheme({
  colors: {
    primary:{
      50: "#EE73A0",
      100: "#EE73A0",
      200: "#EE73A0",
      300: "#EE73A0",
      400: "#EE73A0",
      500: "#EE73A0",
      600: "#EE73A0",
      700: "#EE73A0",
      800: "#EE73A0",
      900: "#EE73A0",
    }
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