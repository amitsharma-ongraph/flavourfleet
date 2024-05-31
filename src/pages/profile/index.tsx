import { ProfileDashboardLayout } from "@/components/layouts/ProfileDashboardLayout";
import { useUser } from "@/hooks/useUser";
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
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

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const logInRedirect = {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };

  const { req } = context;

  try {
    const res: AxiosResponse = await axios.get(
      process.env.BASE_API_URL + "/auth/authenticate",
      {
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie,
        },
      }
    );
    console.log("respones received -->", res.config.headers);
    const data = await res.data;
    if (!data.success) {
      return logInRedirect;
    }
  } catch (error) {
    return logInRedirect;
  }

  return {
    props: {},
  };
};

export default ProfilePage;
