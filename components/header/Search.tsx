import { SearchIcon } from "@chakra-ui/icons";
import { IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

interface Props {
  isModal?: boolean
}

const Search: React.FC<Props> = ({ isModal }) => {
  return (
    <InputGroup display={isModal ? "inherit" : ["none", "inherit"]}>
      <Input bgColor={"white"} placeholder='Buscar producto' />
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
  )
}
export default Search