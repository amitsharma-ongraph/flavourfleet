import OrdersList from "@/components/UserPanel/Tables/OrdersList";
import { ProfileDashboardLayout } from "@/components/layouts/ProfileDashboardLayout";
import { useStore } from "@/hooks/useStore";
import { Box, Flex } from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { OrderStatus } from "../../../../packages/enums/OrderStatus";

function OrdersPage() {
  const {
    state: { orders },
  } = useStore();
  const filters = ["active", "history"];
  const [activeFilter, setActiveFilter] = useState<string>("active");

  const orderCounts = (() => {
    const counts: any = {
      active: 0,
      history: 0,
    };
    orders.forEach((order) => {
      if (order.status !== OrderStatus.Delivered) {
        counts.active += 1;
      } else {
        counts.history += 1;
      }
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
      >
        {filters.map((filter) => (
          <Flex alignItems={"flex-end"} pr={"10px"} position={"relative"}>
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
              h={"40px"}
            >
              {filter.split("_").reduce((f, w) => {
                return f + w[0].toUpperCase() + w.substring(1, w.length) + " ";
              }, "")}
            </Box>
          </Flex>
        ))}
      </Flex>
      <OrdersList orders={orders} />
    </>
  );
}

OrdersPage.getLayout = (page: ReactElement) => (
  <ProfileDashboardLayout>{page}</ProfileDashboardLayout>
);

export default OrdersPage;
