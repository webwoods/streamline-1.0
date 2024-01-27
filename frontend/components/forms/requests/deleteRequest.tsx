'use client'

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import { useEffect } from "react";

interface Props {
    data?: any
}

export default function DeleteRequest({ data }: Props) {
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
                    <ModalHeader></ModalHeader>
                    <ModalBody></ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}