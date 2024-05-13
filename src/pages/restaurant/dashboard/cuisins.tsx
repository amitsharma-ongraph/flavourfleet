import { RestroDashboardLayout } from "@/components/layouts/RestroDashboardLayout";
import React, { ReactElement } from "react";

function RestroCuisinsPage() {
  return <div></div>;
}
RestroCuisinsPage.getLayout = (page: ReactElement) => (
  <RestroDashboardLayout>{page}</RestroDashboardLayout>
);

export default RestroCuisinsPage;
