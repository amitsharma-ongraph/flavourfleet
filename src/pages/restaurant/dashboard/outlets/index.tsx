import { RestroDashboardLayout } from "@/components/layouts/RestroDashboardLayout";
import { useRestroStore } from "@/hooks/useRestroStore";
import React, { ReactElement, useEffect, useState } from "react";
import { Restaurant } from "../../../../../packages/types/entity/Restaurant";
import { Box, Flex, Grid, Heading, Icon, Text } from "@chakra-ui/react";
import { BiPlusCircle } from "react-icons/bi";
import { useRouter } from "next/router";
import OutletMap from "@/components/Map/OutletMap";

function RestroOutletsPage() {
  const {
    state: { restaurant },
  } = useRestroStore();
  const { push } = useRouter();

  const [selectedOutlet, setSelectedOutlet] = useState<string | null>(null);

  const [coordinates, setCoordinates] = useState<{
    longitude: string;
    latitude: string;
  } | null>(null);

  

  useEffect(() => {
    const outlet = outlets.find((out) => out._id === selectedOutlet);
    if (outlet && outlet.location) {
      setCoordinates({
        longitude: outlet.location.coordinates[0],
        latitude: outlet.location.coordinates[1],
      });
    }
  }, [selectedOutlet]);



  if (!restaurant) {
    return <></>;
  }
  const { outlets } = restaurant as Restaurant;

  return (
    <Box height="100%" width="100%">
      <Grid templateRows="50px auto" h="full" w="full" rowGap={4} p={3}>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="1.2em" fontWeight={600}>
            Outlets
          </Text>
          <Flex
            direction="row"
            columnGap={4}
            px={2}
            py={2}
            alignItems="center"
            bg="brand.100"
            cursor="pointer"
            borderRadius="5px"
            w="150px"
            onClick={() => {
              push("/restaurant/dashboard/outlets/add");
            }}
          >
            <Icon as={BiPlusCircle} />
            <Text>Add Outlet</Text>
          </Flex>
        </Flex>

        {outlets.length === 0 && (
          <Text>No Outlets available, start by adding an outlet</Text>
        )}

        <Grid
          rowGap={4}
          columnGap={4}
          h="full"
          w="full"
          overflow="hidden"
          templateRows={["200px auto", null, null, "unset"]}
          templateColumns={["unset", null, "350px auto"]}
        >
          <Flex
            flexDirection={{ base: "row", md: "column" }}
            rowGap={3}
            columnGap={3}
            justifyContent="flex-start"
            alignItems="center"
            overflow="scroll"
            p={3}
            h={{ base: "full", md: "500px" }}
            w={{ base: "100vw", md: "full" }}
          >
            {outlets.map((outlet) => (
              <Flex
                h="180px"
                minW="320px"
                key={outlet._id}
                p="4"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                mb="4"
                position="relative"
                bg={selectedOutlet === outlet._id ? "brand.50" : "white"}
                cursor="pointer"
                onClick={() => {
                  setSelectedOutlet(outlet._id || "");
                }}
              >
                <Flex direction="column" flex="1">
                  <Flex direction="row" columnGap={2}>
                    <Heading size="h4">{restaurant.name}</Heading>
                    <Box></Box>
                  </Flex>
                  <div>{outlet.addressLine}</div>
                  <div>{outlet.city}</div>
                  <div>{outlet.country}</div>
                  <div>{outlet.zipCode}</div>
                </Flex>
              </Flex>
            ))}
          </Flex>
          <Box h="full" w="full">
            <OutletMap outlets={outlets} selectedCoordinates={coordinates} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

RestroOutletsPage.getLayout = (page: ReactElement) => (
  <RestroDashboardLayout>{page}</RestroDashboardLayout>
);

export default RestroOutletsPage;
