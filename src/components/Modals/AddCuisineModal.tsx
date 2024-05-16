import React, { FC, useState } from "react";
import { Modal } from "../../../packages/types/common/modal";
import { Flex, FormControl, Input } from "@chakra-ui/react";
import { Notification } from "../../../packages/types/common/Notification";
import { useRestaurant } from "@/hooks/useRestaurant";

interface ICuisineModalReturns {
  AddCuisineModal: Modal;
}

export const useAddCuisineModal = (): ICuisineModalReturns => {
  const { addCuisine } = useRestaurant();
  const handleSubmit = async (): Promise<Notification | void> => {
    try {
      let cuisineForm = document.getElementById(
        "cuisineForm"
      ) as HTMLFormElement | null;
      if (cuisineForm) {
        const { cuisineName } = Object.fromEntries(
          new FormData(cuisineForm).entries()
        );
        if(cuisineName&&cuisineName!=""){
        return await addCuisine(cuisineName.toString());
        }
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
    const [cuisineName, setCuisineName] = useState<string>("");

    return (
      <Flex direction="column" as={"form"} id="cuisineForm">
        <FormControl isRequired>
          <Input
            mb={4}
            placeholder="Cuisine Name"
            value={cuisineName}
            onChange={(e) => setCuisineName(e.target.value)}
            name="cuisineName"
          />
        </FormControl>
      </Flex>
    );
  };

  const AddCuisineModal: Modal = {
    title: "Add New Cuisine",
    ModalBody,
    primaryAction: {
      text: "Add",
      fn: handleSubmit,
    },
    secondaryActionCancel: true,
  };

  return {
    AddCuisineModal,
  };
};
