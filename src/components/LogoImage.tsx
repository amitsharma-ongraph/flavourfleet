import { Box } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

function LogoImage() {
  return (
    <Box w={"full"} h={"full"}>
      <Image src={require("../../public/favicon.ico")} alt="F"></Image>
    </Box>
  );
}

export default LogoImage;
