import { Flex, HStack, Stack, Text, VStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import mainImage from "../assets/mainImage.png";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { IconButton } from "@chakra-ui/button";
import { HiArrowRight } from "react-icons/hi";
import { useNavigate } from "react-router";
import Header from "../components/Header";

const HomePage = () => {
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();
  return (
    <VStack minH="100vh" w="100vw" spacing={0}>
      <Header />
      <Stack
        flex={1}
        w="100%"
        spacing={10}
        textAlign="center"
        direction={["column", "row"]}
        alignItems="center"
      >
        <Image src={mainImage} w={["80%", "50%"]} maxH="500px" />
        <VStack px={["12px", "32px"]} flex={1} w="100%" spacing={20}>
          <Text fontSize={25}>
            Enter your order Id to check your order details
          </Text>
          <HStack w="100%">
            <Input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID"
            />
            <IconButton
              icon={<HiArrowRight />}
              borderRadius="100%"
              bg="green.100"
              onClick={() => {
                navigate(`/order/${orderId}`);
              }}
            />
          </HStack>
        </VStack>
      </Stack>
      <Flex
        w="100%"
        py="12px"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 2px 12px;"
        borderRadius="8px"
        justifyContent="center"
      >
        <Text color="#c6c6c6">
          &#169; {new Date().getFullYear()} Copyright healjour.com
        </Text>
      </Flex>
    </VStack>
  );
};

export default HomePage;
