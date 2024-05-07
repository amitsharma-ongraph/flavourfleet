import React, { FC, useState } from "react";
import { Modal } from "../../../packages/types/common/modal";
import { Flex, FormControl, Input } from "@chakra-ui/react";
import { Notification } from "../../../packages/types/common/Notification";
import { useAddress } from "@/hooks/useAddress";
import { Address } from "../../../packages/types/entity/Address";

interface IAddAddressModalReturns {
  AddAddressModal: Modal;
}

export const useAddAdressModal = (): IAddAddressModalReturns => {
  const { addAddress } = useAddress();
  const handleSubmit = async (): Promise<Notification | void> => {
    try {
      let addressForm = document.getElementById(
        "addressForm"
      ) as HTMLFormElement | null;
      if (addressForm) {
        const { addressLine, city, country, zipCode } = Object.fromEntries(
          new FormData(addressForm).entries()
        );
        console.log("city---", city);
        const address: Address = {
          city: city.toString(),
          country: country.toString(),
          zipCode: zipCode.toString(),
          addressLine: addressLine.toString(),
        };
        return await addAddress(address);
      } else {
        return {
          type: "error",
          title: "error while accesing the form",
        };
      }
    } catch (error) {
      return {
        type: "error",
        title: "unexpected error occured",
      };
    }
  };

  const ModalBody: FC = () => {
    const [addressLine, setAddressLine] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [pinCode, setPinCode] = useState<string>("");

    return (
      <Flex direction="column" as={"form"} id="addressForm">
        <FormControl isRequired>
          <Input
            mb={4}
            placeholder="Address Line"
            value={addressLine}
            onChange={(e) => setAddressLine(e.target.value)}
            name="addressLine"
          />
        </FormControl>
        <FormControl isRequired>
          <Input
            mb={4}
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            name="city"
          />
        </FormControl>
        <FormControl isRequired>
          <Input
            mb={4}
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            name="country"
          />
        </FormControl>
        <FormControl isRequired>
          <Input
            mb={4}
            placeholder="Postal Code"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            name="zipCode"
          />
        </FormControl>
      </Flex>
    );
  };

  const AddAddressModal: Modal = {
    title: "Add New Address",
    ModalBody,
    primaryAction: {
      text: "Add",
      fn: handleSubmit,
    },
    secondaryActionCancel: true,
  };

  return {
    AddAddressModal,
  };
};
