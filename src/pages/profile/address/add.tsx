import AddAddressMap from "@/components/Map/AddAddressMap";
import { useAddress } from "@/hooks/useAddress";
import { Box } from "@chakra-ui/react";
import React from "react";

function AddAddressPage() {
  const { addAddress } = useAddress();
  return (
    <Box h={"100vh"} w={"100vw"} overflow={"hidden"}>
      <AddAddressMap handleAddAddress={addAddress} />
    </Box>
  );
}

export default AddAddressPage;
