'use client'
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import {ChevronDownIcon} from '../icons';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";


export default function UpdateQuotation() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <>
      <Button onPress={onOpen} color="primary">Open Quotation Form</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">Update
              <p className="text-xs text-gray-400">Quotation</p>
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
                  <Dropdown>
                      <DropdownTrigger className="capitalize">
                      <Input
                      endContent={
                      <ChevronDownIcon  />
                      }
                      label="Status"
                      variant="bordered"
                      value={selectedValue}
                      />
                      </DropdownTrigger>
                      <DropdownMenu 
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={(keys: any) => setSelectedKeys(keys)}
                        >
                        <DropdownItem key="Pending">Pending</DropdownItem>
                        <DropdownItem key="Active">Active</DropdownItem>
                        <DropdownItem key="Paused">Paused</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
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
