import { SearchIcon } from "@chakra-ui/icons";
import { IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Clear } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { searching, selectFilter } from "redux/slices/filter";

interface Props {
  isModal?: boolean
  onClose: () => void,
}

const Search: React.FC<Props> = ({ isModal, onClose }) => {
  const dispatch = useDispatch()
  const filter = useSelector(selectFilter)

  function handleClick(){
    if(filter.word.length > 0){
      dispatch(searching(""))
    }
    if(isModal){
      onClose()
    }
  }
  function _handleKeyDown(e: string) {
    if (e === 'Enter') {
      onClose()
    }
  }

  return (
    <InputGroup display={isModal ? "inherit" : ["none", "inherit"]}>
      <Input
        bgColor={"white"}
        placeholder='Buscar producto'
        onChange={(e) => dispatch(searching(e.target.value.toLocaleLowerCase()))}
        value={filter.word}
        onKeyDown={e => _handleKeyDown(e.key)}
      />
      <InputRightElement >
        <IconButton
          color={"gray.400"}
          backgroundColor={"transparent"}
          borderLeftRadius="0"
          aria-label='Search product'
          icon={filter.word.length > 0 ? <Clear /> : <SearchIcon />}
          cursor="pointer"
          _hover={{bgColor: "transparent"}}
          onClick={() => handleClick()}
          _focus={{boxShadow: "transparent"}}
        />
      </InputRightElement>
    </InputGroup>
  )
}
export default Search