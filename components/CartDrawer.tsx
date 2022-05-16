import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Button, CloseButton, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerProps, Heading, HStack, IconButton, Image, Link, Stack, Stat, StatNumber, Text, VStack } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addToCart, decrementToCart, removeToCart } from "redux/slices/cart";
import { parseCurrency } from "utils/currency";

interface Props extends Omit<DrawerProps, "children"> {
  listCart: CartItem[];
}

const CartDrawer: React.FC<Props> = ({ listCart, onClose, ...props }) => {
  const dispatch = useDispatch()
  const total = useMemo(() => {
    return parseCurrency(listCart.reduce((total, product) => total + (product.price * product.quantity), 0))
  }, [listCart])

  const text = useMemo(() => {
    return listCart.reduce((message, product) => message.concat(`* ${product.title}${product.quantity > 1 ? ` X(${product.quantity})` : ""} - ${parseCurrency(product.price * product.quantity)}\n`), "").concat(`\nTotal: ${total}`)
  }, [listCart, total])

  useEffect(() => {
    if (!listCart.length) {
      onClose()
    }

  }, [listCart.length, onClose])

  return (
    <Drawer
      onClose={onClose}
      size="sm"
      placement='right'
      {...props}
    >
      <DrawerOverlay />
      <DrawerContent backgroundColor={"white"}>
        <DrawerCloseButton />
        <DrawerHeader boxShadow={"base"} >Tu pedido</DrawerHeader>

        <DrawerBody mt={4}>
          <Stack spacing={6}>
            {listCart.map((product, index) =>
              <Stack key={product.id} direction={['column', 'row']} spacing={4} justifyContent="space-between" bg={"primary.50"} p={2} borderRadius="lg">
                <Stack height={["150px", "70px"]} width={{ base: "100%", sm: "100px" }} justifyContent="center">
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
                    <CloseButton color={"primary.600"} onClick={() => dispatch(removeToCart(listCart[index]))} />
                  </HStack>

                  <HStack width={"100%"} justifyContent={"space-between"}>
                    <Stat size={"sm"} >
                      <StatNumber>{parseCurrency(product.price)}</StatNumber>
                    </Stat>
                    <HStack>
                      <IconButton aria-label='decrement' size={"xs"} colorScheme="primary" variant={"outline"} disabled={product.quantity === 1} icon={<MinusIcon />} onClick={() => dispatch(decrementToCart(listCart[index]))} />
                      <Text paddingInline={2} fontWeight="bold" fontSize={"lg"} color="primary.500">{product.quantity.toString().padStart(2, "0")}</Text>
                      <IconButton aria-label='decrement' size={"xs"} colorScheme="primary" icon={<AddIcon />} onClick={() => dispatch(addToCart(product))} />
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
            href={`https://wa.me/573012409597?text=${encodeURIComponent(text)}`}
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
  )
}

export default CartDrawer;