import { Logo } from "@/components/Logo";
import { useRestaurant } from "@/hooks/useRestaurant";
import { useStore } from "@/hooks/useStore";
import {
  Box,
  Center,
  VStack,
  Image,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { ChangeEvent, useState } from "react";
import { Address } from "../../../packages/types/entity/Address";
import AddAddressMap from "@/components/Map/AddAddressMap";

const WelcomePage = () => {
  const { signUp } = useRestaurant();
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [edit, setEdit] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageFile(file || undefined);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAddress = async (address: Address) => {
    setAddress(address);
    setEdit(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const { name } = Object.fromEntries(new FormData(form).entries());

    signUp({
      name: name as string,
      address,
      imageFile: imageFile as File,
    });
  };
  return (
    <>
      {!edit && (
        <Box p={4} w={"100%"} as={"form"} onSubmit={handleSubmit}>
          <Center>
            <Box height={"50px"} width={"200px"}>
              <Logo></Logo>
            </Box>
          </Center>

          <Center mt={8}>
            <VStack spacing={4} textAlign="center">
              <Heading>Welcome to FlavourFleet!</Heading>
              <Text>
                Please sign up below to start managing your restaurant.
              </Text>
            </VStack>
          </Center>

          <Center mt={8}>
            <Box p={8} borderWidth={1} borderRadius="md" w={"80%"}>
              <VStack spacing={4}>
                <Flex
                  direction={["column", "row"]}
                  justify="space-between"
                  w="100%"
                >
                  <FormControl
                    id="restaurantName"
                    flex="1"
                    mr={[0, 4]}
                    mb={[4, 0]}
                  >
                    <FormLabel>Restaurant Name</FormLabel>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Enter your restaurant name"
                    />
                  </FormControl>
                  <FormControl id="addressLine" flex="1">
                    <FormLabel>Address Line</FormLabel>
                    <Input
                      type="text"
                      name="addressLine"
                      placeholder="Select and Address First"
                      disabled
                      value={address?.addressLine}
                      _disabled={{ color: "black" }}
                    />
                  </FormControl>
                </Flex>
                <Flex
                  direction={["column", "row"]}
                  justify="space-between"
                  w="100%"
                >
                  <FormControl id="city" flex="1" mr={[0, 4]} mb={[4, 0]}>
                    <FormLabel>City</FormLabel>
                    <Input
                      type="text"
                      name="city"
                      placeholder="Select and Address First"
                      disabled
                      value={address?.city}
                      _disabled={{ color: "black" }}
                    />
                  </FormControl>
                  <FormControl id="country" flex="1">
                    <FormLabel>Country</FormLabel>
                    <Input
                      type="text"
                      name="country"
                      placeholder="Select and Address First"
                      disabled
                      value={address?.country}
                      _disabled={{ color: "black" }}
                    />
                  </FormControl>
                </Flex>
                <Flex
                  direction={["column", "row"]}
                  justify="space-between"
                  w="100%"
                >
                  <FormControl id="zipCode" flex="1" mr={[0, 4]} mb={[4, 0]}>
                    <FormLabel>Zip Code</FormLabel>
                    <Input
                      type="text"
                      name="zipCode"
                      placeholder="Select and Address First"
                      disabled
                      value={address?.zipCode}
                      _disabled={{ color: "black" }}
                    />
                  </FormControl>
                  <FormControl id="restaurantImage" flex="1">
                    <FormLabel>Restaurant Image</FormLabel>
                    <Input
                      type="file"
                      name="imageFile"
                      onChange={handleFileChange}
                    />
                  </FormControl>
                </Flex>
                <Flex direction="row" w="full" justifyContent="flex-end">
                  {imageUrl && (
                    <Image src={imageUrl} alt="Preview" h={"50px"}></Image>
                  )}
                </Flex>
                <Flex
                  flexDirection={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  columnGap={5}
                >
                  <Button
                    colorScheme="teal"
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    Select Address
                  </Button>

                  {address && (
                    <Button type="submit" colorScheme="teal">
                      Sign Up
                    </Button>
                  )}
                </Flex>
              </VStack>
            </Box>
          </Center>
        </Box>
      )}
      {edit && <AddAddressMap handleAddAddress={handleAddAddress} />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const logInRedirect = {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };

  const restroRedirect = {
    redirect: {
      destination: "/restaurant",
      permanent: false,
    },
  };

  const { req } = context;
  try {
    const res = await axios.get(
      process.env.BASE_API_URL + "/restaurant/available",
      {
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie,
        },
      }
    );
    const data = await res.data;

    if (data.success === true) {
      return restroRedirect;
    }
  } catch (error) {
    return logInRedirect;
  }

  return {
    props: {},
  };
};

export default WelcomePage;
