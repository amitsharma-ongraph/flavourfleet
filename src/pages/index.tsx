import GroupSuggestions from "@/components/GroupSuggestions";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Box } from "@chakra-ui/react";
import { ReactElement } from "react";

export default function HomePage() {
  return (
    <>
      <GroupSuggestions></GroupSuggestions>
      <Box h={"700px"} mt={20} w={"full"} bg={"brand.100"}></Box>
    </>
  );
}

HomePage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;
