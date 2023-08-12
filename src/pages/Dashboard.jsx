import React from "react";
import Header from "../components/Header";
import {
  Center,
  Grid,
  GridItem,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useGetDepartments } from "../axios/queryHooks";
import { useStore } from "../store";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const { data: departmentData, isLoading } = useGetDepartments();

  const updateDepartment = useStore((state) => state.updateDepartment);

  const navigate = useNavigate();

  return (
    <VStack w="100vw" minH="100vh">
      {isLoading ? (
        <Center w="100vw" h="100vh">
          <Spinner />
        </Center>
      ) : (
        <>
          <Header />
          <VStack py={8} w="100%" px={6} spacing={12}>
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
            <TableContainer w="100%" px={2} boxShadow="lg" borderRadius="16px">
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
                          <Button
                            bg="none"
                            _hover={{ bg: "none" }}
                            onClick={() => {
                              updateDepartment(dep.department_name);
                              navigate(`/department/${dep.department_id}`);
                            }}
                          >
                            {dep.department_name}
                          </Button>
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
