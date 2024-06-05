import { ProfileDashboardLayout } from "@/components/layouts/ProfileDashboardLayout";
import { useUser } from "@/hooks/useUser";
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";

import React, { ReactElement } from "react";

function ProfilePage() {
  const { user, logOut, userLoaded } = useUser();
  return (
    <>
      <Flex w="100%" h={"80vh"} align="center" justify="center">
        {userLoaded && (
          <Box>
            <Box
              maxW="md"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
            >
              <Flex align="center" p="4">
                <Avatar size="md" name={user?.name} bgColor={"brand.700"} />
                <Box ml="3">
                  <Text fontWeight="bold">{user?.name}</Text>
                  <Text fontSize="sm" color="brand.600">
                    {user?.email}
                  </Text>
                </Box>
              </Flex>
              <Box p="4">
                <Button
                  bgColor={"brand.500"}
                  onClick={logOut}
                  color={"white"}
                  sx={{
                    ":hover": {
                      bgColor: "brand.800",
                    },
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Flex>
      <Box
        w={"100%"}
        h={"80vh"}
        marginBottom={"100px"}
        bgColor={"brand.50"}
      ></Box>
    </>
  );
}

ProfilePage.getLayout = (page: ReactElement) => (
  <ProfileDashboardLayout>{page}</ProfileDashboardLayout>
);

export default ProfilePage;
