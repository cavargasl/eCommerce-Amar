import {
  Button, Grid, GridItem, Text, Image, Stack, Heading, Container, Stat, StatNumber, Flex, Badge, Box,
} from '@chakra-ui/react';
import CartDrawer from 'components/CartDrawer';
import Header from 'components/header/Header';
import { AnimatePresence, motion } from 'framer-motion';
import type { GetStaticProps, NextPage } from 'next'
import api from 'product/api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCart } from 'redux/slices/cart';
import { selectFilter } from 'redux/slices/filter';
import { selectProducts, setProductsList } from 'redux/slices/products';
import { wrapper } from 'redux/store';
import { parseCurrency } from 'utils/currency';

const Home: NextPage = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [viewButton, setViewButton] = useState<boolean>(false)
  const products = useSelector(selectProducts)
  const listCart = useSelector(selectCart)
  const filter = useSelector(selectFilter)
  const dispatch = useDispatch()

  const [productsFilter, setProductsFilter] = useState<Product[]>(products)
  useEffect(() => {
    let result = products.filter(item => {
      if (item.title.toLocaleLowerCase().includes(filter.word)) return item
      if (item.description.toLocaleLowerCase().includes(filter.word)) return item
    })
    setProductsFilter(result)
  }, [filter.word, products])

  function handleAddCart(product: Product) {
    dispatch(addToCart(product))
    setViewButton(true)
    setTimeout(() => setViewButton(false), 2000)
  }

  return (
    <>
      <Header setIsCartOpen={setIsCartOpen} />
      <Container
        marginY={4}
        padding={4}
        maxW={{ sm: "container.sm", md: "container.md", lg: "container.lg", xl: "container.xl", '2xl': "container.2xl" }}
        borderRadius="md"
        mb={0}
      >
        <Grid templateColumns="repeat(auto-fit, minmax(min(100%, 20rem), 1fr))" gridAutoFlow={"dense"} gridGap={6}>
          {productsFilter.length ? productsFilter.map(product => {
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
                  <Box>
                    <Heading size={"md"} isTruncated textTransform={"capitalize"} >{product.title}</Heading>
                    {
                      product.description.length > 0 &&
                      <Text color={"gray.500"}>{product.description}</Text>
                    }
                  </Box>
                  <Stack direction={["column", "row"]} spacing={2} justifyContent="space-between" alignItems="center">
                    <Stat size={"sm"} width={{ base: "100%", sm: "min-content" }} >
                      <StatNumber>{parseCurrency(product.price)}</StatNumber>
                    </Stat>
                    <Button
                      variant={"outline"}
                      borderRadius={"lg"}
                      width={{ base: "100%", sm: "min-content" }}
                      colorScheme={"primary"}
                      onClick={() => handleAddCart(product)}
                    >
                      Añadir a la bolsa
                    </Button>
                  </Stack>
                </Stack>
              </GridItem>)
          })
            :
            <Heading as="h4" textAlign={"center"}>Sin resultado</Heading>
          }
        </Grid>
        <AnimatePresence>
          {viewButton &&
            <Flex
              as={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              w="fit-content"
              marginInline={"auto"}
              alignItems="center"
              bottom={4} mt={6}
              justifyContent="center"
              position="sticky"
            >
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
        </AnimatePresence>
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
