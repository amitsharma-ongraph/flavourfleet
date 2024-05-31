import { useState } from "react";
import { Button, Flex, Input, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

const SignupPage = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contactNo, setContactNo] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSignup = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, contactNo, password }),
        }
      );
      const data = await response.json();
    } catch (error) {}
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" p={8} rounded={6} boxShadow="md" bg="gray.100">
        <Input
          mb={4}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          mb={4}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          mb={4}
          placeholder="Contact Number"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
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
  );
};

export default SignupPage;
