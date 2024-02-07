'use client'

import { Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import { useEffect, useRef, useState } from "react";
import { formButtonStyles, formInputStyles } from "../styles";
import { useMutation } from "@apollo/client";
import { DELETE_REQUEST_MUTATION, SOFT_DELETE_REQUEST_MUTATION } from "@/gql/mutation";
import client from "@/gql/client";

interface Props {
	data?: any
}

export default function DeleteRequest({ data }: Props) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [formData, setFormData] = useState<any>(data);
	const [isSelected, setIsSelected] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [code, setCode] = useState<string>('');

	const inputRef = useRef<HTMLInputElement>(null);

	const [deleteRequestMutation, {
		error: deleteRequestError,
		loading: deleteRequestLoading,
		data: deleteRequestData
	}] = useMutation(DELETE_REQUEST_MUTATION, { client });

	const [softDeleteRequestMutation, {
		error: softDeleteRequestError,
		loading: softDeleteRequestLoading,
		data: softDeleteRequestData
	}] = useMutation(SOFT_DELETE_REQUEST_MUTATION, { client });

	// Use useEffect to open the modal when data is present
	useEffect(() => {
		if (data) {
			onOpen();
			setFormData(data);

			const extractedCharacters = data?.id?.split('-')[1];
			setCode(extractedCharacters);
		}
	}, [data, onOpen]);

	const handleDelete = () => {
		setConfirmDelete((prev) => !prev);
	};

	const handleConfirmDelete = () => {
		const inputCode = inputRef.current?.value;

		if (inputCode === '') {
			alert("If you want to confirm you deletion, please enter the code. Don't leave it empty.")
			return;
		}

		const result = inputCode && compareString(inputCode);

		if (!result) {
			alert("The code you entered doesn't match. If you want to confirm you deletion, please enter the given code.")
			return;
		}

		if (isSelected) {
			deleteRequestMutation({ variables: { id: formData?.id } });

			if (deleteRequestError) {
				alert(`Error permanently deleting the request.\n${deleteRequestError}`);
			}

		} else {
			softDeleteRequestMutation({ variables: { id: formData?.id } });

			if (softDeleteRequestError) {
				alert(`Error sending the request to recycle bin.\n${softDeleteRequestError}`);
			}
		}

		isSelected ?
			alert('Request was permanently deleted. Deletion Successful.') :
			alert('Request was sent to the recycle bin. Deletion Successful. If you want to delete this request permanently, delete it from the recycle bin.')

		console.log(result);
	};

	const handleBack = () => {
		setConfirmDelete((prev) => !prev);
	};

	const compareString = (input: string): boolean => {
		return code.includes(input);
	};

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
							<ModalHeader className="flex flex-col items-center pt-10">
								Delete
								<p className="text-xs text-gray-400 font-normal">{formData ? formData.requestType : 'REQUEST'}</p>
							</ModalHeader>

							<ModalBody className="text-xs">

								{
									!confirmDelete ?
										<div className="flex flex-col gap-5">
											<div className="flex flex-col">
												<div className="w-full flex justify-between">
													id: <span className="font-medium">{formData?.id}</span>
												</div>
												<div className="w-full flex justify-between">
													subject: <span className="font-medium">{formData?.subject}</span>
												</div>
												<div className="w-full flex justify-between">
													requested by: <span className="font-medium">{formData?.requestedUser?.name}</span>
												</div>
											</div>
											{
												!isSelected ?
													<p className="text-default-500 text-center">
														This request will be sent to the recycle bin.
														If you want to permanently delete, please check the checkbox.
													</p> : <></>
											}
											<div className="flex w-full justify-between">
												<Checkbox
													isSelected={isSelected}
													onValueChange={setIsSelected}
													color="default"
													size="sm"
												/>
												<p className="text-xs text-red-500">I want to Permanently delete this request from the database.</p>
											</div>
										</div> :
										<div className="flex flex-col gap-2">
											<div className="text-center">
												Enter the code '{code}' to
												<span className="font-medium text-red-500"> Confirm Your Deletion.</span>
											</div>
											<Input
												ref={inputRef}
												classNames={formInputStyles}
												placeholder={code}
											/>
										</div>
								}

							</ModalBody>

							<ModalFooter className="pb-10">
								{
									!confirmDelete ?
										<>
											<Button className={formButtonStyles.secondary} onPress={onClose}>
												Cancel
											</Button>
											<Button className={formButtonStyles.danger} onPress={handleDelete}>
												Delete
											</Button>
										</> :
										<>
											<Button className={formButtonStyles.secondary} onPress={handleBack}>
												Cancel
											</Button>
											<Button className={formButtonStyles.danger} onPress={handleConfirmDelete}>
												Confirm
											</Button>
										</>
								}
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}