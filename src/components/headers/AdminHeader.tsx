import React, { FC, useEffect, useState } from "react";
import { Avatar, Box, Flex, Grid, GridItem, Icon, Text } from "@chakra-ui/react";
import { Logo } from "@/components/Logo";
import { useUser } from "@/hooks/useUser";

import { useRouter } from "next/router";
import { BiLogOutCircle } from "react-icons/bi";

function AdminHeader() {
  const [showOptions, setShowOptions] = useState<boolean>(false);
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
                onClick={()=>{setShowOptions(!showOptions)}}
              >
                <Text>Admin panel</Text>
              </Flex>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
      {showOptions && (
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
            justifyContent={"flex-start"}
            columnGap={2}
            p={2}
            color={"brand.400"}
          >
          </Flex>
        </Flex>
      )}
    </>
  );
}
export default AdminHeader;