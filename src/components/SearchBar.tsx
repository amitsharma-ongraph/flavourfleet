import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import useSearch from "@/hooks/useSearch";
import LogoImage from "./LogoImage";
import Link from "next/link";
import { useRouter } from "next/router";

function SearchBar() {
  const { getSearchOptions } = useSearch();
  const [keyword, setKeyword] = useState<string>("");
  const throttleTimeout = useRef<number | null>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const { push } = useRouter();

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest("#searchBar")) {
      setKeyword("");
      setOptions([]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex < options.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (keyword !== "") {
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }

      throttleTimeout.current = window.setTimeout(async () => {
        setLoading(true);
        const options = await getSearchOptions(keyword);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setOptions(options);
      }, 1000);
    } else {
      setOptions([]);
    }

    return () => {
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
    };
  }, [keyword]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [options]);

  return (
    <Flex
      w={"full"}
      h={"40px"}
      justifyContent={"center"}
      alignItems={"center"}
      position={"relative"}
      id="searchBar"
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <BiSearch color="brand.200" />
        </InputLeftElement>

        <Input
          variant="filled"
          placeholder="Search for Cusins , Dishes or Restaurants"
          height="40px"
          borderRadius="10px"
          width="full"
          color={"brand.900"}
          bg={"#eeeeee"}
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </InputGroup>
      {(options.length > 0 || loading) && (
        <Flex
          h={"200px"}
          w={"full"}
          position={"absolute"}
          top={50}
          left={0}
          flexDirection={"column"}
          rowGap={2}
          bg={"#fefefe"}
          borderRadius={10}
          pt={2}
          maxHeight={"200px"}
          overflowY={"scroll"}
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
        >
          {loading && <Box h={"30px"}></Box>}
          {!loading &&
            options.map((option, i) => (
              <Flex
                key={i}
                minH={"48px"}
                w={"full"}
                flexDirection={"row"}
                columnGap={4}
                justifyContent={"flex-start"}
                alignItems={"center"}
                px={4}
                py={2}
                cursor={"pointer"}
                bg={activeIndex === i ? "#f0f0f0" : "transparent"}
                _hover={{ bg: "#f0f0f0" }}
                onMouseEnter={() => {
                  setActiveIndex(i);
                }}
                onClick={() => {
                  setKeyword("");
                  setOptions([]);
                  push(`/search/${option.value}`);
                }}
              >
                <Flex
                  h={"40px"}
                  w={"40px"}
                  borderRadius={"50%"}
                  overflow={"hidden"}
                >
                  {option.logoUrl && (
                    <Image src={option.logoUrl} h={"full"} w={"full"} />
                  )}
                  {option.logoUrl === null && <LogoImage />}
                </Flex>
                <Flex
                  h={"full"}
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                >
                  <Text fontSize={"0.8em"} color={"brand.900"}>
                    {option.value}
                  </Text>
                  <Text fontSize={"0.8em"} color={"brand.900"}>
                    {` Search in "${option.matchField}"`}
                  </Text>
                </Flex>
              </Flex>
            ))}
        </Flex>
      )}
    </Flex>
  );
}

export default SearchBar;
