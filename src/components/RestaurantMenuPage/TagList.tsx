import { Box, Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";

const TagList: FC<{ tags: string[] }> = ({ tags }) => {
  console.log("tags-->", tags);
  return (
    <Flex flexDirection={"row"} columnGap={1}>
      {tags.map((tag) => (
        <Flex
          flexDirection={"row"}
          columnGap={1}
          alignItems={"center"}
          key={tag}
        >
          <Box h={"5px"} w={"5px"} borderRadius={"5px"} bg={"brand.900"}></Box>
          <Text fontSize={"0.8em"} color={"brand.900"}>
            {tag}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default TagList;
