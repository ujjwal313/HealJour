import {
  Button,
  Center,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Header from "../components/Header";

const Login = () => {
  return (
    <VStack w="100vw" minH="100vh">
      <Header />
      <Center flex={1} w="100%">
        <VStack p={12} boxShadow="lg" borderRadius="12px" w="40%">
          <Text>Login</Text>
          <Text>Enter your details to login</Text>
          <form
            style={{
              width: "100%",
              paddingLeft: "2rem",
              color: "rgba(0, 0, 0, 0.4)",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e);
            }}
          >
            <FormControl
              isRequired
              border="1px solid rgba(0,0,0,0.5)"
              p={3}
              borderRadius="lg"
            >
              <FormLabel htmlFor="email" m={0}>
                Email
              </FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                border={0}
                p={0}
                h="auto"
              />
            </FormControl>
            <FormControl
              isRequired
              mt={4}
              border="1px solid rgba(0,0,0,0.5)"
              p={3}
              borderRadius="lg"
            >
              <FormLabel htmlFor="password" m={0}>
                Password
              </FormLabel>
              <Input
                type="password"
                placeholder="Password"
                border={0}
                p={0}
                h="auto"
              />
            </FormControl>
            <VStack w="100%" spacing={4} alignItems="flex-start" mt={2}>
              <Checkbox color="rgba(0,0,0,0.6)">Login as Center Admin</Checkbox>
              <Button
                type="submit"
                alignSelf="flex-end"
                bg="#68c382"
                color="#fff"
              >
                Login
              </Button>
            </VStack>
          </form>
        </VStack>
      </Center>
    </VStack>
  );
};

export default Login;
