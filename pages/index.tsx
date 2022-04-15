import { Button, Grid, GridItem, Text, Link, Image, Stack } from '@chakra-ui/react';
import type { GetStaticProps, NextPage } from 'next'
import { useMemo, useState } from 'react';
import api from '../product/api';
import { Product } from '../product/types';

interface Props {
  products: Product[];
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
  const [cart, setCart] = useState<Product[]>([])

  const text = useMemo(() => {
    return cart.reduce((message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`), "").concat(`\nTotal: ${parseCurrency(cart.reduce((total, product) => total + product.price, 0))}`)
  }, [cart])
  console.log(products)
  return (
    <>
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
            >
              <Stack spacing={2}>
                <Image
                  objectFit={"cover"}
                  borderTopRadius={"xl"}
                  src={product.image[0]}
                  alt={product.title}
                  loading="lazy"
                />
                <Text color="text" fontSize={"2xl"} fontWeight={"bold"} casing="capitalize">{product.title}</Text>
                <Stack direction={["column", "row"]} spacing={2} justifyContent="space-between" alignItems="center">
                  <Text color="text" textAlign={"center"} fontSize="xl" fontWeight="500">
                    {parseCurrency(product.price)} COP
                  </Text>
                  <Button
                    variant={"outline"}
                    borderRadius={"lg"}
                    width={"min-content"}
                    colorScheme={"primary"}
                    onClick={() => setCart(cart.concat(product))}
                  >
                    Añadir a la bolsa
                  </Button>
                </Stack>
              </Stack>
            </GridItem>)
        })}
      </Grid>
      {Boolean(cart.length) &&
        <Button
          as={Link}
          href={`https://wa.me/573046263124?text=${encodeURIComponent(text)}`}
          isExternal
          colorScheme={"whatsapp"}
          leftIcon={
            <Image src='https://icongr.am/fontawesome/whatsapp.svg?size=24&color=ffffff' alt='whatsapp_icon' />
          }
        >
          Comprar ({cart.length})
        </Button>}
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
