import React from "react";
import { Flex, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import logoImage from "../../public/favicon.ico";
import Image from "next/image";

const AnimatedLogo = () => {
  const { push } = useRouter();

  const handleClick = () => {
    push("/");
  };

  return (
    <Flex
      h={"100vh"}
      w={"100vw"}
      zIndex={1000}
      alignItems={"center"}
      justifyContent={"center"}
      position={"absolute"}
      top={0}
      left={0}
      backdropFilter={"auto"}
      backdropBlur={"10px"}
    >
      <Box h={"80px"} w={"150px"}>
        <Flex
          align="center"
          justify="center"
          w={"100%"}
          h={"100%"}
          borderRadius="md"
          boxShadow="md"
          cursor={"pointer"}
          onClick={handleClick}
          bg={"brand.50"}
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              opacity: [1, 0.8, 0.8, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Box w="30px" h="30px" borderRadius="full">
              <Image src={logoImage} alt="" />
            </Box>
          </motion.div>
          <Text
            ml="2"
            color={useColorModeValue("blue.600", "blue.300")}
            fontWeight="bold"
          >
            FlavourFleet
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AnimatedLogo;
