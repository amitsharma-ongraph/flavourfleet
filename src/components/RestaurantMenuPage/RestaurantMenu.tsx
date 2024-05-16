import React, { FC, PropsWithChildren, useState } from "react";
import { Address } from "../../../packages/types/entity/Address";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import MenuItemPlaceholderCard from "../placeholders/MenuItemPlaceholderCard";
import { BiSort, BiStar, BiStopwatch } from "react-icons/bi";
import TagList from "./TagList";
import { TestOffers } from "../../../packages/constants/offers";
import OfferCard from "./OfferCard";
import { IoMdRemove } from "react-icons/io";
import { RiArrowDownCircleFill } from "react-icons/ri";
import MenuItemsTable from "../UserPanel/Tables/MenuItemsTable";

interface IMenuItem {
  name: string;
  price: number;
  ratings: string;
  imageUrl: string;
  totalReview: number;
  description: string;
  groupName: string;
  id: string;
}

interface RestroMenuResult {
  id: string;
  name: string;
  outlets: Address[];
  cuisins: string[];
  menuItems: IMenuItem[];
  logoUrl: string;
  ratings: string;
  menuGroups: string[];
}

interface FilterContProps {
  value: string;
}

interface Props {
  restaurant: RestroMenuResult;
}

const RestaurantMenu: FC<Props> = ({ restaurant }) => {
  const [filters, setFilters] = useState<string[]>([]);

  const getTotalRatings = () => {
    var ratings = 0;
    restaurant.menuItems.forEach((item) => {
      ratings += item.totalReview;
    });
    return ratings;
  };

  const getTimeDistance = () => {
    return {
      time: 32,
      distance: 2.5,
    };
  };

  //------------------------------------------------------>
  const FilterOptionCont: FC<PropsWithChildren<FilterContProps>> = ({
    children,
    value,
  }) => {
    const isSelected = filters.includes(value);

    const handleClick = () => {
      if (!isSelected) {
        setFilters((prev) => [...filters, value]);
      }
    };

    const handleRemove = () => {
      setFilters((prev) => [...prev.filter((val) => val !== value)]);
    };
    return (
      <Flex
        direction={"row"}
        columnGap={1}
        alignItems={"center"}
        boxShadow={"xl"}
        p={1}
        bg={isSelected ? "brand.100" : "white"}
        borderRadius={"10px"}
        border={"solid"}
        borderColor={"brand.50"}
        borderWidth={"1px"}
        minW={"fit-content"}
        cursor={"pointer"}
        onClick={handleClick}
      >
        {children}
        {isSelected && (
          <Icon
            as={IoMdRemove}
            color={"brand.900"}
            onClick={handleRemove}
          ></Icon>
        )}
      </Flex>
    );
  };
  //------------------------------------------------------------>
  return (
    <>
      <Flex
        w={"full"}
        flexDirection={{ base: "column", md: "row" }}
        rowGap={4}
        columnGap={4}
        p={4}
        alignItems={"center"}
      >
        <Flex
          h={"150px"}
          w={"full"}
          alignItems={{ base: "center", md: "flex-start" }}
          justifyContent={"space-evenly"}
          flexDirection={"column"}
          borderRadius={"20px"}
          px={{ base: 0, md: 4 }}
        >
          <Box h={"35px"} bg={"white"} borderRadius={"17.5px"}>
            <Text fontSize={"1.8em"} fontWeight={600} color={"brand.900"}>
              {restaurant.name}
            </Text>
          </Box>
          <TagList tags={restaurant.cuisins}></TagList>
          <Flex flexDirection={"row"} columnGap={1} alignItems={"center"}>
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
            <Box h={"20px"} bg={"white"} borderRadius={"10px"}>
              <Text fontSize={"08.em"} color={"brand.900"}>
                {getTotalRatings()} ratings{" "}
              </Text>
            </Box>
          </Flex>
          <Flex flexDirection={"row"} columnGap={4}>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              bg={"brand.50"}
              p={"2px"}
              borderRadius={"5px"}
              columnGap={1}
            >
              <Icon color={"brand.900"} as={BiStopwatch} fontSize={"0.8em"} />
              <Text color={"brand.900"} textAlign={"center"} fontSize={"0.8em"}>
                {getTimeDistance().time} mins
              </Text>
              <Box
                h={"5px"}
                w={"5px"}
                borderRadius={"5px"}
                bg={"brand.900"}
              ></Box>
              <Text color={"brand.900"} textAlign={"center"} fontSize={"0.8em"}>
                {getTimeDistance().distance} km
              </Text>
            </Flex>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              bg={"brand.50"}
              p={"2px"}
              borderRadius={"5px"}
              columnGap={1}
            >
              <Text color={"brand.900"} textAlign={"center"} fontSize={"0.8em"}>
                {restaurant.outlets[0].addressLine}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          h={{ base: "120px", md: "150px" }}
          w={"full"}
          alignItems={"center"}
          justifyContent={"center"}
          overflow={"hidden"}
          borderRadius={"20px"}
        >
          <Flex
            h={"full"}
            w={"full"}
            flexDirection={"column"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
          >
            <Flex
              h={"60px"}
              w={"full"}
              flexDirection={"row"}
              overflowX={"scroll"}
              columnGap={4}
              px={2}
              justifyContent={{ base: "flex-start", md: "center" }}
            >
              {TestOffers.map((offer) => (
                <OfferCard offer={offer} />
              ))}
            </Flex>
            <Flex
              direction={"row"}
              h={"40px"}
              alignItems={"center"}
              px={4}
              columnGap={2.5}
              overflowX={"scroll"}
              mt={2.5}
            >
              <FilterOptionCont value="sort">
                <Icon as={BiSort} color={"brand.900"}></Icon>
                <Text color={"brand.900"}>Sort</Text>
                <Icon as={RiArrowDownCircleFill} color={"brand.900"}></Icon>
              </FilterOptionCont>
              <FilterOptionCont value="nearest">
                <Text color={"brand.900"}>Best Sellers</Text>
              </FilterOptionCont>
              <FilterOptionCont value="offers">
                <Text color={"brand.900"}>Rated 4+</Text>
              </FilterOptionCont>
              <FilterOptionCont value="veg">
                <Text color={"brand.900"}>Veg Only</Text>
              </FilterOptionCont>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <MenuItemsTable
        menuItemlist={restaurant.menuItems}
        groupNames={restaurant.menuGroups}
      />
    </>
  );
};

export default RestaurantMenu;
