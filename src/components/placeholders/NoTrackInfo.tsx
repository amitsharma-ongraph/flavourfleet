import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BiLeftArrowAlt } from "react-icons/bi";

function NoTrackInfo() {
  const { push } = useRouter();
  return (
    <Flex
      h={"100vh"}
      w={"100vw"}
      justifyContent={"center"}
      alignItems={"center"}
      color={"brand.900"}
      fontWeight={600}
      flexDirection={"column"}
      rowGap={4}
    >
      <Text fontSize={"1.4em"}>😕 Tracking is not available</Text>
      <Text fontSize={"1.2em"}>Please try after some time</Text>
      <Button
        bgColor={"brand.400"}
        mb={4}
        sx={{
          ":hover": {
            bgColor: "brand.600",
          },
        }}
        color={"white"}
        onClick={() => {
          push("/profile/orders");
        }}
      >
        <Flex
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          columnGap={3}
        >
          <Icon as={BiLeftArrowAlt}></Icon>
          <Text>Back to Orders</Text>
        </Flex>
      </Button>
    </Flex>
  );
}

export default NoTrackInfo;
