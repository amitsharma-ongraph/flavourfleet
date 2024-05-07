import { useState, useEffect, type FC, type PropsWithChildren } from "react";
import {
  Flex,
  Center,
  Icon,
  Stack,
  Text,
  CloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { Maybe } from "../../packages/types/common/maybe";
import { Nullable } from "../../packages/types/common/nullable";
import { Notification } from "../../packages/types/common/Notification";
import { NotificationContext } from "@/context/notficationContext";

var timeout: Maybe<NodeJS.Timeout>;

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [notification, setNotification] =
    useState<Nullable<Notification>>(null);

  useEffect(() => {
    if (notification) {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{
              y: "-100%",
            }}
            animate={{
              top: "15%",
            }}
            exit={{
              top: "-100%",
            }}
            transition={{
              duration: 1,
            }}
            style={{
              position: "fixed",
              zIndex: 99,
              pointerEvents: "none",
            }}
          >
            <Flex justifyContent="end" width="100vw" p={3}>
              <Flex
                direction={{ base: "column", sm: "row" }}
                width={{ base: "full", sm: "md" }}
                boxShadow={useColorModeValue("lg", "md-dark")}
                bgColor="white"
                borderRadius="sm"
                overflow="hidden"
                pointerEvents="all"
              >
                <Center
                  display={{ base: "none", sm: "flex" }}
                  bgColor={
                    notification.type === "error" ? "red.500" : "brand.800"
                  }
                  px="5"
                >
                  <Icon
                    as={
                      notification.type === "error" ? FiXCircle : FiCheckCircle
                    }
                    boxSize="10"
                    color="white"
                  />
                </Center>
                <Stack direction="row" p="4" spacing="3" flex="1">
                  <Stack spacing="2.5" flex="1">
                    <Stack spacing="1">
                      <Text fontSize="md" fontWeight={500} color="gray.900">
                        {notification.title}
                      </Text>
                      {notification.description && (
                        <Text fontSize="sm" color="gray.600">
                          {notification.description}
                        </Text>
                      )}
                    </Stack>
                  </Stack>
                  <CloseButton
                    _hover={{}}
                    transform="translateY(-6px)"
                    onClick={() => setNotification(null)}
                  />
                </Stack>
              </Flex>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </NotificationContext.Provider>
  );
};
