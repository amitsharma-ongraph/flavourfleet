import NoCoupons from "@/components/RestaurantPanel/NoCoupons";
import { RestroDashboardLayout } from "@/components/layouts/RestroDashboardLayout";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { ICoupon } from "../../../../../packages/types/entity/ICoupon.";
import axios from "axios";
import CouponList from "@/components/RestaurantPanel/coupons/CouponList";

interface Props {
  coupons: ICoupon[];
}

function RestroCouponsPage({ coupons }: Props) {
  const { push } = useRouter();
  return (
    <Flex px={4} py={4} w={"full"} h={"full"} flexDirection={"column"}>
      {coupons.length == 0 && (
        <>
          <NoCoupons />
        </>
      )}
      {coupons.length > 0 && (
        <>
          <Flex direction={"row"} justifyContent={"flex-end"}>
            <Flex
              direction={"row"}
              columnGap={4}
              px={2}
              py={2}
              alignItems={"center"}
              bg={"brand.100"}
              cursor={"pointer"}
              borderRadius={"5px"}
              onClick={() => {
                push("coupons/new");
              }}
            >
              <Icon as={BiPlusCircle} />
              <Text>New</Text>
            </Flex>
          </Flex>
          <Box w={"full"} h={"full"} my={5}>
            <CouponList coupons={coupons} />
          </Box>
        </>
      )}
    </Flex>
  );
}
RestroCouponsPage.getLayout = (page: ReactElement) => (
  <RestroDashboardLayout>{page}</RestroDashboardLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const loginRedirect = {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };

  const { req } = context;
  try {
    const res = await axios.get(
      process.env.BASE_API_URL + "/coupons/restaurant/get-all",
      {
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie,
        },
      }
    );
    const data = await res.data;
    if (!data.success) {
      return loginRedirect;
    }
    return {
      props: {
        coupons: data.coupons,
      },
    };
  } catch (error) {
    return {
      props: {
        coupons: [],
      },
    };
  }
};
export default RestroCouponsPage;
