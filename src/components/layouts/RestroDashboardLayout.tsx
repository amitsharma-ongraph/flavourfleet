import React, { FC, PropsWithChildren } from "react";
import { AppLayout } from "./AppLayout";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Sidebar } from "../SideBar";
import {
  restroFixedOptions,
  restroScrollOptions,
} from "../../../packages/constants/SidebarOptions/restroDashboard";
import { useRestroStore } from "@/hooks/useRestroStore";
import AnimatedLogo from "../AnimatedLogo";
import { RestroLayout } from "./RestroLayout";

export const RestroDashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const { state } = useRestroStore();
  return (
    <RestroLayout>
      {state.loading && <AnimatedLogo />}

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
              scrollOptions: restroScrollOptions,
              fixedOptions: restroFixedOptions,
            }}
          />
        </GridItem>
        <GridItem h="full" overflowY="scroll">
          {!state.loading && <>{children}</>}
        </GridItem>
      </Grid>
    </RestroLayout>
  );
};
