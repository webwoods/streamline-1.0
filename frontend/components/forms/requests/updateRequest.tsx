'use client'
import React, { useEffect, useRef, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem } from "@nextui-org/react";
import { formButtonStyles } from "../styles";
import { EditableRequestDataMapper } from "@/components/action/dataMapper";
import { useMutation } from "@apollo/client";
import { UPDATE_REQUEST } from "@/gql/mutation";
import client from "@/gql/client";

interface Props {
  data?: any
}

export default function UpdateRequest({ data }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState<any>(data);
  const [status, setStatus] = useState<string>(data.status);

  const [updateRequestMutation, {
    data: updateRequestData,
    error: updateRequestError,
    loading: updateRequestLoading
  }] = useMutation(UPDATE_REQUEST, { client });

  // Refs for child components
  const editableSubjectMapperRef = useRef<any>(null);
  const editableDescriptionMapperRef = useRef<any>(null);

  // Function to update form data with latest values from child components
  const updateFormData = () => {
    const subjectValue = editableSubjectMapperRef.current?.getSubjectValue();
    const descriptionValue = editableDescriptionMapperRef.current?.getDescriptionValue();

    // Update form data with the latest values
    setFormData((prevData: any) => ({
      ...prevData,
      status: status,
      subject: subjectValue,
      description: descriptionValue,
      // Add other fields to update
    }));
  };

  // Use useEffect to open the modal when data is present
  useEffect(() => {
    if (data) {
      onOpen();
      setFormData(data);
    }
  }, [data, onOpen]);

  useEffect(() => {
    if (formData && formData !== data) {
      updateRequestMutation({
        variables: {
          id: formData?.id,
          input: {
            description: formData?.description,
            fileId: formData?.fileId,
            status: formData?.status,
            subject: formData?.subject,
            // subtotal: formData?.subtotal,
            // tax: formData?.tax,
            // total: formData?.total
          }
        }
      })

    }
  }, [formData]);

  useEffect(() => {
    if (updateRequestError) {
      alert('Update Request Failed!')
    }

    if (updateRequestData) {
      alert('Request Successfully Updated!');
      // console.log('form update!', formData);
      onOpenChange();
    }
  }, [updateRequestData]);

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
              <ModalHeader className="flex flex-col items-center pt-10">Update
                <p className="text-xs text-gray-400 font-normal">{formData ? formData.requestType : 'REQUEST'}</p>
              </ModalHeader>
              <ModalBody className="text-xs">
                <EditableRequestDataMapper
                  data={formData}
                  onSelectStatus={setStatus}
                  onSubjectMapperRef={(ref) => (editableSubjectMapperRef.current = ref)}
                  onDescriptionMapperRef={(ref) => (editableDescriptionMapperRef.current = ref)}
                  updateFormData={updateFormData}
                />
              </ModalBody>
              <ModalFooter className="pb-10">
                <Button className={formButtonStyles.secondary} onPress={onClose}>
                  Cancel
                </Button>
                <Button className={formButtonStyles.primary} onPress={() => { updateFormData() }}>
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
