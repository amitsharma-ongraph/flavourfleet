import { RestroDashboardLayout } from "@/components/layouts/RestroDashboardLayout";
import { useRestroStore } from "@/hooks/useRestroStore";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Restaurant } from "../../../../packages/types/entity/Restaurant";
import { Box, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react";
import { BiPlusCircle } from "react-icons/bi";

function RestroOutletsPage() {
  const {
    state: { restaurant },
  } = useRestroStore();

  const [selectedOutlet, setSelectedOutlet] = useState<string | null>(null);

  const [coordinates, setCoordinates] = useState<{
    longitude: string;
    latitude: string;
  } | null>(null);

  useEffect(() => {
    const outlet = outlets.find((out) => out._id === selectedOutlet);
    if (outlet && outlet.longitude && outlet.latitude) {
      setCoordinates({
        longitude: outlet.longitude,
        latitude: outlet.latitude,
      });
    }
  }, [selectedOutlet]);

  useEffect(() => {
    console.log(coordinates);
  }, [coordinates]);

  if (!restaurant) {
    return <></>;
  }
  const { outlets } = restaurant as Restaurant;
  return (
    <Box height={"100%"} width={"100%"}>
      <Flex direction={"column"} rowGap={4} h={"full"} w={"full"}>
        <Flex direction={"column"} rowGap={4} p={4}>
          <Flex
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text>Outlets</Text>
            <Flex
              direction={"row"}
              columnGap={4}
              px={2}
              py={2}
              alignItems={"center"}
              bg={"brand.100"}
              cursor={"pointer"}
              borderRadius={"5px"}
              w={"150px"}
              onClick={() => {}}
            >
              <Icon as={BiPlusCircle} />
              <Text>Add Outlet</Text>
            </Flex>
          </Flex>
          {outlets.length === 0 && (
            <Text>No Outlets availabe , start by adding an outlet</Text>
          )}

          <Flex flexDirection={"row"} overflowX={"scroll"}>
            {outlets.map((outlet) => (
              <Flex
                key={outlet._id}
                p="4"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                mb="4"
                mr="4"
                minWidth={"100px"}
                maxWidth={"300px"}
                flexShrink={0}
                flex={1}
                position={"relative"}
                bg={selectedOutlet === outlet._id ? "brand.50" : "white"}
                cursor={"pointer"}
                onClick={() => {
                  setSelectedOutlet(outlet._id || "");
                }}
              >
                <Flex direction="column" flex="1">
                  <Flex direction={"row"} columnGap={2}>
                    <Heading size={"h4"}>{restaurant.name}</Heading>
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
        </Flex>
        {coordinates && <Flex w={"full"} bg={"brand.300"}></Flex>}
      </Flex>
    </Box>
  );
}

RestroOutletsPage.getLayout = (page: ReactElement) => (
  <RestroDashboardLayout>{page}</RestroDashboardLayout>
);

export default RestroOutletsPage;
