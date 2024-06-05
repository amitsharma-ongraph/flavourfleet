import OrdersList from "@/components/UserPanel/Tables/OrdersList";
import { ProfileDashboardLayout } from "@/components/layouts/ProfileDashboardLayout";
import { useStore } from "@/hooks/useStore";
import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import React, { ReactElement, useState } from "react";

function OrdersPage() {
  const {
    state: { orders },
  } = useStore();
  const filters = ["active", "history"];
  const [activeFilter, setActiveFilter] = useState<string>("active");
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

OrdersPage.getLayout = (page: ReactElement) => (
  <ProfileDashboardLayout>{page}</ProfileDashboardLayout>
);



export default OrdersPage;
