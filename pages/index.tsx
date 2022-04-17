import {
  Button, Grid, GridItem, Text, Link, Image, Stack, Heading, Container, Stat, StatNumber, Flex, Badge, Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  List,
  ListItem,
  HStack,
  Box,
  VStack,
  CloseButton,
} from '@chakra-ui/react';
import type { GetStaticProps, NextPage } from 'next'
import { useMemo, useState } from 'react';
import Header from '../components/header/Header';
import api from '../product/api';
import { Product } from '../product/types';

interface Props {
  products: Product[];
}
interface CartItem extends Product {
  quuantity: number;
}

function parseCurrency(value: number): string {
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
}



const Home: NextPage<Props> = ({ products }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

  const total = useMemo(() => {
    return parseCurrency(cart.reduce((total, product) => total + product.price, 0))
  }, [cart])
  const text = useMemo(() => {
    return cart.reduce((message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`), "").concat(`\nTotal: ${total}`)
  }, [cart, total])

  function handleRemoveFromCart(index: number): void {
    setCart((cart) => cart.filter((_, _index) => _index != index))
  }
  function handleAddToCart(product: Product): void {
    setCart(cart => {
      if (cart.some(item => item.id === product.id)) {
        return cart.map(item => item.id === product.id ? { ...item, quuantity: item.quuantity + 1 } : item)
      }
      return cart.concat({ ...product, quuantity: 1 })
    })
  }

  return (
    <>
      <Header />
      <Container
        marginY={4}
        padding={4}
        maxWidth="container.xl"
        borderRadius="md"
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
                    <Stat size={"sm"} >
                      <StatNumber>{parseCurrency(product.price)}</StatNumber>
                    </Stat>
                    <Button
                      variant={"outline"}
                      borderRadius={"lg"}
                      width={"min-content"}
                      colorScheme={"primary"}
                      onClick={() => handleAddToCart(product)}
                    >
                      Añadir a la bolsa
                    </Button>
                  </Stack>
                </Stack>
              </GridItem>)
          })}
        </Grid>
        {Boolean(cart.length) &&
          <Flex alignItems="center" bottom={4} justifyContent="center" position="sticky">
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
                    {cart.length} productos
                  </Badge>
                </Stack>
              </Stack>
            </Button>

          </Flex>
        }
        <Drawer
          isOpen={isCartOpen}
          size="sm"
          placement='right'
          onClose={() => setIsCartOpen(false)}
        >
          <DrawerOverlay />
          <DrawerContent backgroundColor={"primary.50"}>
            <DrawerCloseButton />
            <DrawerHeader boxShadow={"base"}>Tu pedido</DrawerHeader>

            <DrawerBody>
              <List spacing={4}>
                {cart.map((product, index) =>
                  <ListItem key={product.id}>
                    <HStack spacing={6} justifyContent="space-between">
                      <Stack height={"70px"} width="100px" justifyContent="center">
                        <Image
                          objectFit={"cover"}
                          borderRadius={"lg"}
                          src={product.image[0]}
                          alt={product.title}
                          loading="lazy"
                          height={"100%"}
                        />
                      </Stack>
                      <VStack width={"100%"}>

                        <HStack width={"100%"} justifyContent={"space-between"}>
                          <Heading size={"sm"} textTransform="capitalize" >{product.title}</Heading>
                          <CloseButton color={"primary.600"} onClick={() => handleRemoveFromCart(index)} />
                        </HStack>

                        <HStack width={"100%"} justifyContent={"space-between"}>
                          <Stat size={"sm"} >
                            <StatNumber>{parseCurrency(product.price)}</StatNumber>
                          </Stat>
                        </HStack>

                      </VStack>
                    </HStack>
                  </ListItem>
                )}
              </List>
            </DrawerBody>

            <DrawerFooter >
              <Button
                as={Link}
                href={`https://wa.me/573046263124?text=${encodeURIComponent(text)}`}
                isExternal
                size={"lg"}
                width="100%"
                colorScheme={"whatsapp"}
                leftIcon={<Image src='https://icongr.am/fontawesome/whatsapp.svg?size=24&color=ffffff' alt='whatsapp_icon' />}
              >
                Completar pedido {total}
              </Button>
            </DrawerFooter>

          </DrawerContent>
        </Drawer>
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
    // revalida la informacion de los productos en segundos
    revalidate: 604800
  }
}

export default Home
