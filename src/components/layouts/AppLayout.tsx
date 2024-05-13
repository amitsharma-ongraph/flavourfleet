import { Box, Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import AppHeader from "../headers/AppHeader";
import SearchBar from "../SearchBar";


export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box w={"100%"} h={"100vh"} pos={"relative"}>
      <AppHeader/>
      <Box
        pos={"absolute"}
        top={0}
        left={0}
        width={"100%"}
        h={"100vh"}
        overflow={"hidden"}
        paddingTop={"70px"}
      >
        <Flex h={"40px"} w={"full"} justifyContent={"center"} alignItems={"center"} px={5} display={{sm:"flex",base:"flex",lg:"none"}} mt={8}>
            <SearchBar/>
         </Flex>
        {children}
      </Box>
    </Box>
  );
};
