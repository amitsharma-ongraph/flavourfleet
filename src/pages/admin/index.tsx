import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { RestaurantApplication } from "../../../packages/types/entity/RestaurantApplication";
import { Box } from "@chakra-ui/react";
import RestaurantApplicationCard from "@/components/cards/RestroApplication";

interface Props {
  restaurants: RestaurantApplication[];
}
const AdminPage = ({ restaurants }: Props) => {
  return (
    <Box p={5}>
      {restaurants.map((restro) => (
        <RestaurantApplicationCard
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

    const restroRes = await axios.get(
      process.env.BASE_API_URL + "/admin/restaurants/applications",
      {
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie,
        },
      }
    );
    const {
      data: { restroList },
    } = restroRes;

    if (!restroList) {
      return {
        props: {
          restaurants: [],
        },
      };
    } else {
      return {
        props: {
          restaurants: restroList,
        },
      };
    }
  } catch (error) {
    return homeRedirect;
  }

  return {
    props: {},
  };
};

export default AdminPage;
