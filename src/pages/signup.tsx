import { FormEvent, useState } from "react";
import { Box, Button, Flex, FormControl, Input, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Logo } from "@/components/Logo";
import { useUser } from "@/hooks/useUser";

const SignupPage = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { signUpWithEmailPassword } = useUser();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    await signUpWithEmailPassword({
      email,
      name,
      password,
      confirmPassword,
    });
  };

  const handleLogin = () => {
    router.push("/login");
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
          <Logo />
        </Box>

        <Flex direction="column" as="form" onSubmit={handleSignup}>
          <FormControl isRequired={true}>
            <Input
              mb={4}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
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
          <Input
            mb={4}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            onClick={handleSignup}
          >
            SignUp
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
          >
            Continue with Google
          </Button>
          <Link onClick={handleLogin}>Login</Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignupPage;
