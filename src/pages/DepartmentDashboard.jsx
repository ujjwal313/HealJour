import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useGetDepartmentDetails, usePriorityPush } from "../axios/queryHooks";
import Header from "../components/Header";
import { Center, Flex, VStack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Select } from "@chakra-ui/select";
import { useStore } from "../store";
import { useToast } from "@chakra-ui/toast";
import ScheduleModal from "../components/ScheduleModal";
import { useDisclosure } from "@chakra-ui/hooks";
import { IconButton } from "@chakra-ui/button";
import { HiArrowLeft } from "react-icons/hi";
import { Input } from "@chakra-ui/input";

const DepartmentDashboard = () => {
  const { id } = useParams();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [rowData, setRowData] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: testData, isLoading, refetch } = useGetDepartmentDetails(id);

  const { mutate: priorityMutate } = usePriorityPush();

  const toast = useToast();

  const navigate = useNavigate();

  const columnHelper = createColumnHelper();

  const department = useStore((state) => state.department);

  const columns = useMemo(
    () =>
      testData?.data.length > 0
        ? [
            columnHelper.accessor(
              (row) => row["organisationTests.tests.order.order_external_id"],
              {
                id: "patId",
                cell: (info) => info.getValue(),
                header: () => <span>Patient Id</span>,
              }
            ),
            columnHelper.accessor(
              (row) =>
                row["organisationTests.tests.order.first_name"] +
                " " +
                row["organisationTests.tests.order.last_name"],
              {
                id: "name",
                cell: (info) => <i>{info.getValue()}</i>,
                header: () => <span>Name</span>,
              }
            ),
            columnHelper.accessor(
              (row) => row["organisationTests.tests.order.mobile"],
              {
                id: "contact",
                cell: (info) => <i>{info.getValue()?.toString()}</i>,
                header: () => <span>Contact</span>,
              }
            ),
            columnHelper.accessor((row) => row["organisationTests.test_name"], {
              id: "sku",
              cell: (info) => <i>{info.getValue()}</i>,
              header: () => <span>SKU</span>,
            }),
            columnHelper.accessor((row) => row["organisationTests.test_name"], {
              id: "dep",
              cell: (info) => <i>{department}</i>,
              header: () => <span>Department</span>,
            }),
            columnHelper.accessor(
              (row) => row["organisationTests.tests.status"],
              {
                id: "status",
                cell: (info) => <i>{info.getValue()}</i>,
                header: () => <span>Status</span>,
              }
            ),
            {
              header: "Actions",
              enableGlobalFilter: false,
              cell: (row) => {
                return (
                  <Select
                    placeholder="Trigger an action"
                    onChange={(e) => handleActionChange(e, row)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Opt-Out">Opt-Out</option>
                    <option value="Completed">Completed</option>
                    <option value="Priority">Priority</option>
                    <option value="Partial">Partial</option>
                    <option value="Schedule">Schedule</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Ignored">Ignored</option>
                  </Select>
                );
              },
            },
          ]
        : [],
    [testData]
  );

  const table = useReactTable({
    data: testData?.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  const handleActionChange = (e, data) => {
    switch (e.currentTarget.value) {
      case "Priority":
        priorityMutate(
          {
            id: data.row.original["organisationTests.tests.order.id"],
          },
          {
            onSuccess: (data) => {
              toast({
                title: data.message,
                description: "",
                status: "success",
                duration: 2500,
                isClosable: true,
                position: "top-right",
              });
              refetch();
            },
          }
        );
        return;
      case "Schedule":
        setRowData(data?.row.original);
        onOpen();
        return;
    }
  };

  return (
    <VStack w="100vw" minH="100vh">
      {isLoading ? (
        <Center w="100vw" h="100vh">
          <Spinner />
        </Center>
      ) : (
        <>
          <Header />
          <ScheduleModal isOpen={isOpen} onClose={onClose} data={rowData} />
          <VStack py={8} w="100%" px={6} spacing={12} flex={1}>
            <Flex
              w="100%"
              justifyContent="space-between"
              alignItems="center"
              p={4}
            >
              <IconButton
                icon={<HiArrowLeft />}
                borderRadius="100px"
                onClick={() => navigate(-1)}
                boxShadow="lg"
                bg="none"
              />
              <Input
                placeholder="Search"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                w="20%"
              />
            </Flex>
            <Table px={2} boxShadow="lg" borderRadius="16px">
              <Thead bg="gray.200">
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Th key={header.id} textAlign="center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {table.getRowModel().rows.map((row) => (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </VStack>
        </>
      )}
    </VStack>
  );
};

export default DepartmentDashboard;
