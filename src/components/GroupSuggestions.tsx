import useSearch from "@/hooks/useSearch";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface IGroup {
  groupName: string;
  imageUrl: string;
}

function GroupSuggestions() {
  const { getGroupSuggestions } = useSearch();
  const [suggestions, setSuggestions] = useState<IGroup[]>([]);

  useEffect(() => {
    (async () => {
      setSuggestions(await getGroupSuggestions());
    })();
  }, []);

  return (
    <Grid gridTemplateRows={"20px auto"} h={"300px"} w={"full"} mt={5} p={5}>
      <Text as={"h4"} fontWeight={400} color={"brand.900"}>
        Popular Dishes
      </Text>
      <Flex
        direction={"column"}
        py={2.5}
        rowGap={2.5}
        flexWrap={"wrap"}
        h={"280px"}
        alignItems={"flex-start"}
        columnGap={2.5}
        overflowX={"scroll"}
      >
        {suggestions &&
          suggestions.map((suggestion, i) => (
            <Grid
              w={"150px"}
              h={"125px"}
              gridTemplateRows={"100px 25px"}
              key={i}
            >
              <Flex justifyContent={"center"} alignItems={"center"}>
                <Box
                  h={"90px"}
                  w={"90px"}
                  overflow={"hidden"}
                  borderRadius={"50%"}
                >
                  {" "}
                  <Image h={"full"} w={"full"} src={suggestion.imageUrl} />
                </Box>
              </Flex>
              <Flex justifyContent={"center"} alignItems={"center"}>
                <Text as={"h6"} fontWeight={400} color={"brand.900"}>
                  {suggestion.groupName}
                </Text>
              </Flex>
            </Grid>
          ))}
      </Flex>
    </Grid>
  );
}

export default GroupSuggestions;
