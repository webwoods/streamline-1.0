'use client'
import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

const orderNumber:string = 'POG315'

export default function StatusModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [isSuccess, setIsSuccess] = useState(true);

  const modalHeader = isSuccess ? 'Success!' : 'Error!';
  const modalHeaderColor = isSuccess ? 'text-green-400' : 'text-red-400';

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen} className="max-w-fit">Success and error modal</Button>
      <Modal 
        isOpen={isOpen} 
        placement={'top'}
        onOpenChange={onOpenChange} 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className={`flex flex-col gap-1 items-center color ${modalHeaderColor} pt-10 text-2xl`}>{modalHeader}</ModalHeader>
              <ModalBody className="flex flex-col items-center">
                <p> 
                    Order <strong>{orderNumber}</strong> has been{' '}
                  {isSuccess ? 'successfully' : 'unsuccessfully'} updated.
                </p>
              </ModalBody>
              <ModalFooter className="flex flex-col items-center">
                <Button color="danger" variant="ghost" onPress={() => {
                    setIsSuccess(true);
                    onClose();
                  }} className="flex-col w-full ">
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
