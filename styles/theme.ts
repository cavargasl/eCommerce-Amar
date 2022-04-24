import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  colors: {
    primary: {
      50: "#FFF5F7",
      100: "#FED7E2",
      200: "#FBB6CE",
      300: "#F687B3",
      400: "#EE73A0",
      500: "#D53F8C",
      600: "#B83280",
      700: "#97266D",
      800: "#702459",
      900: "#521B41",
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
  },
  components: {
    Button: {
      variants: {
        'with-shadow': {
          boxShadow: 'transparent',
        }
      },
    },
  },
})