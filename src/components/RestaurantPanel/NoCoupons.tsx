import React from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  VStack,
  Button,
  Icon,
  StackDivider,
} from "@chakra-ui/react";
import { FaPlusCircle, FaTags } from "react-icons/fa";
import { useRouter } from "next/router";
import { RiCoupon2Fill } from "react-icons/ri";

const NoCoupons = () => {
  const { push } = useRouter();
  return (
    <Center bg="gray.50">
      <VStack spacing={4} divider={<StackDivider borderColor="gray.200" />}>
        <Box textAlign="center" p={5} shadow="md" borderWidth="1px" bg="white">
          <Icon as={RiCoupon2Fill} w={12} h={12} color="brand.500" />
          <Heading mt={4} mb={2}>
            No Active Coupons
          </Heading>
          <Text fontSize="md" color="gray.600" mt={2}>
            Currently, there are no active coupons available. Use this space to
            create and manage exclusive deals for your customers.
          </Text>
        </Box>
        <Box
          textAlign="left"
          p={5}
          shadow="md"
          borderWidth="1px"
          bg="white"
          w="100%"
        >
          <Heading size="md" mb={2}>
            Tips for Creating Effective Coupons:
          </Heading>
          <Text fontSize="md" color="gray.600">
            • <Icon as={FaPlusCircle} color="brand.500" /> Discounts & Deals:
            Offer percentage discounts, buy-one-get-one deals, or special meal
            packages.
          </Text>
          <Text fontSize="md" color="gray.600" mt={2}>
            • <Icon as={FaPlusCircle} color="brand.500" /> Time-Sensitive
            Offers: Create urgency with limited-time offers to encourage quick
            customer action.
          </Text>
          <Text fontSize="md" color="gray.600" mt={2}>
            • <Icon as={FaPlusCircle} color="brand.500" /> Special Occasions:
            Celebrate holidays, anniversaries, or special events with unique
            promotions.
          </Text>
          <Text fontSize="md" color="gray.600" mt={2}>
            • <Icon as={FaPlusCircle} color="brand.500" /> Loyalty Rewards:
            Reward frequent diners with exclusive discounts or free items.
          </Text>
        </Box>
        <Button
          leftIcon={<FaPlusCircle />}
          colorScheme="brand"
          variant="solid"
          mt={4}
          onClick={() => {
            push("/restaurant/dashboard/coupons/new");
          }}
        >
          Create a New Coupon
        </Button>
      </VStack>
    </Center>
  );
};

export default NoCoupons;
