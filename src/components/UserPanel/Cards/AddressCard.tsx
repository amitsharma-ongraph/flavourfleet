import React, { Dispatch, FC, SetStateAction } from "react";
import { Address } from "../../../../packages/types/entity/Address";
import { Badge, Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { useUser } from "@/hooks/useUser";
interface Props {
  address: Address;
  activeAddress?: string;
  setActiveAddress?: Dispatch<SetStateAction<Address | null>>;
}
const AddressCard: FC<Props> = ({
  address,
  activeAddress,
  setActiveAddress,
}) => {
  const { user } = useUser();
  const { addressLine, city, country, zipCode, isPrimary, _id: id } = address;

  return (
    <Flex
      bg={id === activeAddress ? "brand.200" : "white"}
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
      cursor={"pointer"}
      onClick={() => {
        if (setActiveAddress) {
          setActiveAddress(address);
        }
      }}
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
    </Flex>
  );
};

export default AddressCard;
