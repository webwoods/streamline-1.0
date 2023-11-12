'use client'
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem} from "@nextui-org/react";
import { status } from "./data";


export default function UpdateRequest() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  return (
    <>
      <Button onPress={onOpen} color="primary">Open Request Form</Button>
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
                  autoFocus
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
                  label="Type"
                  placeholder="Gas"
                  variant="bordered"
                />
                <Input
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
