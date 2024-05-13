import React, { FC, useState } from "react";
import { Modal } from "../../../packages/types/common/modal";
import { Flex, FormControl, Input } from "@chakra-ui/react";
import { Notification } from "../../../packages/types/common/Notification";
import { useRestaurant } from "@/hooks/useRestaurant";

interface IMenuGroupModalReturns {
  AddMenuGroupModal: Modal;
}

export const useAddMenuGroupModal = (): IMenuGroupModalReturns => {
  const { addMenuGroup } = useRestaurant();
  const handleSubmit = async (): Promise<Notification | void> => {
    try {
      let menuGroupForm = document.getElementById(
        "menuGroupForm"
      ) as HTMLFormElement | null;
      if (menuGroupForm) {
        const { groupName } = Object.fromEntries(
          new FormData(menuGroupForm).entries()
        );
        return await addMenuGroup(groupName.toString());
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
    const [groupName, setGroupName] = useState<string>("");

    return (
      <Flex direction="column" as={"form"} id="menuGroupForm">
        <FormControl isRequired>
          <Input
            mb={4}
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            name="groupName"
          />
        </FormControl>
      </Flex>
    );
  };

  const AddMenuGroupModal: Modal = {
    title: "Add New Address",
    ModalBody,
    primaryAction: {
      text: "Add",
      fn: handleSubmit,
    },
    secondaryActionCancel: true,
  };

  return {
    AddMenuGroupModal,
  };
};
