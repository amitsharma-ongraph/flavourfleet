import React, { useEffect, useState, useRef, FC } from "react";
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
import { useMaps } from "@/hooks/useMaps";

const MapSearchBar: FC<{
  handleClick?: (lon: number, lat: number) => void;
}> = ({ handleClick }) => {
  const { getAutoComplete } = useMaps();
  const [keyword, setKeyword] = useState<string>("");
  const throttleTimeout = useRef<number | null>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest("#mapSearchBar")) {
      setKeyword("");
      setOptions([]);
    }
  };

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
        const options = await getAutoComplete(keyword);
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
      width={{ base: "90%", md: "50%" }}
      h={"full"}
      justifyContent={"center"}
      alignItems={"center"}
      position={"relative"}
      id="mapSearchBar"
    >
      <InputGroup
        bg={"white"}
        borderRadius="10px"
        border={"solid"}
        borderColor={"brand.100"}
        boxShadow={"md"}
        borderWidth={"1px"}
      >
        <InputLeftElement pointerEvents="none">
          <BiSearch color="brand.200" />
        </InputLeftElement>
        <BiSearch color="brand.200" />

        <Input
          variant="filled"
          placeholder="Search for Cusins , Dishes or Restaurants"
          height="40px"
          borderRadius="10px"
          width="full"
          color={"brand.900"}
          bg={"white"}
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
                py={0}
                cursor={"pointer"}
                bg={activeIndex === i ? "#f0f0f0" : "transparent"}
                _hover={{ bg: "#f0f0f0" }}
                onMouseEnter={() => {
                  setActiveIndex(i);
                }}
                onClick={() => {
                  setKeyword("");
                  setOptions([]);
                  console.log("result coordinates", option.lon, option.lat);
                  const lon = parseFloat(option.lon);
                  const lat = parseFloat(option.lat);
                  if (handleClick) handleClick(lon, lat);
                }}
              >
                <Flex
                  h={"full"}
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                >
                  <Text fontSize={"1em"} color={"brand.900"}>
                    {option.display_place}
                  </Text>
                  <Text
                    fontSize={"0.8em"}
                    color={"brand.600"}
                    overflowX={"hidden"}
                  >
                    {option.display_address}
                  </Text>
                </Flex>
              </Flex>
            ))}
        </Flex>
      )}
    </Flex>
  );
};

export default MapSearchBar;
