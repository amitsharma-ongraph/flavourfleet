import AddAddressMap from "@/components/Map/AddAddressMap";
import { Box } from "@chakra-ui/react";
import React from "react";

function AddAddressPage() {
  return (
    <Box h={"100vh"} w={"100vw"} overflow={"hidden"}>
      <AddAddressMap />
    </Box>
  );
}

export default AddAddressPage;
