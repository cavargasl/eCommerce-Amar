import { Box, Container, Flex, Heading, Icon, IconButton, Input, InputGroup, InputRightElement, Spacer, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Image from "next/image";
import logo from 'public/image/logo.svg'
import logoShort from "public/image/shortLogo.svg"

export default function Header() {

  return (
    <Box backgroundColor={"white"} w="100%" py={4} color="text" boxShadow={"base"} position="sticky" top={0} zIndex="1000">
      <Container maxW={{ sm: "container.sm", md: "container.md", lg: "container.lg", xl: "container.xl", '2xl': "container.2xl" }} >
        <Flex alignItems={"center"}>
          <Box height="40px" width={"200px"}
            sx={{
              '@media (max-width: 768px)': {
                display: 'none',
              },
            }}
          >
            <Flex height="100%">
              <Image src={logo} height="40px" width={"200px"} alt="amar-logo" />
            </Flex>
          </Box>
          <Box height="40px" width={"100px"}
            sx={{
              '@media (min-width: 768px)': {
                display: 'none',
              },
            }}
          >
            <Flex height="100%">
              <Image src={logoShort} height="40px" width={"100px"} alt="amar-logo" />
            </Flex>
          </Box>
          <Spacer />
          <Container maxW={"md"}>
            <InputGroup>
              <Input placeholder='Buscar producto' />
              <InputRightElement pointerEvents={"none"}>
                <IconButton
                  color={"gray.400"}
                  backgroundColor={"transparent"}
                  borderLeftRadius="0"
                  aria-label='Search product'
                  icon={<SearchIcon />}
                />
              </InputRightElement>
            </InputGroup>

          </Container>
          <Spacer />
          <IconButton
            variant={"ghost"}
            aria-label='shoppingBag'
            colorScheme={"primary"}
            icon={<ShoppingBagIcon />}
          />
        </Flex>
      </Container>
    </Box>
  )
}