import {
  Button, Grid, GridItem, Text, Image, Stack, Heading, Container, Stat, StatNumber, Flex, Badge,
} from '@chakra-ui/react';
import CartDrawer from 'components/CartDrawer';
import Header from 'components/header/Header';
import type { GetStaticProps, NextPage } from 'next'
import api from 'product/api';
import { useState } from 'react';
import { parseCurrency } from 'utils/currency';

interface Props {
  products: Product[];
}

const Home: NextPage<Props> = ({ products }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

  

  function handleRemoveFromCart(product: Product): void {
    setCart((cart) => cart.filter((_product) => _product.id != product.id))
  }

  function handleEditCart(product: Product, action: 'increment' | 'decrement'): void {
    setCart(cart => {
      const isInCart = cart.some(item => item.id === product.id)
      if (!isInCart) return cart.concat({ ...product, quantity: 1 })

      return cart.reduce((acc: Array<CartItem>, _product: CartItem) => {
        if (product.id === _product.id) {
          if (action === 'decrement') {
            if (_product.quantity === 1) return acc.concat(_product);
            return acc.concat({ ..._product, quantity: _product.quantity - 1 });
          }
          if (action === 'increment') {
            return acc.concat({ ..._product, quantity: _product.quantity + 1 });
          }
        }
        return acc.concat(_product)
      }, [])
    })
  }

  return (
    <>
      <Header />
      <Container
        marginY={4}
        padding={4}
        maxW={{ sm: "container.sm", md: "container.md", lg: "container.lg", xl: "container.xl", '2xl': "container.2xl" }}
        borderRadius="md"
        mb={0}
      >
        <Grid templateColumns="repeat(auto-fit, minmax(min(100%, 20rem), 1fr))" gridAutoFlow={"dense"} gridGap={6}>
          {products.map(product => {
            return (
              <GridItem
                height={"min-content"}
                rowSpan={product.verticalImage ? 2 : 0}
                boxShadow="md"
                borderRadius={"2xl"}
                padding={2}
                key={product.id}
                backgroundColor="white"
              >
                <Stack spacing={3}>
                  <Image
                    objectFit={"cover"}
                    borderTopRadius={"xl"}
                    src={product.image[0]}
                    alt={product.title}
                    loading="lazy"
                    height={"100%"}
                  />
                  <Heading size={"md"} isTruncated textTransform={"capitalize"} >{product.title}</Heading>
                  <Stack direction={["column", "row"]} spacing={2} justifyContent="space-between" alignItems="center">
                    <Stat size={"sm"} width={{ base: "100%", sm: "min-content" }} >
                      <StatNumber>{parseCurrency(product.price)}</StatNumber>
                    </Stat>
                    <Button
                      variant={"outline"}
                      borderRadius={"lg"}
                      width={{ base: "100%", sm: "min-content" }}
                      colorScheme={"primary"}
                      onClick={() => handleEditCart(product, 'increment')}
                    >
                      Añadir a la bolsa
                    </Button>
                  </Stack>
                </Stack>
              </GridItem>)
          })}
        </Grid>
        {Boolean(cart.length) &&
          <Flex alignItems="center" bottom={4} mt={6} justifyContent="center" position="sticky">
            <Button
              boxShadow="xl"
              colorScheme="primary"
              size="lg"
              width={{ base: "100%", sm: "fit-content" }}
              onClick={() => setIsCartOpen(true)}
            >
              <Stack alignItems="center" direction="row" spacing={6}>
                <Stack alignItems="center" direction="row" spacing={3}>
                  <Text fontSize="md" lineHeight={6}>
                    Ver pedido
                  </Text>
                  <Badge padding={1} colorScheme='primary' fontSize={".8rem"}>
                    {cart.reduce((acc, product) => acc + product.quantity, 0)} productos
                  </Badge>
                </Stack>
              </Stack>
            </Button>

          </Flex>
        }
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cart}
          onIncrement={(product) => handleEditCart(product, "increment")}
          onDecrement={(product) => handleEditCart(product, "decrement")}
          onRemoveFromCart={(product) => handleRemoveFromCart(product)}
        />
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    props: {
      products
    },
    // revalida la informacion de los productos del excel en segundos
    revalidate: 604800
  }
}

export default Home
