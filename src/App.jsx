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
import axiosConfig from "./axios/index";
import logo from "./assets/logo.svg";
import { HiOutlineRefresh } from "react-icons/hi";
import queryString from "query-string";
import { useQuery } from "@tanstack/react-query";

function App() {
  const queryParams = queryString.parseUrl(window?.location?.href);

  const getUsers = async () => {
    const response = await axiosConfig.get(
      `/order/view?orderId=${queryParams.query.orderId}`
    );
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
    <Box minH="100vh" w="100vw" bg="white" p="24px">
      {isLoading ? (
        <Center h="100vh" w="100vw">
          <Spinner />
        </Center>
      ) : (
        <VStack w="100%" textAlign="start" alignItems="center">
          <Image src={logo} />
          <VStack w="100%" alignItems="flex-start">
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
          {/* <VStack w="100%" alignItems="flex-start" spacing={0}>
            <Text fontWeight={700} fontSize="12px" color="#7c7c7c">
              Test Name
            </Text>
            <Text fontWeight={400} fontSize="14px">
              {records}
            </Text>
          </VStack> */}
          <HStack w="100%" justifyContent="space-between">
            <Text>Tests</Text>
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
                  <AccordionItem my="10px" key={test.test_name}>
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
                            p="4px"
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
                        <Flex justifyContent="space-between" w="100%" px="10px">
                          <VStack alignItems="flex-start">
                            <Text
                              alignSelf="flex-start"
                              fontWeight={700}
                              fontSize="12px"
                            >
                              Test Name
                            </Text>
                            <Text>{test.test_name}</Text>
                          </VStack>
                          <VStack>
                            <Text
                              alignSelf="flex-end"
                              fontWeight={700}
                              fontSize="12px"
                            >
                              Queue
                            </Text>
                            <Text>{test.queue}</Text>
                          </VStack>
                        </Flex>
                        <Flex justifyContent="space-between" w="100%" px="10px">
                          <VStack alignItems="flex-start">
                            <Text
                              alignSelf="flex-start"
                              fontWeight={700}
                              fontSize="12px"
                            >
                              Department Name
                            </Text>
                            <Text>{test.dept_name || "-"}</Text>
                          </VStack>
                          <VStack>
                            <Text
                              alignSelf="flex-end"
                              fontWeight={700}
                              fontSize="12px"
                            >
                              Floor
                            </Text>
                            <Text>{test.floor_number}</Text>
                          </VStack>
                        </Flex>
                        <Flex justifyContent="space-between" w="100%" px="10px">
                          <VStack>
                            <Text
                              alignSelf="flex-start"
                              fontWeight={700}
                              fontSize="12px"
                            >
                              Tip
                            </Text>
                            <Text>{test.instructions}</Text>
                          </VStack>
                          <VStack>
                            <Text
                              alignSelf="flex-end"
                              fontWeight={700}
                              fontSize="12px"
                            >
                              Room
                            </Text>
                            <Text>{parseInt(test.room_number)}</Text>
                          </VStack>
                        </Flex>
                        <Flex justifyContent="space-between" w="100%" px="10px">
                          <VStack>
                            <Text
                              alignSelf="flex-start"
                              fontWeight={700}
                              fontSize="12px"
                            >
                              Status
                            </Text>
                            <Text>{test.test_status || "-"}</Text>
                          </VStack>
                        </Flex>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
          </Accordion>
        </VStack>
      )}
    </Box>
  );
}

export default App;
