'use client'

import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

interface Props {
  id?: string
  status?: boolean
  type?: string
  command?: string
}

export default function StatusModal({ id, status, type, command }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isSuccess, setIsSuccess] = useState(status ? status : false);

  const modalHeader = isSuccess ? 'Success!' : 'Error!';
  const modalHeaderColor = isSuccess ? 'text-green-500' : 'text-red-400';

  return (
    <Modal
      isOpen={isOpen}
      placement={'top'}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className={`flex flex-col items-center color ${modalHeaderColor} text-xl pt-10 pb-0`}>{modalHeader}</ModalHeader>
            <ModalBody className="flex flex-col items-center pb-10 text-sm">
              <p>
                {type} <strong>{id}</strong> has been{' '}
                {isSuccess ? 'successfully' : 'unsuccessfully'} {command}.
              </p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
