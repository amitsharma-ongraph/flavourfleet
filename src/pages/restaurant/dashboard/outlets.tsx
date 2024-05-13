import { RestroDashboardLayout } from "@/components/layouts/RestroDashboardLayout";
import React, { ReactElement } from "react";

function RestroOutletsPage() {
  return <div></div>;
}
RestroOutletsPage.getLayout = (page: ReactElement) => (
  <RestroDashboardLayout>{page}</RestroDashboardLayout>
);

export default RestroOutletsPage;
