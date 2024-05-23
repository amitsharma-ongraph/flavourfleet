import { RestroDashboardLayout } from "@/components/layouts/RestroDashboardLayout";
import React, { ReactElement, useEffect, useState } from "react";
import { useRestroStore } from "@/hooks/useRestroStore";
import { Box, Flex } from "@chakra-ui/react";
import { OrderStatus } from "../../../../packages/enums/OrderStatus";
import OrdersList from "@/components/RestaurantPanel/OrdersList";

function RestroOrdersPage() {
  const {
    state: { orders },
  } = useRestroStore();
  console.log("orders", orders);
  const filters = [
    OrderStatus.Placed,
    OrderStatus.Accepted,
    OrderStatus.Preparing,
    OrderStatus.Out,
    OrderStatus.Delivered,
  ];
  const [activeFilter, setActiveFilter] = useState<string>(OrderStatus.Placed);
  return (
    <>
      <Flex
        h={"40px"}
        w={"full"}
        flexDirection={"row"}
        overflowX={"scroll"}
        columnGap={4}
        px={2}
        mt={4}
        justifyContent={"flex-start"}
      >
        {filters.map((filter) => (
          <Box
            p={2}
            borderRadius={"5px"}
            bg={`${activeFilter === filter ? "brand.200" : "brand.50"}`}
            cursor={"pointer"}
            onClick={() => {
              setActiveFilter(filter);
            }}
            key={filter}
            minW={"fit-content"}
          >
            {filter.split("_").reduce((f, w) => {
              return f + w[0].toUpperCase() + w.substring(1, w.length) + " ";
            }, "")}
          </Box>
        ))}
      </Flex>
      <OrdersList orders={orders} />
    </>
  );
}
RestroOrdersPage.getLayout = (page: ReactElement) => (
  <RestroDashboardLayout>{page}</RestroDashboardLayout>
);

export default RestroOrdersPage;
