import GroupSuggestions from "@/components/GroupSuggestions";
import { AppLayout } from "@/components/layouts/AppLayout";
import { ReactElement } from "react";

export default function HomePage() {
  return (
    <>
      <GroupSuggestions></GroupSuggestions>
    </>
  );
}

HomePage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;
