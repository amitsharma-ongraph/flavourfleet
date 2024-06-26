import { Box, Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import AppHeader from "../headers/AppHeader";
import SearchBar from "../SearchBar";
import { useStore } from "@/hooks/useStore";
import AnimatedLogo from "../AnimatedLogo";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const { state } = useStore();
  return (
    <Box w={"100%"} h={"100vh"} pos={"relative"}>
      {state.loadingStates.appLoading && <AnimatedLogo />}
      <AppHeader />
      <Box
        pos={"absolute"}
        top={0}
        left={0}
        width={"100%"}
        h={"100vh"}
        overflow={"hidden"}
        paddingTop={"70px"}
        overflowY={"scroll"}
      >
        {children}
      </Box>
    </Box>
  );
};
