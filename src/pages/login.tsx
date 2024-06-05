import { FormEvent, useState } from "react";
import { Box, Button, Flex, Input, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useUser } from "@/hooks/useUser";
import { Logo } from "@/components/Logo";

const LoginPage = () => {
  const { replace } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logInWithEmailPassword, continueWithGoogle } = useUser();

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

        <Flex
          direction="column"
          as="form"
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            logInWithEmailPassword(email, password);
          }}
        >
          <Input
            mb={4}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            mb={4}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Login
          </Button>
          <Button
            bgColor={"brand.400"}
            mb={4}
            sx={{
              ":hover": {
                bgColor: "brand.600",
              },
            }}
            color={"white"}
            onClick={continueWithGoogle}
          >
            Continue with Google
          </Button>
          <Link
            onClick={() => {
              replace("/signup");
            }}
          >
            Sign up
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
