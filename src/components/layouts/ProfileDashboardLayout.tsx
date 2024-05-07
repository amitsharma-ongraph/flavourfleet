import React, { FC, PropsWithChildren } from "react";
import { AppLayout } from "./AppLayout";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Sidebar } from "../SideBar";
import {
  userFixedOptions,
  userScrollOptions,
} from "../../../packages/constants/SidebarOptions/userDashborad";

export const ProfileDashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppLayout>
      <Grid
        templateColumns={{ base: "1fr", lg: "225px 1fr" }}
        h="full"
        w={"full"}
      >
        <GridItem
          display={{ base: "none", lg: "block" }}
          h="full"
          overflowY="scroll"
          px={2}
        >
          <Sidebar
            options={{
              scrollOptions: userScrollOptions,
              fixedOptions: userFixedOptions,
            }}
          />
        </GridItem>
        <GridItem h="full" overflowY="scroll">
          {children}
        </GridItem>
      </Grid>
    </AppLayout>
  );
};
