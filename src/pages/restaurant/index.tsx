import { AppLayout } from "@/components/layouts/AppLayout";
import {
  Box,
  Center,
  VStack,
  Text,
  Icon,
  Button,
  Image,
} from "@chakra-ui/react";
import { RiCheckLine, RiErrorWarningLine } from "react-icons/ri";
import Link from "next/link";
import axios from "axios";
import { GetServerSideProps } from "next";

import React, { ReactElement, useEffect, useState } from "react";
import { Restaurant } from "../../../packages/types/entity/Restaurant";
import { BiHourglass } from "react-icons/bi";
import { useStore } from "@/hooks/useStore";
import { useRouter } from "next/router";

interface Props {
  restaurant: Restaurant | null;
}
function RestaurantPage({ restaurant }: Props) {
  if (!restaurant) {
    return <>Error</>;
  }
  const { state } = useStore();
  const { name, logoUrl } = restaurant;
  const { addressLine, city, country, zipCode } = restaurant.outlets[0];
  const { dispatch } = useStore();
  const { push } = useRouter();

  if (restaurant?.status === "Approved") {
    dispatch({
      type: "setRestaurant",
      data: restaurant,
    });
    push("/restaurant/dashboard");
  }

  const getStatusMessage = () => {
    switch (restaurant?.status) {
      case "Approved":
        return (
          <>
            <Icon as={BiHourglass} boxSize={12} color="brand.600" />
            <Text fontSize="xl" fontWeight="bold">
              Please wait...
            </Text>
          </>
        );
      case "Pending":
        return (
          <>
            <Icon as={BiHourglass} boxSize={12} color="brand.600" />
            <Text fontSize="xl" fontWeight="bold">
              Application Pending
            </Text>
            <Text>
              Your restaurant application is pending. Please check again later.
            </Text>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              display="flex"
              flexDirection="row"
              bg={"brand.50"}
            >
              <Box h={"200px"} w={"200px"}>
                <Image src={logoUrl} alt={name} />
              </Box>

              <Box p="6" flex="1">
                <VStack spacing={2} align="stretch">
                  <Text fontWeight="bold" fontSize="xl">
                    {name}
                  </Text>
                  <Text>Owner: {state.user?.name}</Text>
                  <Text>Email: {state.user?.email}</Text>
                  <Text>
                    Address: {addressLine}, {city}, {zipCode}, {country}
                  </Text>
                </VStack>
              </Box>
            </Box>
          </>
        );
      case "Rejected":
        return (
          <>
            <Icon as={RiErrorWarningLine} boxSize={12} color="red.400" />
            <Text fontSize="xl" fontWeight="bold">
              Application Rejected
            </Text>
            <Text>
              Your restaurant application is rejected. Please{" "}
              <Link href="/signup">sign up again</Link> to resubmit your
              application.
            </Text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Center h="100vh">
      <Box p={8} borderWidth={1} borderRadius="lg">
        <VStack spacing={4} textAlign="center">
          {getStatusMessage()}
        </VStack>
      </Box>
    </Center>
  );
}

RestaurantPage.getLayout = (page: ReactElement) => (
  <AppLayout>{page}</AppLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const logInRedirect = {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };

  const welcomeRedirect = {
    redirect: {
      destination: "/restaurant/welcome",
      permanent: false,
    },
  };

  const { req } = context;
  try {
    const res = await axios.get(
      process.env.BASE_API_URL + "/restaurant/available",
      {
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie,
        },
      }
    );
    const data = await res.data;
    console.log("data---->", data);
    if (data.success === false) {
      return welcomeRedirect;
    }
    if (data.success === true) {
      return {
        props: {
          restaurant: data.restaurant,
        },
      };
    }
  } catch (error) {
    return logInRedirect;
  }

  return {
    props: {
      restaurant: null,
    },
  };
};

export default RestaurantPage;
