import { ChakraProvider, Container } from '@chakra-ui/react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import theme from '../theme'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Container
        marginY={4}
        padding={4}
        maxWidth="container.xl"
        borderRadius="md"
      >
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  )
}

export default MyApp
