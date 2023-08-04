import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import axiosConfig from "../axios/index";
import { useParams } from "react-router-dom";
import logo from "../assets/logo.svg";
import { HiOutlineRefresh } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";

const OrderDetails = () => {
  const { id } = useParams();

  const getUsers = async () => {
    const response = await axiosConfig.get(`/order/view?orderId=${id}`);
    return response?.data.data;
  };

  const {
    data: records,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Records"],
    queryFn: getUsers,
    refetchInterval: 60000,
    keepPreviousData: true,
  });

  const statusOrder = ["pending", "completed"];

  return (
    <>
      {isLoading ? (
        <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      ) : records ? (
        <Box minH="100vh" w="100vw" p="24px">
          <VStack w="100%" textAlign="start" alignItems="center">
            <Image src={logo} />
            <VStack w="100%" alignItems="flex-start" spacing={0}>
              <Text fontWeight={700} fontSize="12px" color="#7c7c7c">
                Patient Name
              </Text>
              <Box>
                <Text fontWeight={400} fontSize="14px">
                  {records.patient_salutation +
                    " " +
                    records.first_name +
                    " " +
                    records.last_name}
                </Text>
              </Box>
            </VStack>
            <VStack w="100%" alignItems="flex-start" spacing={0}>
              <Text fontWeight={700} fontSize="12px" color="#7c7c7c">
                Lab Name
              </Text>
              <Text fontWeight={400} fontSize="14px" textTransform="capitalize">
                {records.center_name}
              </Text>
            </VStack>
            <HStack w="100%" justifyContent="space-between">
              <Text fontSize="20px" fontWeight="bold">
                Tests
              </Text>
              <Button
                color="#21B34A"
                fontWeight={700}
                fontSize="14px"
                bg="none"
                leftIcon={<HiOutlineRefresh />}
                cursor="pointer"
                onClick={() => refetch()}
              >
                Refresh
              </Button>
            </HStack>
            <Accordion allowToggle defaultIndex={[0]} w="100%">
              {records?.newData
                ?.sort(
                  (a, b) =>
                    statusOrder.indexOf(a.test_status.toLowerCase()) -
                    statusOrder.indexOf(b.test_status.toLowerCase())
                )
                .map((test) => {
                  return (
                    <AccordionItem
                      my="10px"
                      key={test.test_name}
                      _first={{ mt: "0px" }}
                    >
                      <h2>
                        <AccordionButton
                          bg="#f6f6f6"
                          pointerEvents={
                            test.test_status.toLowerCase() === "completed"
                              ? "none"
                              : "all"
                          }
                        >
                          <HStack flex={1} justifyContent="space-between">
                            <VStack spacing={0} alignItems="start">
                              <Text fontWeight={400} fontSize="14px">
                                {test.test_name}
                              </Text>
                              <Text
                                fontWeight={600}
                                fontSize="12px"
                                color="#7c7c7c"
                              >
                                Queue {test.queue}
                              </Text>
                            </VStack>
                            <Center
                              bg={
                                test.test_status.toLowerCase() === "completed"
                                  ? "#cce9d4"
                                  : "#f8e4c5"
                              }
                              p="4px 6px"
                              borderRadius="6px"
                            >
                              <Text
                                color={
                                  test.test_status.toLowerCase() === "completed"
                                    ? "#21B34A"
                                    : "#FF9900"
                                }
                              >
                                {test.test_status}
                              </Text>
                            </Center>
                          </HStack>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel
                        px={0}
                        boxShadow="0px 8px 24px rgba(0, 0, 0, 0.1)"
                      >
                        <VStack
                          w="100%"
                          p="16px"
                          borderRadius="16px"
                          boxShadow="0px 8px 24px rgba(0, 0, 0, 0.1)"
                        >
                          <Flex
                            justifyContent="space-between"
                            w="100%"
                            px="5px"
                          >
                            <VStack alignItems="flex-start" spacing={0}>
                              <Text
                                alignSelf="flex-start"
                                fontWeight="bold"
                                fontSize="12px"
                                color="#7C7C7C"
                              >
                                Test Name
                              </Text>
                              <Text fontSize="14px">{test.test_name}</Text>
                            </VStack>
                            <VStack spacing={0} alignItems="end">
                              <Text
                                alignSelf="flex-end"
                                fontWeight="bold"
                                fontSize="12px"
                                color="#7C7C7C"
                              >
                                Queue
                              </Text>
                              <Text fontSize="14px">{test.queue}</Text>
                            </VStack>
                          </Flex>
                          <Flex
                            justifyContent="space-between"
                            w="100%"
                            px="5px"
                          >
                            <VStack alignItems="flex-start" spacing={0}>
                              <Text
                                alignSelf="flex-start"
                                fontWeight="bold"
                                fontSize="12px"
                                color="#7C7C7C"
                              >
                                Department Name
                              </Text>
                              <Text fontSize="14px">
                                {test.dept_name || "-"}
                              </Text>
                            </VStack>
                            <VStack spacing={0}>
                              <Text
                                alignSelf="flex-end"
                                fontWeight="bold"
                                fontSize="12px"
                                color="#7C7C7C"
                              >
                                Floor
                              </Text>
                              <Text fontSize="14px">{test.floor_number}</Text>
                            </VStack>
                          </Flex>
                          <Flex
                            justifyContent="space-between"
                            w="100%"
                            px="5px"
                          >
                            <VStack spacing={0}>
                              <Text
                                alignSelf="flex-start"
                                fontWeight="bold"
                                fontSize="12px"
                                color="#7C7C7C"
                              >
                                Tip
                              </Text>
                              <Text fontSize="14px">{test.instructions}</Text>
                            </VStack>
                            <VStack spacing={0}>
                              <Text
                                alignSelf="flex-end"
                                fontWeight="bold"
                                fontSize="12px"
                                color="#7C7C7C"
                              >
                                Room
                              </Text>
                              <Text fontSize="14px">
                                {parseInt(test.room_number)}
                              </Text>
                            </VStack>
                          </Flex>
                          <Flex
                            justifyContent="space-between"
                            w="100%"
                            px="5px"
                          >
                            <VStack spacing={0}>
                              <Text
                                alignSelf="flex-start"
                                fontWeight="bold"
                                fontSize="12px"
                                color="#7C7C7C"
                              >
                                Status
                              </Text>
                              <Text fontSize="14px">
                                {test.test_status || "-"}
                              </Text>
                            </VStack>
                          </Flex>
                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
            </Accordion>
          </VStack>
        </Box>
      ) : (
        <VStack minH="100vh" w="100vw">
          <Flex
            w="100%"
            py="20px"
            boxShadow="lg"
            borderRadius="8px"
            justifyContent="center"
          >
            <Image src={logo} />
          </Flex>
          <Center w="100%" flex={1} textAlign="center">
            <Text fontSize={20}>
              Error getting Order Details. <br />
              Please check your order ID and try again.{" "}
            </Text>
          </Center>
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
      )}
    </>
  );
};

export default OrderDetails;
