import { RestroDashboardLayout } from "@/components/layouts/RestroDashboardLayout";
import React, { ReactElement } from "react";

function RestroPaymentPage() {
  return <div></div>;
}
RestroPaymentPage.getLayout = (page: ReactElement) => (
  <RestroDashboardLayout>{page}</RestroDashboardLayout>
);

export default RestroPaymentPage;
