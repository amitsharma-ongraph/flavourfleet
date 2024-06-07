import { useStore } from "@/hooks/useStore";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { RiArrowDropDownFill } from "react-icons/ri";
import { Address } from "../../../packages/types/entity/Address";
import { Modal } from "../../../packages/types/common/modal";
import { Notification } from "../../../packages/types/common/Notification";
import { useModal } from "@/hooks/useModal";
import AddressCard from "./Cards/AddressCard";
import ChangeLocationModal from "../Modals/ChangeLocationModal";

function LocationSelector() {
  const {
    state: { selectedLocation },
  } = useStore();
  const { setModal } = useModal();

  const SetLocatoinModal: Modal = {
    title: "Select Address",
    ModalBody: ChangeLocationModal,
  };
  return (
    <Flex
      h={"40px"}
      w={{ base: "100%", lg: "40%" }}
      bg={"brand.50"}
      borderRadius={"10px"}
      px={3}
      alignItems={"center"}
      columnGap={3}
    >
      <Icon as={HiLocationMarker} fontSize={"1.2em"} color={"brand.900"} />
      <Flex flex={1} flexDirection={"column"}>
        <Text fontSize={"0.9em"} color={"brand.900"} fontWeight={700}>
          {selectedLocation?.addressLine.split(",")[0]}
        </Text>
        <Text fontSize={"0.8em"} color={"brand.900"} fontWeight={400}>
          {selectedLocation?.city + " , " + selectedLocation?.zipCode}
        </Text>
      </Flex>
      <Icon
        as={RiArrowDropDownFill}
        fontSize={"2em"}
        color={"brand.900"}
        justifySelf={"flex-end"}
        cursor={"pointer"}
        onClick={() => {
          setModal(SetLocatoinModal);
        }}
      />
    </Flex>
  );
}

export default LocationSelector;
