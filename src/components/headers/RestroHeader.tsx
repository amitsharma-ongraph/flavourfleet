import React, { FC, useEffect, useState } from "react";
import { Avatar, Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Logo } from "@/components/Logo";
import { useUser } from "@/hooks/useUser";

import { useRouter } from "next/router";
import { useNotification } from "@/hooks/useNotification";
import { useModal } from "@/hooks/useModal";

function RestroHeader() {
  const { user, userLoaded } = useUser();
  const { push } = useRouter();
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const { setModal } = useModal();
  return (
    <>
      <Grid
        pos="sticky"
        top={0}
        templateColumns="150px auto 150px"
        h={"70px"}
        alignItems="center"
        px={2}
        bgColor="white"
        zIndex={3}
        boxShadow={"md"}
      >
        <GridItem>
          <Box
            borderRight="1px solid"
            borderRightColor="white"
            w={"210px"}
            h="50px"
            bg={"brand.50"}
          >
            <Logo />
          </Box>
        </GridItem>
        <GridItem />
        <GridItem>
          <Grid autoFlow="row" placeItems="end" columnGap={2}>
            <GridItem>
              <Flex
                align="center"
                justify="center"
                maxWidth={"150px"}
                h="50px"
                borderRadius="md"
                boxShadow="md"
                px={4}
                cursor={"pointer"}
                onClick={() => {
                  !userLoaded && push("/login");
                  setShowOptions(!showOptions);
                }}
              >
                <Avatar
                  name={user?.email}
                  size="sm"
                  bgColor="brand.800"
                  color="white"
                  cursor="pointer"
                />
                {!userLoaded && (
                  <Box borderRadius="full" px={2} color={"brand.500"}>
                    Login/Signup
                  </Box>
                )}
              </Flex>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
      {userLoaded && showOptions && (
        <Flex
          pos="sticky"
          top={"70px"}
          left={"100%"}
          w={"150px"}
          alignItems="center"
          mx={4}
          bgColor="white"
          zIndex={3}
          boxShadow={"md"}
          direction={"column"}
          rowGap={2}
        >
          <Flex
            h={"40px"}
            w={"100%"}
            boxShadow={"md"}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            p={2}
            color={"brand.400"}
            cursor={"pointer"}
            onClick={() => {
              push("/profile");
              setShowOptions(false);
            }}
          >
            Profile
          </Flex>
          <Flex
            h={"40px"}
            w={"100%"}
            boxShadow={"md"}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            p={2}
            color={"brand.400"}
            cursor={"pointer"}
            onClick={() => {
              push("/restaurant");
              setShowOptions(false);
            }}
          >
            Restaurants
          </Flex>
        </Flex>
      )}
    </>
  );
}

const modalBody: FC = () => {
  return (
    <>
      <Box bg={"red"} h={"100px"} w={"100%"}></Box>
    </>
  );
};
export default RestroHeader;
