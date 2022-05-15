import { Badge, Box, Container, Flex, IconButton, Modal, ModalBody, ModalContent, ModalOverlay, Spacer, useDisclosure } from "@chakra-ui/react";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Image from "next/image";
import logo from 'public/image/logo.svg';
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCart } from "redux/slices/cart";
import Search from "./Search";

interface Props {
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const Header: React.FC<Props> = ({ setIsCartOpen }) => {
  const listCart = useSelector(selectCart)
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleOpenCart() {
    if (listCart.amountAll) return setIsCartOpen(e => !e)
  }

  return (
    <Box backgroundColor={"white"} w="100%" py={4} color="text" boxShadow={"base"} position="sticky" top={0} zIndex="1000">
      <Container maxW={{ sm: "container.sm", md: "container.md", lg: "container.lg", xl: "container.xl", '2xl': "container.2xl" }} >
        <Flex alignItems={"center"}>
          <Link href="/" passHref>
            <Flex as="a" height="40px" minW={["150px", "180px", "200px"]}>
              <Image src={logo} alt="amar-logo" />
            </Flex>
          </Link>
          <Spacer />
          <Container maxW={"md"} display="flex" justifyContent={"flex-end"}>
            <Search />
            <IconButton
              display={["inherit", "none"]}
              aria-label='Buscar'
              icon={<SearchIcon />}
              color={"gray.500"}
              backgroundColor="gray.100"
              onClick={onOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent backgroundColor="transparent">
                <ModalBody>
                  <Search isModal />
                </ModalBody>
              </ModalContent>
            </Modal>

          </Container>
          <Spacer />
          <Box
            as="span"
            position={"relative"}
            p={1}
            onClick={() => handleOpenCart()}
            _hover={{ bg: "primary.50" }}
            cursor="pointer"
            borderRadius={"md"}
          >
            <IconButton
              variant={"ghost"}
              aria-label='shoppingBag'
              colorScheme={"primary"}
              size="100%"
              icon={<ShoppingBagIcon sx={{ fontSize: "2.2rem" }} />}
            />
            {Boolean(listCart.amountAll) &&
              <Badge colorScheme={"primary"} borderRadius="full" w={5} h={5} variant="subtle" position={"absolute"} left={"60%"} top={0}>
                <Box as="p" textAlign={"center"} color="primary.700">{listCart.amountAll}</Box>
              </Badge>
            }
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Header