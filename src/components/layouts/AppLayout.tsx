import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import Header from "../headers/Header";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box w={"100%"} h={"100vh"} pos={"relative"}>
      <Header />
      <Box
        pos={"absolute"}
        top={0}
        left={0}
        width={"100%"}
        h={"100vh"}
        overflow={"hidden"}
        paddingTop={"70px"}
      >
        {children}
      </Box>
    </Box>
  );
};
