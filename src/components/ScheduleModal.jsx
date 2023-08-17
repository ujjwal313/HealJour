import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import React, { useState } from "react";
import { useSchedulePush } from "../axios/queryHooks";
import { useToast } from "@chakra-ui/toast";

const ScheduleModal = ({ isOpen, onClose, data }) => {
  const [time, setTime] = useState(0);

  // const { mutate: scheduleMutate, isLoading } = useSchedulePush();
  const { mutate: priorityMutate, isLoading } = usePriorityPush();

  const toast = useToast();

  const handleScheduleSubmit = () => {
    priorityMutate(
      { id: data["organisationTests.tests.id"], time: time * 60 },
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
        },
        onError: (error) => {
          console.log(error, "response");
          toast({
            title: error.response.data.msg,
            description: "",
            status: "error",
            duration: 2500,
            isClosable: true,
            position: "top-right",
          });
        },
        onSettled: () => {
          onClose();
          setTime(0);
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Schedule Visit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Enter time in minutes</Text>
          <Input
            type="number"
            value={time}
            mt={3}
            onChange={(e) => setTime(e.currentTarget.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleScheduleSubmit} isLoading={isLoading}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ScheduleModal;
