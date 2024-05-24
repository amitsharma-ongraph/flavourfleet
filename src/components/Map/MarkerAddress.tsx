import { Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Address } from "../../../packages/types/entity/Address";
import { CiGps, CiMapPin } from "react-icons/ci";

const MarkerAddress: FC<{
  coordinates: [number, number];
  setRedirectCoords: Dispatch<SetStateAction<[number, number] | null>>;
  userLocation: [number, number] | null;
}> = ({ coordinates, setRedirectCoords, userLocation }) => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [address, setAddress] = useState<Address | null>(null);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await axios.get(
        `https://eu1.locationiq.com/v1/reverse?key=pk.c3d20e5ada9b898b95c397b37b407cbb&lat=${coordinates[1]}&lon=${coordinates[0]}&format=json`
      );
      const { data } = res;
      const addresArray = data.display_name.split("_");
      const addressLine = data.display_name
        .split(",")
        .splice(0, 3)
        .reduce((s: string, w: string, i: number) => {
          if (i == addresArray.length + 1) return s + w;
          else return s + w + " , ";
        }, "");
      setAddress({
        addressLine,
        city: data.address.city,
        country: data.address.country,
        zipCode: data.address.postcode,
      });
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    })();
  }, [coordinates]);
  return (
    <Flex
      position="absolute"
      bottom={0}
      left={0}
      zIndex="10"
      w={"100vw"}
      justifyContent={"center"}
      alignItems={"center"}
      rowGap={4}
      flexDirection={"column"}
    >
      <Flex
        h={"40px"}
        borderRadius={"20px"}
        bg={"white"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        px={4}
        columnGap={4}
        color={"brand.900"}
        cursor={"pointer"}
        fontWeight={600}
        onClick={() => {
          setRedirectCoords(userLocation);
        }}
      >
        <Icon as={CiGps} fontSize={"1.2em"}></Icon>
        <Text>Use My Current Location</Text>
      </Flex>
      <Flex
        h={"130px"}
        minW={"400px"}
        maxW={"90%"}
        borderRadius={"20px"}
        bg={"white"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
      >
        {!loading && (
          <>
            <Flex
              alignItems={"center"}
              rowGap={2}
              color={"brand.900"}
              fontWeight={700}
            >
              <Icon as={CiMapPin} fontSize={"2em"}></Icon>
              <Flex flexDirection={"column"} rowGap={2}>
                <Text>{address?.addressLine}</Text>
                <Text>
                  {address?.city +
                    " , " +
                    address?.zipCode +
                    " , " +
                    address?.country}
                </Text>
              </Flex>
            </Flex>
            <Flex
              height={"40px"}
              w={"200px"}
              borderRadius={"20px"}
              bg={"brand.900"}
              justifyContent={"center"}
              alignItems={"center"}
              color={"white"}
              fontSize={"1.2em"}
              fontWeight={400}
              cursor={"pointer"}
            >
              Add This Address
            </Flex>
          </>
        )}
        {loading && <Spinner />}
      </Flex>
    </Flex>
  );
};

export default MarkerAddress;
