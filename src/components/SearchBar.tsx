import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { IoSearchCircleOutline } from 'react-icons/io5'

function SearchBar() {
  return (
    <InputGroup>
    <InputLeftElement
      pointerEvents="none"
      children={<BiSearch color="brand.200" />}
    />
    <Input
      variant="filled"
      placeholder="Search"
      height="40px"
      borderRadius="10px"
      width="full"
      color={"brand.900"}
      bg={"#eeeeee"}
    />
  </InputGroup>
  )
}

export default SearchBar