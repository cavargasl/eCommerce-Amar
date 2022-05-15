import {
  Button, Grid, GridItem, Text, Image, Stack, Heading, Container, Stat, StatNumber, Flex, Badge,
} from '@chakra-ui/react';
import CartDrawer from 'components/CartDrawer';
import Header from 'components/header/Header';
import type { GetStaticProps, NextPage } from 'next'
import api from 'product/api';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCart } from 'redux/slices/cart';
import { selectProducts, setProductsList } from 'redux/slices/products';
import { wrapper } from 'redux/store';
import { parseCurrency } from 'utils/currency';

interface Props {
  products: Product[];
}

const Home: NextPage<Props> = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const products = useSelector(selectProducts)
  const listCart = useSelector(selectCart)
  const dispatch = useDispatch()

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
          {products?.map(product => {
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
                      onClick={() => dispatch(addToCart(product))}
                    >
                      Añadir a la bolsa
                    </Button>
                  </Stack>
                </Stack>
              </GridItem>)
          })}
        </Grid>
        {Boolean(listCart.amountAll > 0) &&
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
                    {listCart.amountAll} productos
                  </Badge>
                </Stack>
              </Stack>
            </Button>

          </Flex>
        }
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          listCart={listCart.items}
        />
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    const products = await api.list();
    store.dispatch(setProductsList(products))
    return {
      props: {},
      revalidate: 604800
    }
  }
)

export default Home
