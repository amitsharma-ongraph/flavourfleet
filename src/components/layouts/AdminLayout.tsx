import { Box, Grid, GridItem } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import AdminHeader from "../headers/AdminHeader";
import { Sidebar } from "../SideBar";
import {
  adminFixedOptions,
  adminScrollOptions,
} from "../../../packages/constants/SidebarOptions/adminDashboard";
import { useAdminStore } from "@/hooks/useAdminStore";
import AnimatedLogo from "../AnimatedLogo";

export const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const { state } = useAdminStore();
  return (
    <Box w={"100%"} h={"100vh"} pos={"relative"}>
      {state.loading && <AnimatedLogo />}
      <AdminHeader />
      <Box
        pos={"absolute"}
        top={0}
        left={0}
        width={"100%"}
        h={"100vh"}
        overflow={"hidden"}
        paddingTop={"70px"}
      >
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
                scrollOptions: adminScrollOptions,
                fixedOptions: adminFixedOptions,
              }}
            />
          </GridItem>
          <GridItem h="full" overflowY="scroll">
            {!state.loading && <>{children}</>}
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};
