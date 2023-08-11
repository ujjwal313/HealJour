import React from "react";
import Header from "../components/Header";
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Link,
  VStack,
} from "@chakra-ui/react";
import { useGetDepartments } from "../axios/queryHooks";

const Dashboard = () => {
  const { data: departmentData, isLoading } = useGetDepartments();
  console.log(departmentData);
  return (
    <VStack w="100vw" minH="100vh">
      {isLoading ? (
        <Center w="100vw" h="100vh">
          <Spinner />
        </Center>
      ) : (
        <>
          <Header />
          <VStack pt={8} w="100%" px={6} spacing={12}>
            <Grid
              w="100%"
              p={12}
              boxShadow="lg"
              borderRadius="20px"
              templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]}
            >
              <GridItem>
                <VStack>
                  <Text>Total Patients</Text>
                  <Text fontSize={72} fontWeight={500}>
                    {departmentData.data.reduce(
                      (acc, current) => acc + current.count.all,
                      0
                    )}
                  </Text>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack>
                  <Text>Total Completed</Text>
                  <Text fontSize={72} fontWeight={500} color="green">
                    {departmentData.data.reduce(
                      (acc, current) => acc + current.count.complete,
                      0
                    )}
                  </Text>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack>
                  <Text>Total Pending</Text>
                  <Text fontSize={72} fontWeight={500} color="orange">
                    {departmentData.data.reduce(
                      (acc, current) => acc + current.count.pending,
                      0
                    )}
                  </Text>
                </VStack>
              </GridItem>
            </Grid>
            {/* <Grid
              w="100%"
              p={10}
              templateColumns={[
                "repeat(1, 1fr)",
                "repeat(3, 1fr)",
                "repeat(4, 1fr)",
              ]}
              gap={12}
            >
              {departmentData?.data.map((dep) => {
                return (
                  <GridItem
                    key={dep.department_id}
                    boxShadow="lg"
                    borderRadius="20px"
                    p={2}
                    cursor="pointer"
                    opacity={0.8}
                  >
                    <VStack p={8} borderRadius="1rem" w="auto" spacing={8}>
                      <Text fontSize="1.25rem" fontWeight={500}>
                        {dep.department_name}
                      </Text>
                      <VStack w="100%" alignItems="flex-start">
                        <Text fontSize="1rem" fontWeight={500}>
                          Total Patients: {dep.count.all}
                        </Text>
                        <Text fontSize="1rem" fontWeight={500}>
                          Pending Patients:{" "}
                          <Text as="span" color="orange">
                            {dep.count.pending}
                          </Text>
                        </Text>
                        <Text fontSize="1rem" fontWeight={500}>
                          Completed Patients:{" "}
                          <Text as="span" color="green">
                            {dep.count.complete}
                          </Text>
                        </Text>
                      </VStack>
                    </VStack>
                  </GridItem>
                );
              })}
            </Grid> */}
            <TableContainer w="100%">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Department</Th>
                    <Th>Total</Th>
                    <Th>Completed</Th>
                    <Th>Pending</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {departmentData?.data.map((dep) => {
                    return (
                      <Tr>
                        <Td>
                          <Link href={`/department/${dep.department_id}`}>
                            {dep.department_name}
                          </Link>
                        </Td>
                        <Td fontSize={22}>{dep.count.all}</Td>
                        <Td fontSize={22} color="green">
                          {dep.count.complete}
                        </Td>
                        <Td fontSize={22} color="orange">
                          {dep.count.pending}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </>
      )}
    </VStack>
  );
};

export default Dashboard;
