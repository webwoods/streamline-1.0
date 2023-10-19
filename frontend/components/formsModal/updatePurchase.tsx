'use client'
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem} from "@nextui-org/react";
import {animals} from "./data";


export default function UpdatePurchase() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary">Open Purchase Oder form</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent> 
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">Update
              <p className="text-xs text-gray-400">Purchase Order</p>
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="ID"
                  placeholder="POG312"
                  variant="bordered"
                />
                <Input
                  label="Ceated Date"
                  placeholder="yyyy-mm-dd"
                  type="Date"
                  variant="bordered"
                />
                <Input
                  label="Expected Date"
                  placeholder="yyyy-mm-dd"
                  type="Date"
                  variant="bordered"
                />
                <Input
                  label="Supplier"
                  placeholder="Heycarb Agro Pvt. Ltd."
                  variant="bordered"
                />
                <Select
                    items={animals}
                    label="Status"
                    placeholder="Status"
                    className="flex"
                    >
                    {(animal) => <SelectItem key={animal.value}>{animal.label}</SelectItem>}
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
