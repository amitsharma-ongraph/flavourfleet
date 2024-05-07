import { Box, Image, VStack, Text, Button } from "@chakra-ui/react";
import { RestaurantApplication } from "../../../packages/types/entity/RestaurantApplication";
import { FC } from "react";
import { useAdmin } from "@/hooks/useAdmin";

const RestaurantApplicationCard: FC<{ restaurant: RestaurantApplication }> = ({
  restaurant,
}) => {
  const {
    _id,
    name,
    address: { addressLine, city, country, zipCode },
    owner: { name: ownerName, email },
    logoUrl,
  } = restaurant;

  const { approveRestro, rejectRestro } = useAdmin();

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      display="flex"
      flexDirection="row"
      bg={"brand.50"}
    >
      <Box h={"200px"} w={"200px"}>
        <Image src={logoUrl} alt={name} />
      </Box>

      <Box p="6" flex="1">
        <VStack spacing={2} align="stretch">
          <Text fontWeight="bold" fontSize="xl">
            {name}
          </Text>
          <Text>Owner: {ownerName}</Text>
          <Text>Email: {email}</Text>
          <Text>
            Address: {addressLine}, {city}, {zipCode}, {country}
          </Text>
        </VStack>
      </Box>

      <Box p="6" display="flex" flexDirection="column" justifyContent="center">
        <Button
          colorScheme="green"
          mb="2"
          onClick={() => {
            approveRestro(_id);
          }}
        >
          Accept
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            rejectRestro(_id);
          }}
        >
          Reject
        </Button>
      </Box>
    </Box>
  );
};

export default RestaurantApplicationCard;
