import {
  Button,
  Center,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Header from "../components/Header";
import { useAdminLogin } from "../axios/queryHooks";
import { useStore } from "../store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { mutate, isLoading } = useAdminLogin();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    isCenterAdmin: false,
  });

  const toast = useToast();
  const navigate = useNavigate();

  const updateToken = useStore((state) => state.updateToken);

  return (
    <VStack w="100vw" minH="100vh">
      <Header />
      <Center flex={1} w="100%">
        <VStack p={[4, 8, 10]} boxShadow="lg" borderRadius="12px" w="40%">
          <Text>Login</Text>
          <Text>Enter your details to login</Text>
          <form
            style={{
              width: "100%",
              color: "rgba(0, 0, 0, 0.4)",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              mutate(
                {
                  email: loginDetails.email,
                  password: loginDetails.password,
                  role: loginDetails.isCenterAdmin
                    ? "super_admin"
                    : "department_admin",
                },
                {
                  onSuccess: (response) => {
                    toast({
                      title: "Login Success",
                      description: "",
                      status: "success",
                      duration: 2500,
                      isClosable: true,
                      position: "top-right",
                    });
                    updateToken(response.data);
                    navigate("/dashboard");
                  },
                  onError: (error) => {
                    toast({
                      title: error.response.data.message,
                      description: "",
                      status: "error",
                      duration: 2500,
                      isClosable: true,
                      position: "top-right",
                    });
                  },
                }
              );
            }}
          >
            <FormControl
              isRequired
              border="1px solid rgba(0,0,0,0.5)"
              p={3}
              borderRadius="lg"
              _focusWithin={{ borderColor: "#68c382" }}
            >
              <FormLabel htmlFor="email" m={0}>
                Email
              </FormLabel>
              <Input
                type="email"
                border="none"
                placeholder="Enter your email"
                _focusVisible={{ boxShadow: "none" }}
                _placeholder={{ fontSize: "14px", fontWeight: 500 }}
                value={loginDetails.email}
                onChange={(e) =>
                  setLoginDetails((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
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
              _focusWithin={{ borderColor: "#68c382" }}
            >
              <FormLabel htmlFor="password" m={0}>
                Password
              </FormLabel>
              <Input
                type="password"
                border="none"
                placeholder="Enter your password"
                _placeholder={{ fontSize: "14px", fontWeight: 500 }}
                _focusVisible={{ boxShadow: "none" }}
                value={loginDetails.password}
                onChange={(e) =>
                  setLoginDetails((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                p={0}
                h="auto"
              />
            </FormControl>
            <VStack w="100%" spacing={4} alignItems="flex-start" mt={2}>
              <Checkbox
                color="rgba(0,0,0,0.6)"
                value={loginDetails.isCenterAdmin}
                onChange={(e) =>
                  setLoginDetails((prev) => ({
                    ...prev,
                    isCenterAdmin: e.target.checked,
                  }))
                }
                colorScheme="green"
              >
                Login as Center Admin
              </Checkbox>
              <Button
                type="submit"
                alignSelf="flex-end"
                bg="#68c382"
                color="#fff"
                _hover={{ background: "#68c382" }}
                isLoading={isLoading}
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
