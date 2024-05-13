import { ProfileDashboardLayout } from "@/components/layouts/ProfileDashboardLayout";
import axios from "axios";
import { GetServerSideProps } from "next";
import React, { ReactElement } from "react";

function OrdersPage() {
  return <div>Address</div>;
}

OrdersPage.getLayout = (page: ReactElement) => (
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

export default OrdersPage;
