import { ProfileDashboardLayout } from "@/components/layouts/ProfileDashboardLayout";
import React, { ReactElement } from "react";

function PaymentPage() {
  return <div>Address</div>;
}

PaymentPage.getLayout = (page: ReactElement) => (
  <ProfileDashboardLayout>{page}</ProfileDashboardLayout>
);


export default PaymentPage;
