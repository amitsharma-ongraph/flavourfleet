import { AppLayout } from "@/components/layouts/AppLayout";
import { ReactElement } from "react";

export default function HomePage() {
  return <>home page</>;
}

HomePage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;
