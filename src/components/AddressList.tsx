import React, { FC, useEffect, useRef, useState } from "react";
import { Address } from "../../packages/types/entity/Address";
import { Badge, Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { useUser } from "@/hooks/useUser";
import { BiDotsVertical } from "react-icons/bi";
import { AiOutlineCodepen, AiOutlineEdit, AiOutlineHome } from "react-icons/ai";
import { useAddress } from "@/hooks/useAddress";

interface Props {
  addressList: Address[] | undefined;
}

const AddressCard: FC<{ address: Address }> = ({ address }) => {
  const { user } = useUser();
  const { addressLine, city, country, zipCode, isPrimary, _id: id } = address;
  const { markAsPrimary } = useAddress();

  const [showOptions, setShowOptions] = useState<Boolean>(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <Flex
      bg={isPrimary ? "brand.50" : "white"}
      p="4"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      mb="4"
      mr="4"
      minWidth={"200px"}
      maxWidth={"400px"}
      flexShrink={0}
      flex={1}
      position={"relative"}
    >
      <Flex direction="column" flex="1">
        <Flex direction={"row"} columnGap={2}>
          <Heading size={"h4"}>{user?.name}</Heading>
          <Box>
            {isPrimary && (
              <Badge variant="outline" colorScheme="green">
                Primary
              </Badge>
            )}
          </Box>
        </Flex>
        <div>{addressLine}</div>
        <div>{city}</div>
        <div>{country}</div>
        <div>{zipCode}</div>
      </Flex>
      <Flex flexDirection={"column"} alignItems={"end"}>
        <Box
          cursor={"pointer"}
          onClick={() => {
            setShowOptions(!showOptions);
          }}
          ref={optionsRef}
        >
          <Icon as={BiDotsVertical}></Icon>
        </Box>
        {showOptions && (
          <Flex
            zIndex={2}
            width={"150px"}
            position={"absolute"}
            top={10}
            direction={"column"}
            rowGap={1}
          >
            {!isPrimary && (
              <Flex
                px={2}
                py={2}
                direction={"row"}
                columnGap={2.5}
                alignItems={"center"}
                borderBottomWidth={"1px"}
                bg={`${isPrimary ? "white" : "brand.300"}`}
                color={`${!isPrimary ? "white" : "brand.600"}`}
                borderRadius={4}
                cursor="pointer"
                onClick={() => {
                  markAsPrimary(id);
                }}
              >
                <Icon as={AiOutlineHome}></Icon>
                <Text fontSize={"0.8em"}>Mark as primary</Text>
              </Flex>
            )}
            <Flex
              px={2}
              py={2}
              direction={"row"}
              columnGap={2.5}
              alignItems={"center"}
              bg={`${isPrimary ? "white" : "brand.300"}`}
              color={`${!isPrimary ? "white" : "brand.600"}`}
              borderRadius={4}
              cursor={"pointer"}
            >
              <Icon as={AiOutlineEdit}></Icon>
              <Text fontSize={"0.8em"}>Edit</Text>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

const AddressList: FC<Props> = ({ addressList }) => {
  return (
    <Flex flexWrap="wrap">
      {addressList?.map((address, index) => (
        <AddressCard key={index} address={address} />
      ))}
      {!addressList && <></>}
    </Flex>
  );
};

export default AddressList;
