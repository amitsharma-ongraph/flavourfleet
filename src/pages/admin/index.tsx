import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Box } from "@chakra-ui/react";
import { useAdmin } from "@/hooks/useAdmin";
import RestaurantApplicationCard from "@/components/cards/RestroApplication";

const AdminPage = () => {
  const { getApplications } = useAdmin();

  const restaurants = getApplications();

  return (
    <Box p={5}>
      {restaurants.map((restro) => (
        <RestaurantApplicationCard
          key={restro._id}
          restaurant={restro}
        ></RestaurantApplicationCard>
      ))}
    </Box>
  );
};

AdminPage.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const homeRedirect = {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };

  const { req } = context;
  try {
    const res = await axios.get(process.env.BASE_API_URL + "/auth/isAdmin", {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie,
      },
    });
    const data = await res.data;
    if (!data.success) {
      return homeRedirect;
    }
    return {
      props: {},
    };
  } catch (error) {
    return homeRedirect;
  }

  return {
    props: {},
  };
};

export default AdminPage;
