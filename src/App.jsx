import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  HStack,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiOutlineRefresh } from "react-icons/hi";

function App() {
  return (
    <Box minH="100vh" w="100vw" bg="white" p="24px">
      <VStack w="100%" textAlign="start">
        <VStack w="100%" alignItems="flex-start">
          <Text fontWeight={700} fontSize="12px" color="#7c7c7c">
            Doctor Name
          </Text>
          <Select w="100%">
            <option>HI</option>
            <option>HELLO</option>
          </Select>
        </VStack>
        <VStack w="100%" alignItems="flex-start" spacing={0}>
          <Text fontWeight={700} fontSize="12px" color="#7c7c7c">
            Lab Name
          </Text>
          <Text>HealthCare Clinic</Text>
        </VStack>
        <VStack w="100%" alignItems="flex-start" spacing={0}>
          <Text fontWeight={700} fontSize="12px" color="#7c7c7c">
            Test Name
          </Text>
          <Text fontWeight={400} fontSize="14px">
            Test 1
          </Text>
        </VStack>
        <HStack w="100%" justifyContent="space-between">
          <Text>Tests</Text>
          <Button
            color="#21B34A"
            fontWeight={700}
            fontSize="14px"
            bg="none"
            leftIcon={<HiOutlineRefresh />}
          >
            Refresh
          </Button>
        </HStack>
        <Accordion allowToggle w="100%">
          <AccordionItem my="10px">
            <h2>
              <AccordionButton bg="#f6f6f6">
                <HStack flex={1} justifyContent="space-between">
                  <VStack spacing={0}>
                    <Text fontWeight={400} fontSize="14px">
                      Diagnostic Test
                    </Text>
                    <Text fontWeight={600} fontSize="12px" color="#7c7c7c">
                      Queue 2
                    </Text>
                  </VStack>
                  <Center bg="#f8e4c5" p="4px" borderRadius="6px">
                    <Text color="#FF9900">In Progress</Text>
                  </Center>
                </HStack>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} boxShadow="0px 8px 24px rgba(0, 0, 0, 0.1)">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem my="10px">
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Section 2 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </Box>
  );
}

export default App;
