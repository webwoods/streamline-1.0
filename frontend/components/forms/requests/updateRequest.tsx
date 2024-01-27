'use client'
import React, { useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem } from "@nextui-org/react";
import { status } from "../../formsModal/data";

interface Props {
  data?: any
}

export default function UpdateRequest({ data }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Use useEffect to open the modal when data is present
  useEffect(() => {
    if (data) {
      onOpen();
    }
  }, [data, onOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">Update
                <p className="text-xs text-gray-400">Request</p>
              </ModalHeader>
              <ModalBody>
                <Input
                  readOnly
                  label="ID"
                  placeholder="POG312"
                  variant="bordered"
                />
                <Input
                  label="Name"
                  placeholder="Methane Gas"
                  variant="bordered"
                />
                <Input
                  readOnly
                  label="Type"
                  placeholder="Gas"
                  variant="bordered"
                />
                <Input
                  readOnly
                  label="Date Created"
                  placeholder="yyyy-mm-dd"
                  type="Date"
                  variant="bordered"
                />
                <Select
                  items={status}
                  label="Status"
                  placeholder="Status"
                  className="flex"
                >
                  {(status) => <SelectItem key={status.value}>{status.label}</SelectItem>}
                </Select>
                <Input
                  label="Remarks"
                  size="lg"
                  placeholder="text"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
