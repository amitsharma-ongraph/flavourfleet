import OrderTrackingMap from "@/components/Map/OrderTrackingMap";
import NoTrackInfo from "@/components/placeholders/NoTrackInfo";
import { Box, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";

interface ITrackingInfo {
  totalPoints: number;
  waypoints: [[number, number]];
  index: number;
  _id: string;
}

interface IOrderInfo {
  restroName: string;
}
interface IProps {
  trackingInfo: ITrackingInfo | null;
  orderInfo: IOrderInfo | null;
}

const OrderTrackingPage: FC<IProps> = ({ trackingInfo, orderInfo }) => {
  const { push } = useRouter();
  if (!trackingInfo || !orderInfo) return <NoTrackInfo />;
  return (
    <Box position="relative" width="100vw" height="100vh">
      <Flex
        position="absolute"
        top={4}
        left="50%"
        transform="translateX(-50%)"
        padding={2}
        borderRadius="md"
        zIndex="10"
        width={"100vw"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid
          h={"120px"}
          bg={"white"}
          gridAutoRows={"50px auto"}
          borderRadius={"20px"}
          width={{ base: "100%", md: "40%" }}
          color={"brand.900"}
        >
          <Flex
            position={"relative"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"0.8em"}>Order From</Text>
            <Text fontSize={"1em"}>{orderInfo.restroName}</Text>
            <Box
              position={"absolute"}
              top={2}
              left={2}
              fontSize={"1.8em"}
              cursor={"pointer"}
              onClick={() => {
                push("/profile/orders");
              }}
            >
              <Icon as={BiLeftArrowAlt}></Icon>
            </Box>
          </Flex>
          <Flex
            position={"relative"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            rowGap={2}
            fontWeight={600}
          >
            <Text fontSize={"1em"}>Your Order is on the way</Text>
            <Text fontSize={"1em"}>
              Delivering in {trackingInfo.totalPoints - trackingInfo.index}{" "}
              Minutes
            </Text>
          </Flex>
        </Grid>
      </Flex>
      <OrderTrackingMap trackingInfo={trackingInfo} />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const { req } = context;
  const {
    query: { id },
  } = context;

  try {
    const res = await axios.get(
      process.env.BASE_API_URL + `/order/tracking/${id}`,
      {
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie,
        },
      }
    );
    const data = await res.data;
    const { trackingInfo, orderInfo } = data;

    if (trackingInfo && orderInfo) {
      return {
        props: {
          trackingInfo,
          orderInfo,
        },
      };
    } else
      return {
        props: {
          trackingInfo: null,
          orderInfo: null,
        },
      };
  } catch (error) {
    console.log("error--->", error);
  }

  return {
    props: {
      trackingInfo: null,
      orderInfo: null,
    },
  };
};

export default OrderTrackingPage;
