import { AppLayout } from "@/components/layouts/AppLayout";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import CompleteRestroList from "@/components/UserPanel/Tables/CompleteRestroList";

function SearchPage() {
  const router = useRouter();
  const keyword = router.query.keyword as string;
  return (
    <>
      <Box mt={4}></Box>
      <CompleteRestroList
        title={`Showing results for "${keyword}"`}
        fetchUrl={`/search/${keyword}`}
      />
    </>
  );
}

SearchPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default SearchPage;
