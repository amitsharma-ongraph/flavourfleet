import { RestroDashboardLayout } from "@/components/layouts/RestroDashboardLayout";
import { useRestroStore } from "@/hooks/useRestroStore";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { Restaurant } from "../../../../packages/types/entity/Restaurant";

function RestroCuisinsPage() {
  const {
    state: { restaurant },
  } = useRestroStore();

  const { cuisins } = restaurant as Restaurant;
  return (
    <Box height={"100%"} width={"100%"}>
      <Flex direction={"column"} rowGap={4} h={"full"} w={"full"}>
        <Flex direction={"column"} rowGap={4} p={4}>
          <Flex
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text>Cuisins</Text>
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
              <Text>Add Cuisine</Text>
            </Flex>
          </Flex>
          {cuisins.length === 0 && (
            <Text>No Cuisins availabe , start by adding a cuisine</Text>
          )}
          <Flex direction={"row"} columnGap={4} wrap={"wrap"} rowGap={"4"}>
            {cuisins.map((cusine) => (
              <Box
                p={2}
                borderRadius={"5px"}
                bg={"brand.50"}
                cursor={"pointer"}
                key={cusine}
              >
                {cusine}
              </Box>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
RestroCuisinsPage.getLayout = (page: ReactElement) => (
  <RestroDashboardLayout>{page}</RestroDashboardLayout>
);

export default RestroCuisinsPage;
