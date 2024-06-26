import { Box, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { BiCross, BiSad, BiSort } from "react-icons/bi";
import { IoMdRemove } from "react-icons/io";
import { RiArrowDownCircleFill } from "react-icons/ri";
import RestroPlaceholderList from "../../placeholders/RestroPlaceholderList";
import { axios } from "../../../../packages/axios";
import { UserPanelRestro } from "../../../../packages/types/entity/UserPanelRestro";
import UserPanleRestroCard from "../Cards/UserPanleRestroCard";
import { useStore } from "@/hooks/useStore";

interface CompleteRestroListProps {
  title: string;
  fetchUrl: string;
}

interface FilterContProps {
  value: string;
}

const CompleteRestroList: FC<CompleteRestroListProps> = ({
  title,
  fetchUrl,
}) => {
  const {
    state: { user, selectedLocation },
  } = useStore();

  const [filters, setFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [restaurants, setRestaurants] = useState<UserPanelRestro[]>([]);

  const getFetchParams = () => {
    const queryString = filters.reduce((q, key) => {
      return q + `&${key}=true`;
    }, "");
    return queryString;
  };

  useEffect(() => {
    if (!selectedLocation) return;
    setLoading(true);
    (async () => {
      const longitude = selectedLocation.location.coordinates[0];
      const latitude = selectedLocation.location.coordinates[1];
      try {
        const fetchParam = getFetchParams();

        const res = await axios.get(
          fetchUrl + `?longitude=${longitude}&latitude=${latitude}` + fetchParam
        );
        const { data } = res;
        if (data.success) {
          if (data.allRestaurants.length === 0) {
            setLoading(false);
          }
          setRestaurants(data.allRestaurants);
        }
      } catch (error) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    })();
  }, [fetchUrl, filters, selectedLocation]);

  useEffect(() => {
    if (restaurants.length > 0) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [restaurants]);

  ////////filter option component ------------------------------------------/////////
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
  ////filter option compentet -------------------------------------------------------------->/////

  return (
    <Box w={"full"}>
      <Grid
        w={"full"}
        h={"30px"}
        gridTemplateColumns={"1fr auto 1fr"}
        columnGap={2}
      >
        <Flex alignItems={"center"}>
          <Box w={"full"} h={"2px"} bg={"brand.100"}></Box>
        </Flex>
        <Flex alignItems={"center"}>
          <Text as={"h4"} fontWeight={400} color={"brand.900"}>
            {title}
          </Text>
        </Flex>
        <Flex alignItems={"center"}>
          <Box w={"full"} h={"2px"} bg={"brand.100"}></Box>
        </Flex>
      </Grid>

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
          <Text color={"brand.900"}>Nearest and Fast</Text>
        </FilterOptionCont>
        <FilterOptionCont value="offers">
          <Text color={"brand.900"}>Great Offers</Text>
        </FilterOptionCont>
        <FilterOptionCont value="veg">
          <Text color={"brand.900"}>Veg Only</Text>
        </FilterOptionCont>
        <FilterOptionCont value="rating">
          <Text color={"brand.900"}>Rating 4.0+</Text>
        </FilterOptionCont>
        <FilterOptionCont value="ordered">
          <Text color={"brand.900"}>Previously Ordered</Text>
        </FilterOptionCont>
      </Flex>

      {restaurants.length > 0 && !loading && (
        <>
          <Flex
            flexWrap={"wrap"}
            flexDirection={"row"}
            columnGap={5}
            p={8}
            rowGap={8}
          >
            {restaurants.map((restro) => (
              <UserPanleRestroCard key={restro.id} restaurant={restro} />
            ))}
          </Flex>
        </>
      )}
      {!loading && restaurants.length === 0 && (
        <>
          <Flex
            h={"300px"}
            w={"full"}
            flexDirection={"row"}
            justifyContent={"center"}
            columnGap={4}
            alignItems={"center"}
          >
            <Icon as={BiSad} fontSize={"2em"} color={"brand.900"}></Icon>
            <Text fontSize={"2em"} color={"brand.900"}>
              No Results Found
            </Text>
          </Flex>
        </>
      )}
      {loading && <RestroPlaceholderList />}
    </Box>
  );
};

export default CompleteRestroList;
