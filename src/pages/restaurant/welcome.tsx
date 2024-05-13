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
import { ChangeEvent, useState } from "react";

const WelcomePage = () => {
  const { signUp } = useRestaurant();
  const { state } = useStore();
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const { name, addressLine, city, country, zipCode } = Object.fromEntries(
      new FormData(form).entries()
    );

    signUp({
      name: name as string,
      addressLine: addressLine as string,
      city: city as string,
      country: country as string,
      zipCode: zipCode as string,
      imageFile: imageFile as File,
      ownerId: state.user?.id || "",
    });
  };
  return (
    <Box p={4} w={"100%"} as={"form"} onSubmit={handleSubmit}>
      <Center>
        <Box height={"50px"} width={"200px"}>
          <Logo></Logo>
        </Box>
      </Center>

      <Center mt={8}>
        <VStack spacing={4} textAlign="center">
          <Heading>Welcome to FlavourFleet!</Heading>
          <Text>Please sign up below to start managing your restaurant.</Text>
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
              <FormControl id="restaurantName" flex="1" mr={[0, 4]} mb={[4, 0]}>
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
                  placeholder="Enter address line"
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
                <Input type="text" name="city" placeholder="Enter city" />
              </FormControl>
              <FormControl id="country" flex="1">
                <FormLabel>Country</FormLabel>
                <Input type="text" name="country" placeholder="Enter country" />
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
                  placeholder="Enter zip code"
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
            <Button type="submit" colorScheme="teal">
              Sign Up
            </Button>
          </VStack>
        </Box>
      </Center>
    </Box>
  );
};

export default WelcomePage;
