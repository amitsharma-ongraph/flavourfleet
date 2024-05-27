import { Box, Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import AppHeader from "../headers/AppHeader";
import SearchBar from "../SearchBar";
import RestroHeader from "../headers/RestroHeader";

export const RestroLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box w={"100%"} h={"100vh"} pos={"relative"}>
      <RestroHeader />
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
