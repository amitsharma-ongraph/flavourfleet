import AddressList from "@/components/AddressList";
import { useAddAdressModal } from "@/components/Modals/AddAddressModal";
import { ProfileDashboardLayout } from "@/components/layouts/ProfileDashboardLayout";
import { useModal } from "@/hooks/useModal";
import { useUser } from "@/hooks/useUser";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { BiPlusCircle } from "react-icons/bi";

function AddressPage() {
  const { setModal } = useModal();
  const { AddAddressModal } = useAddAdressModal();
  const { user } = useUser();
  const { push } = useRouter();
  return (
    <Box px={4} py={4}>
      <Flex direction={"row"} justifyContent={"flex-end"}>
        <Flex
          direction={"row"}
          columnGap={4}
          px={2}
          py={2}
          alignItems={"center"}
          bg={"brand.100"}
          cursor={"pointer"}
          borderRadius={"5px"}
          onClick={() => {
            // setModal(AddAddressModal);
            push("/profile/address/add");
          }}
        >
          <Icon as={BiPlusCircle} />
          <Text>Add Address</Text>
        </Flex>
      </Flex>
      <Box w={"full"} my={5}>
        <AddressList addressList={user?.addressList}></AddressList>
      </Box>
    </Box>
  );
}

AddressPage.getLayout = (page: ReactElement) => (
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
    const res = await axios.get(
      process.env.BASE_API_URL + "/auth/authenticate",
      {
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie,
        },
      }
    );
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

export default AddressPage;
