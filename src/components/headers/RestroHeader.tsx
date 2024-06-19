import React, { FC, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";
import { Logo } from "@/components/Logo";
import { useUser } from "@/hooks/useUser";

import { useRouter } from "next/router";
import { FaHamburger } from "react-icons/fa";
import { Sidebar } from "../SideBar";
import {
  restroFixedOptions,
  restroScrollOptions,
} from "../../../packages/constants/SidebarOptions/restroDashboard";

function RestroHeader() {
  const { user, userLoaded } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { push, pathname } = useRouter();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
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
        <GridItem display={{ base: "none", md: "none", lg: "block" }}>
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

        <GridItem display={{ base: "block", md: "block", lg: "none" }}>
          <Grid autoFlow="row" placeItems="end" columnGap={2}>
            <GridItem>
              {userLoaded && (
                <Flex
                  align="center"
                  justify="center"
                  maxWidth={"150px"}
                  h="50px"
                  borderRadius="md"
                  boxShadow="md"
                  px={4}
                  cursor={"pointer"}
                  onClick={toggleDrawer}
                >
                  <Icon as={FaHamburger} color={"brand.900"}></Icon>
                </Flex>
              )}

              {!userLoaded && (
                <Flex
                  align="center"
                  justify="center"
                  maxWidth={"150px"}
                  h="50px"
                  borderRadius="md"
                  boxShadow="md"
                  px={4}
                  cursor={"pointer"}
                >
                  <Avatar
                    name={user?.email}
                    size="sm"
                    bgColor="brand.800"
                    color="white"
                    cursor="pointer"
                  />

                  <Box borderRadius="full" px={2} color={"brand.500"}>
                    Login/Signup
                  </Box>
                </Flex>
              )}
            </GridItem>
          </Grid>

          <Drawer placement="right" onClose={toggleDrawer} isOpen={isOpen}>
            <DrawerOverlay backdropFilter={"blur(5px)"} />
            <DrawerContent bg={"brand.50"}>
              <DrawerCloseButton />
              <DrawerHeader>
                <Box h={"40px"} w={"200px"}>
                  <Logo />
                </Box>
              </DrawerHeader>

              <DrawerBody>
                <Sidebar
                  options={{
                    scrollOptions: restroScrollOptions,
                    fixedOptions: restroFixedOptions,
                  }}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </GridItem>
      </Grid>
    </>
  );
}

export default RestroHeader;
