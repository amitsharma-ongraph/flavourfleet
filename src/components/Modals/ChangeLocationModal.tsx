import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import AddressCard from "../UserPanel/Cards/AddressCard";
import { useStore } from "@/hooks/useStore";
import { Address } from "../../../packages/types/entity/Address";
import { useModal } from "@/hooks/useModal";

const ChangeLocationModal: FC = () => {
  const {
    state: { user, liveLocation },
    dispatch,
  } = useStore();
  const { setModal } = useModal();
  const [modalAddress, setModalAddress] = useState<Address | null>(null);

  const changeSelectedLocation = async (): Promise<Notification | void> => {
    if (modalAddress) {
      dispatch({
        type: "setSelectedLocation",
        data: modalAddress,
      });
      setModal(null);
    }
  };
  return (
    <Box h={"390px"} overflowY={"scroll"}>
      <Text>Current Address</Text>
      <Flex flexWrap={"wrap"}>
        {liveLocation && (
          <AddressCard
            address={liveLocation}
            key={liveLocation._id}
            activeAddress={modalAddress?._id}
            setActiveAddress={setModalAddress}
          />
        )}
      </Flex>
      <Text>Saved Address</Text>
      <Flex flexWrap={"wrap"}>
        {user?.addressList &&
          user.addressList.map((add) => (
            <AddressCard
              address={add}
              key={add._id}
              activeAddress={modalAddress?._id}
              setActiveAddress={setModalAddress}
            />
          ))}
      </Flex>
      <Flex
        w={"300px"}
        h={"50px"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        px={3}
      >
        <Button
          bg={"brand.400"}
          color={"white"}
          sx={{
            ":hover": {
              bgColor: "brand.600",
            },
          }}
          onClick={changeSelectedLocation}
        >
          Select
        </Button>
      </Flex>
    </Box>
  );
};

export default ChangeLocationModal;
