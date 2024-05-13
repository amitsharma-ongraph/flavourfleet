import { RestroDashboardLayout } from "@/components/layouts/RestroDashboardLayout";
import React, { ReactElement } from "react";

function RestroOrdersPage() {
  return <div></div>;
}
RestroOrdersPage.getLayout = (page: ReactElement) => (
  <RestroDashboardLayout>{page}</RestroDashboardLayout>
);

export default RestroOrdersPage;
