import { AddIcon, MinusIcon } from '@chakra-ui/icons';
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
  VStack,
  CloseButton,
  StackDivider,
} from '@chakra-ui/react';
import Header from 'components/header/Header';
import type { GetStaticProps, NextPage } from 'next'
import api from 'product/api';
import { useMemo, useState } from 'react';

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
    return parseCurrency(cart.reduce((total, product) => total + (product.price * product.quuantity), 0))
  }, [cart])
  const text = useMemo(() => {
    return cart.reduce((message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`), "").concat(`\nTotal: ${total}`)
  }, [cart, total])

  function handleRemoveFromCart(index: number): void {
    setCart((cart) => cart.filter((_, _index) => _index != index))
  }

  function handleEditCart(product: Product, action: 'increment' | 'decrement'): void {
    setCart(cart => {
      const isInCart = cart.some(item => item.id === product.id)
      if(!isInCart) return cart.concat({ ...product, quuantity: 1 })

      return cart.reduce((acc: Array<CartItem>, _product: CartItem) => {
        if(product.id === _product.id) {
          if(action === 'decrement'){
            if(_product.quuantity === 1) return acc.concat(_product);
            return acc.concat({..._product, quuantity: _product.quuantity - 1});
          }
          if(action === 'increment'){
            return acc.concat({..._product, quuantity: _product.quuantity + 1});
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
        maxWidth="container.xl"
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
                    <Stat size={"sm"} width={{base: "100%", sm: "min-content" }} >
                      <StatNumber>{parseCurrency(product.price)}</StatNumber>
                    </Stat>
                    <Button
                      variant={"outline"}
                      borderRadius={"lg"}
                      width={{base: "100%", sm: "min-content"}}
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
                    {cart.reduce((acc, product) => acc + product.quuantity ,0)} productos
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
            <DrawerHeader boxShadow={"base"} >Tu pedido</DrawerHeader>

            <DrawerBody mt={4}>
              <Stack divider={<StackDivider borderColor='primary.100' />} spacing={6}>
                {cart.map((product, index) =>
                  <Stack key={product.id} direction={['column', 'row']} spacing={4} justifyContent="space-between">
                      <Stack height={"70px"} width={{base: "100%", sm: "100px"}} justifyContent="center">
                        <Image
                          objectFit={"cover"}
                          borderRadius={"lg"}
                          src={product.image[0]}
                          alt={product.title}
                          loading="lazy"
                          height={"100%"}
                        />
                      </Stack>
                      <VStack width={"100%"} >

                        <HStack width={"100%"} justifyContent={"space-between"}>
                          <Heading size={"sm"} textTransform="capitalize" >{product.title}</Heading>
                          <CloseButton color={"primary.600"} onClick={() => handleRemoveFromCart(index)} />
                        </HStack>

                        <HStack width={"100%"} justifyContent={"space-between"}>
                          <Stat size={"sm"} >
                            <StatNumber>{parseCurrency(product.price)}</StatNumber>
                          </Stat>
                          <HStack>
                            <Button size={"xs"} colorScheme="primary" variant={"outline"} disabled={product.quuantity === 1} onClick={() => handleEditCart(product, "decrement")}><MinusIcon w={3} /></Button>
                            <Text paddingInline={2} fontWeight="bold" fontSize={"lg"} color="primary.500">{product.quuantity.toString().padStart(2, "0")}</Text>
                            <Button size={"xs"} colorScheme="primary" onClick={() => handleEditCart(product, "increment")}><AddIcon w={3} /></Button>
                          </HStack>
                        </HStack>
                      </VStack>
                  </Stack>
                )}
              </Stack>
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
                <Text isTruncated>Completar pedido {total}</Text>
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
    // revalida la informacion de los productos del excel en segundos
    revalidate: 604800
  }
}

export default Home
