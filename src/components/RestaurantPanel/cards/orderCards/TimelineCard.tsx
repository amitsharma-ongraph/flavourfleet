import { Box, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { BiCheck } from "react-icons/bi";

interface ITimeLIne {
  placed?: string;
  accepted?: string;
  preparing?: string;
  ready?: string;
  out_for_delivery?: string;
  delivered?: string;
  rejected?: string;
}

const TimelineCard: FC<{ timeline: any }> = ({ timeline }) => {
  const timeLineArray = Object.keys(timeline).map((key) => ({
    event: key,
    time: new Date(timeline[key]),
  }));
  const sortedTimeLine = timeLineArray.sort(
    (a: any, b: any) => a.time - b.time
  );
  return (
    <Flex w={"full"} minH={"30px"} flexDirection={"column"}>
      {sortedTimeLine.map((timeEvent, i) => (
        <>
          {i !== 0 && i !== sortedTimeLine.length && (
            <Flex h={"10px"} w={"15px"} justifyContent={"center"}>
              <Box h={"full"} w={"2px"} bg={"brand.900"}></Box>
            </Flex>
          )}
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"0.8em"}
            color={"brand.900"}
          >
            <Grid
              gridTemplateColumns={"15px auto"}
              alignItems={"center"}
              columnGap={1}
            >
              <Icon as={BiCheck}></Icon>
              <Text>{timeEvent.event}</Text>
            </Grid>
            <Text>{timeEvent.time.toLocaleString()}</Text>
          </Flex>
        </>
      ))}
    </Flex>
  );
};

export default TimelineCard;
