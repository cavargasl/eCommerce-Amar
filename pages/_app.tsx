import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import store from 'redux/store'
import theme from 'styles/theme'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AMAR - SHOP</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
        {/* Inicio de meta tags de licencia - Cambiar el contenido de los mismos viola el contenido de los terminos de licencia */}
        <meta content="Camilo" name="author" />
        <meta content="Camilo Vargas" name="copyright" />
      </Head>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </>
  )
}

export default MyApp
