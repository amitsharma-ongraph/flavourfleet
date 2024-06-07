import GroupSuggestions from "@/components/GroupSuggestions";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Box, Flex } from "@chakra-ui/react";
import { ReactElement } from "react";
import { RestroListUrls } from "../../packages/enums/RestroFetchUrls";
import CompleteRestroList from "@/components/UserPanel/Tables/CompleteRestroList";
import SearchBar from "@/components/SearchBar";
import LocationSelector from "@/components/UserPanel/LocationSelector";

export default function HomePage() {
  return (
    <>
      <Flex
        w={"full"}
        justifyContent={"center"}
        alignItems={"center"}
        px={5}
        display={{ sm: "flex", base: "flex", lg: "none" }}
        mt={8}
        flexDirection={"column"}
        columnGap={3}
        rowGap={3}
      >
        <LocationSelector />
        <SearchBar />
      </Flex>
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
