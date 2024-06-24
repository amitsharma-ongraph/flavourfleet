import { RestroDashboardLayout } from "@/components/layouts/RestroDashboardLayout";
import React, { ReactElement, useEffect, useState } from "react";
import { useRestroStore } from "@/hooks/useRestroStore";
import { Box, Flex } from "@chakra-ui/react";
import { OrderStatus } from "../../../../packages/enums/OrderStatus";
import OrdersList from "@/components/RestaurantPanel/RestroPOrdersList";
import { count } from "console";

function RestroOrdersPage() {
  const {
    state: { orders },
  } = useRestroStore();

  const filters = [
    OrderStatus.Placed,
    OrderStatus.Accepted,
    OrderStatus.Preparing,
    OrderStatus.Ready,
    OrderStatus.Out,
    OrderStatus.Delivered,
  ];
  const [activeFilter, setActiveFilter] = useState<string>(OrderStatus.Placed);
  const getOrders = () => {
    return orders.filter((order) => order.status === activeFilter);
  };

  const orderCounts = (() => {
    const counts: any = {};
    counts[OrderStatus.Accepted] = 0;
    counts[OrderStatus.Delivered] = 0;
    counts[OrderStatus.Out] = 0;
    counts[OrderStatus.Placed] = 0;
    counts[OrderStatus.Preparing] = 0;
    counts[OrderStatus.Ready] = 0;
    orders.forEach((order) => {
      counts[order.status] += 1;
    });
    return counts;
  })();

  return (
    <>
      <Flex
        h={"50px"}
        w={"full"}
        flexDirection={"row"}
        overflowX={"scroll"}
        columnGap={4}
        px={2}
        mt={4}
        justifyContent={"flex-start"}
        overflowY={"visible"}
      >
        {filters.map((filter) => (
          <Flex
            alignItems={"flex-end"}
            pr={"10px"}
            position={"relative"}
            key={filter}
          >
            {orderCounts[filter] > 0 && (
              <Flex
                position={"absolute"}
                top={0}
                right={0}
                h={"20px"}
                w={"20px"}
                bg={"brand.900"}
                zIndex={4}
                borderRadius={"10px"}
                justifyContent={"center"}
                alignItems={"center"}
                color={"white"}
              >
                {orderCounts[filter]}
              </Flex>
            )}
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
              position={"relative"}
              overflow={"visible"}
              h={"40px"}
            >
              {filter.split("_").reduce((f, w) => {
                return f + w[0].toUpperCase() + w.substring(1, w.length) + " ";
              }, "")}
            </Box>
          </Flex>
        ))}
      </Flex>
      <OrdersList orders={getOrders()} />
    </>
  );
}
RestroOrdersPage.getLayout = (page: ReactElement) => (
  <RestroDashboardLayout>{page}</RestroDashboardLayout>
);

export default RestroOrdersPage;
