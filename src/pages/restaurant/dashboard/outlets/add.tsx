import AddAddressMap from "@/components/Map/AddAddressMap";
import { useAddress } from "@/hooks/useAddress";
import { useRestaurant } from "@/hooks/useRestaurant";
import { Box } from "@chakra-ui/react";
import React from "react";

function AddOutletPage() {
  const { addOutlet } = useRestaurant();
  return (
    <Box h={"100vh"} w={"100vw"} overflow={"hidden"}>
      <AddAddressMap handleAddAddress={addOutlet} />
    </Box>
  );
}

export default AddOutletPage;
