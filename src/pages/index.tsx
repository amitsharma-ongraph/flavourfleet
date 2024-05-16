import GroupSuggestions from "@/components/GroupSuggestions";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Box } from "@chakra-ui/react";
import { ReactElement } from "react";
import { RestroListUrls } from "../../packages/enums/RestroFetchUrls";
import CompleteRestroList from "@/components/UserPanel/Tables/CompleteRestroList";

export default function HomePage() {
  return (
    <>
      <GroupSuggestions></GroupSuggestions>
      <Box mt={8}></Box>
      <CompleteRestroList
        title="All Restaurants"
        fetchUrl={RestroListUrls.AllRestro}
      ></CompleteRestroList>
    </>
  );
}

HomePage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;
