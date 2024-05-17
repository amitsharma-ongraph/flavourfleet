import { useState, createElement, type FC, useEffect } from "react";
import {
  Modal as __Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  SimpleGrid,
  GridItem,
  Text,
  ModalFooter,
  Heading,
  Box,
  Flex,
  Icon,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { BiX } from "react-icons/bi";
import { useModal } from "@/hooks/useModal";
import { useNotification } from "@/hooks/useNotification";

export const Modal: FC = () => {
  const { modal, setModal, modalLoading, setModalLoading } = useModal();
  const { setNotification } = useNotification();

  const onClose = () => {
    setModal(null);
  };

  return (
    <__Modal
      {...{
        isOpen: modal != null,
        onClose,
        scrollBehavior: "outside",
        size: "sm",
        px: 4,
      }}
    >
      <ModalOverlay backdropFilter={"blur(2.4px)"} />
      <ModalContent
        pos="relative"
        mx={4}
        rounded="sm"
        bg={"brand.50"}
        borderRadius={"20px"}
        w={"full"}
        maxH={"80vh"}
        overflow={"scroll"}
      >
        <Flex
          pos="absolute"
          top={0}
          left={0}
          w="full"
          justifyContent="end"
          px={4}
          pt={2}
        >
          <IconButton
            size="md"
            icon={<Icon as={BiX} fontSize="1.5rem" />}
            bgColor="transparent"
            color="black"
            _focus={{}}
            _hover={{}}
            _active={{}}
            aria-label="Close"
            onClick={onClose}
            rounded="sm"
          />
        </Flex>
        {modal?.cover && <Box pt={4}>{modal.cover}</Box>}
        <ModalBody pt={10}>
          <SimpleGrid columns={1} rowGap="3">
            <GridItem>
              <Heading
                size="lg"
                fontWeight={400}
                color="black"
                textColor={"brand.900"}
              >
                {modal?.title}
              </Heading>
            </GridItem>
            {modal?.description && (
              <GridItem>
                <Text color="brand.600">{modal.description}</Text>
              </GridItem>
            )}
            {modal?.ModalBody && <modal.ModalBody />}
          </SimpleGrid>
        </ModalBody>
        <ModalFooter pb={6}>
          {modal?.secondaryActionCancel && (
            <Button mr={3} onClick={() => onClose()}>
              Cancel
            </Button>
          )}
          {modal?.secondaryAction && (
            <Button
              mr={3}
              onClick={async () => {
                if (modal.secondaryAction?.fn) {
                  const notif = await modal.secondaryAction.fn();
                  onClose();
                  if (notif) setNotification(notif);
                }
              }}
            >
              {modal.secondaryAction.text}
            </Button>
          )}
          {modal?.primaryAction && (
            <Button
              onClick={async () => {
                if (modal.primaryAction?.fn) {
                  const notif = await modal.primaryAction.fn();
                  onClose();
                  if (notif) setNotification(notif);
                }
              }}
              isLoading={modalLoading}
              loadingText={modal.primaryAction.loadingText}
            >
              {modal.primaryAction.text}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </__Modal>
  );
};
