import { RestroDashboardLayout } from "@/components/layouts/RestroDashboardLayout";
import { useRestroStore } from "@/hooks/useRestroStore";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { Restaurant } from "../../../../packages/types/entity/Restaurant";
import { useStore } from "@/hooks/useStore";

function RestroDashboardPage() {
  const { state: restroState } = useRestroStore();
  const {
    state: { user },
  } = useStore();

  const {
    name,
    logoUrl,
    outlets: [{ addressLine, city, country, zipCode }],
  } = restroState.restaurant as Restaurant;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      display="flex"
      flexDirection="row"
      bg={"brand.50"}
      mt={"100px"}
    >
      <Box h={"200px"} w={"200px"}>
        <Image src={logoUrl} alt={name} />
      </Box>

      <Box p="6" flex="1">
        <VStack spacing={2} align="stretch">
          <Text fontWeight="bold" fontSize="xl">
            {name}
          </Text>
          <Text>Owner: {user?.name}</Text>
          <Text>Email: {user?.email}</Text>
          <Text>
            Address: {addressLine}, {city}, {zipCode}, {country}
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
RestroDashboardPage.getLayout = (page: ReactElement) => (
  <RestroDashboardLayout>{page}</RestroDashboardLayout>
);

export default RestroDashboardPage;
