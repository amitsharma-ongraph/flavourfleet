import React, { FC } from "react";
import { UserPanelRestro } from "../../../../packages/types/entity/UserPanelRestro";
import { Box, Flex, Grid, Heading, Icon, Image, Text } from "@chakra-ui/react";
import { BiHeart, BiSolidOffer, BiStar } from "react-icons/bi";
import { useRouter } from "next/router";

interface Props {
  restaurant: UserPanelRestro;
}

const UserPanleRestroCard: FC<Props> = ({ restaurant }) => {
  const { push } = useRouter();
  return (
    <Grid
      flex={1}
      minWidth={"300px"}
      maxWidth={"33%"}
      h={"280px"}
      boxShadow={"lg"}
      border={"solid"}
      borderColor={"brand.100"}
      borderWidth={"1px"}
      borderRadius={"20px"}
      gridTemplateRows={"180px 65px 35px"}
      overflow={"hidden"}
      position={"relative"}
      cursor={"pointer"}
      onClick={() => {
        push(`/restaurant-menu/${restaurant.id}`);
      }}
    >
      <Box bg={"brand.50"} position={"relative"}>
        <Image
          src={restaurant.logoUrl}
          w={"full"}
          position={"absolute"}
          bottom={0}
        />
        {/* <Flex
          position={"absolute"}
          right={"10px"}
          top={"10px"}
          h={"30px"}
          w={"30px"}
          bg={"white"}
          borderRadius={"15px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Icon as={BiHeart}></Icon>
        </Flex> */}
      </Box>
      <Flex
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={4}
        position={"relative"}
      >
        <Flex
          position={"absolute"}
          height={"20px"}
          width={"50%"}
          top={"-20px"}
          bg={"white"}
          left={0}
          clipPath=" polygon(90% 0, 100% 100%, 100% 100%, 0 100%, 0 0)"
        >
          <Flex
            flexDirection={"row"}
            columnGap={1}
            alignItems={"center"}
            h={"full"}
            w={"full"}
            px={4}
            pt={1}
          >
            <Box
              h={"5px"}
              w={"5px"}
              borderRadius={"5px"}
              bg={"brand.900"}
            ></Box>
            <Text fontSize={"0.8em"} color={"brand.900"}>
              2.5km
            </Text>
            <Text fontSize={"0.8em"} color={"brand.900"}>
              40 minutes
            </Text>
          </Flex>
        </Flex>
        <Flex
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          w={"full"}
        >
          <Heading color="brand.900" fontSize={"1.2em"}>
            {restaurant.name}
          </Heading>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            bg={"brand.900"}
            p={"2px"}
            borderRadius={"5px"}
            columnGap={1}
          >
            <Text
              color={"white"}
              h={"full"}
              textAlign={"center"}
              fontSize={"0.8em"}
            >
              {restaurant.ratings}
            </Text>
            <Icon color={"white"} as={BiStar} fontSize={"0.8em"} />
          </Flex>
        </Flex>
        <Flex
          flexDirection={"row"}
          alignItems={"center"}
          columnGap={"4"}
          w={"full"}
        >
          {restaurant.tags.map((tag) => (
            <Flex
              flexDirection={"row"}
              columnGap={1}
              alignItems={"center"}
              key={tag}
            >
              <Box
                h={"5px"}
                w={"5px"}
                borderRadius={"5px"}
                bg={"brand.600"}
              ></Box>
              <Text fontSize={"0.8em"} color={"brand.600"}>
                {tag}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Flex
        borderTop={"solid"}
        borderTopColor={"brand.100"}
        borderTopWidth={"1px"}
        flexDirection={"row"}
        alignItems={"center"}
        columnGap={2}
        px={4}
      >
        <Icon as={BiSolidOffer} color={"brand.900"}></Icon>
        <Text color={"brand.900"} fontSize={"0.8em"}>
          Get a 40% discount, up to ₹100, on orders above ₹250.
        </Text>
      </Flex>
    </Grid>
  );
};

export default UserPanleRestroCard;
