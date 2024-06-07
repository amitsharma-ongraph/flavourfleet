import { Logo } from "@/components/Logo";
import { useNotification } from "@/hooks/useNotification";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import { HiShieldCheck } from "react-icons/hi";
import { axios } from "../../packages/axios";
import { useRouter } from "next/router";

function VerifyPage() {
  const [contact, setContact] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  const {
    query: { redirect },
  } = useRouter();

  const { setNotification } = useNotification();

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();

    if (contact.length !== 10) {
      return setNotification({
        type: "error",
        title: "Please Enter a valid phone number",
      });
    }
    try {
      setLoading(true);
      const res = await axios.post("/auth/send-otp", {
        phoneNumber: contact,
      });
      const { data } = res;
      if (data.success) {
        setTimeout(() => {
          setLoading(false);
          setSent(true);
        }, 1000);
      } else {
        throw new Error();
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      return setNotification({
        type: "error",
        title: "Couldn't verify at this moment",
      });
    }
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    if (otp.length != 6) {
      return setNotification({
        type: "error",
        title: "Enter valid otp",
      });
    }
    try {
      setLoading(true);
      const res = await axios.post("/auth/verify-otp", {
        phoneNumber: contact,
        otp,
      });
      const { data } = res;
      if (data.success) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        return setNotification({
          type: "success",
          title: "otp verified",
          path: `/restaurant-menu/${redirect}`,
        });
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        return setNotification({
          type: "error",
          title: "Invalid Otp",
        });
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      return setNotification({
        type: "error",
        title: "Couldn't verify at this moment",
      });
    }
  };
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        p={8}
        rounded={6}
        boxShadow="md"
        bg="brand.50"
        alignItems={"center"}
        rowGap={4}
      >
        <Box
          borderRight="1px solid"
          borderRightColor="white"
          w={"150px"}
          h="50px"
        >
          {" "}
          <Logo />
        </Box>

        <Text fontSize={"1.4em"} fontWeight={600} color={"brand.900"}>
          OTP Verification
        </Text>
        <Icon
          fontSize={"2em"}
          fontWeight={600}
          color={"brand.900"}
          as={HiShieldCheck}
        ></Icon>
        {!sent && (
          <>
            <Text fontSize={"0.8em"} fontWeight={400} color={"brand.900"}>
              Enter your mobile number
            </Text>
            <Text fontSize={"0.8em"} fontWeight={400} color={"brand.900"}>
              We will send you an otp message
            </Text>

            <Flex direction="column" as="form" onSubmit={handleSendOtp}>
              <Input
                mb={4}
                type="number"
                placeholder="Mobile Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <Button
                bgColor={"brand.400"}
                mb={4}
                sx={{
                  ":hover": {
                    bgColor: "brand.600",
                  },
                }}
                color={"white"}
                type="submit"
              >
                {loading ? <Spinner /> : "Continue"}
              </Button>
            </Flex>
          </>
        )}
        {sent && (
          <>
            <Text
              fontSize={"0.8em"}
              fontWeight={400}
              color={"brand.900"}
              maxW={"200px"}
            >
              Enter the 4 digit code sent to you number {contact}
            </Text>
            <Flex direction="column" as="form" onSubmit={handleVerifyOtp}>
              <Input
                mb={4}
                type="number"
                placeholder="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                bgColor={"brand.400"}
                mb={4}
                sx={{
                  ":hover": {
                    bgColor: "brand.600",
                  },
                }}
                color={"white"}
                type="submit"
              >
                verify
              </Button>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default VerifyPage;
