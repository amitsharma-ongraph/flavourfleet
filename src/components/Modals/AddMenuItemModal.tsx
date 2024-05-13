import React, { ChangeEvent, FC, useState } from "react";
import { Modal } from "../../../packages/types/common/modal";
import { Flex, FormControl, FormLabel, Image, Input } from "@chakra-ui/react";
import { Notification } from "../../../packages/types/common/Notification";
import { useRestaurant } from "@/hooks/useRestaurant";

interface IAddMenuItemModalReturns {
  AddMenuItemModal: Modal;
}

export const useAddMenuItemModal = (activeGroup:string): IAddMenuItemModalReturns => {
  const { addMenuItem } = useRestaurant();
  const handleSubmit = async (): Promise<Notification | void> => {
    try {
      let menuItemForm = document.getElementById(
        "menuItemForm"
      ) as HTMLFormElement | null;
      if (menuItemForm) {
        const { name, description, price, imageFile } = Object.fromEntries(
          new FormData(menuItemForm).entries()
        );
        return await addMenuItem({
          name: name as string,
          description: description as string,
          price: parseInt(price.toString()) as number,
          imageFile: imageFile as File,
          groupName:activeGroup
        });
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
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | undefined>();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setImageFile(file || undefined);
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <>
        <Flex direction="column" as={"form"} id="menuItemForm">
          <FormControl isRequired>
            <Input
              mb={4}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
          </FormControl>
          <FormControl isRequired>
            <Input
              mb={4}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
            />
          </FormControl>
          <FormControl isRequired>
            <Input
              mb={4}
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              name="price"
            />
          </FormControl>
          <FormControl id="restaurantImage" flex="1">
            <FormLabel>Recepie Image</FormLabel>
            <Input type="file" name="imageFile" onChange={handleFileChange} />
          </FormControl>
        </Flex>
        <Flex direction="row" w="full" justifyContent="flex-start">
          {imageUrl && <Image src={imageUrl} alt="Preview" h={"80px"}></Image>}
        </Flex>
      </>
    );
  };

  const AddMenuItemModal: Modal = {
    title: "Add New Item",
    ModalBody,
    primaryAction: {
      text: "Add",
      fn: handleSubmit,
    },
    secondaryActionCancel: true,
  };

  return {
    AddMenuItemModal,
  };
};
