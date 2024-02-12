'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import SearchUserInput from "../forms/searchUserInput";
import { Accordion, AccordionItem, Button, Divider, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { formButtonStyles, formInputStyles, formSelectStyles, formTextAreaStyles, listBoxProps } from "../forms/styles";
import AddedItem from "../forms/requests/addedItem";
import VerifyBlock from "../forms/requests/verifyBlock";
import VerifyStoreItemRequest from "./verifyStoreItemRequest";

interface Props {
    data?: any
    onClose?: () => void
}

export default function RequestStoreItem({ data, onClose }: Props) {
    const [storeItem, setStoreItem] = useState<any>(data);
    const [formData, setFormData] = useState<any>();
    const [activeBlock, setActiveBlock] = useState(0);

    useEffect(() => {
        setStoreItem({ ...data, qty: 1 });
    }, [data]);

    const subjectRef = useRef<HTMLInputElement>(null);
    const expectedAtRef = useRef<HTMLInputElement>(null);
    const requestTypeRef = useRef<HTMLSelectElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const [isSubjectValid, setIsSubjectValid] = useState<boolean>(true);
    const [isExpectedDateValid, setIsExpectedDateValid] = useState<boolean>(true);

    const [requestedUser, setRequestedUser] = useState<any>(null);

    const handleQty = (data: any) => {
        setStoreItem(data);
    }

    const handleCancel = () => {
        onClose && onClose();
    }

    const handleNext = () => {
        const subject = subjectRef.current?.value || "";
        const createdAt = new Date();
        const expectedAt = expectedAtRef.current?.value ? new Date(expectedAtRef.current?.value) : null;
        const requestType = requestTypeRef.current?.value || ""; // Assuming you want to add a ref for requestType as well
        const description = descriptionRef.current?.value || ""; // Assuming you want to add a ref for description as well
        const file = fileRef.current?.value || "";
        const status = "awaiting_approval";

        const formData = {
            requestedUser,
            createdAt,
            expectedAt,
            requestType,
            subject,
            description,
            file,
            status,
            requestItems: [storeItem]
        };

        if (requestedUser === null || !isExpectedDateValid || !isSubjectValid) {
            alert('"Requested by", "Subject" and "Expect a response by" are required. Please check if any of them are empty.');
            return;
        }

        // submit form
        setFormData(formData);
        setActiveBlock(1);

    }

    const handleUserNameChange = useCallback((user: any) => {
        setRequestedUser(user);
    }, []);

    // useEffect(() => {
    //     // Set the state with the saved data when the component mounts
    //     if (savedData) {
    //         setRequestedUser(savedData?.requestedUser);
    //         subjectRef.current && (subjectRef.current.value = savedData?.subject || "");
    //         expectedAtRef.current && (expectedAtRef.current.value = savedData?.expectedAt ? new Date(savedData?.expectedAt).toISOString().split('T')[0] : "");
    //         requestTypeRef.current && (requestTypeRef.current.value = savedData?.requestType || "");
    //         fileRef.current && (fileRef.current.value = savedData?.file || "");
    //         descriptionRef.current && (descriptionRef.current.value = savedData?.description || "");
    //     }
    // }, [savedData]);


    return (
        <div className='w-full max-w-3xl py-10'>
            {
                activeBlock === 0 ? (
                    <>
                        <div className="flex items-center justify-center flex-col">
                            <h1 className="leading-5 font-semibold text-lg">Request</h1>
                            <h2 className="text-slate-400 text-sm">{storeItem.name}</h2>
                        </div>

                        <div className="mt-7">
                            <AddedItem
                                data={storeItem}
                                onClick={() => { }}
                                isRemoveDisabled={true}
                                getAddedItemData={handleQty}
                            />
                        </div>

                        <div className='flex flex-col items-center pt-10 gap-3'>
                            <SearchUserInput
                                formInputStyles={formInputStyles}
                                onUserNameChange={handleUserNameChange}
                                savedData={requestedUser}
                            />
                            <Input
                                ref={subjectRef}
                                isRequired
                                label="Subject"
                                labelPlacement='outside'
                                placeholder='Request for ...'
                                radius='none'
                                classNames={{ ...formInputStyles }}
                                isInvalid={!isSubjectValid}
                                errorMessage={!isSubjectValid ? "Subject cannot be empty!" : ""}
                                onBlur={() => {
                                    if (subjectRef.current?.value === "") {
                                        setIsSubjectValid(false);
                                    }
                                }}
                                onChange={() => setIsSubjectValid(true)}
                            />
                            <Input
                                ref={expectedAtRef}
                                type="date"
                                label="Expect a response by"
                                labelPlacement='outside'
                                placeholder='Select date'
                                radius='none'
                                classNames={{ ...formInputStyles }}
                                isInvalid={!isExpectedDateValid}
                                errorMessage={!isExpectedDateValid ? "Enter a valid date!" : ""}
                                onBlur={() => {
                                    if (expectedAtRef.current?.value === "") {
                                        setIsExpectedDateValid(false);
                                    }
                                }}
                                onChange={() => setIsExpectedDateValid(true)}
                            />
                            <Select
                                ref={requestTypeRef}
                                radius='none'
                                label="Type"
                                labelPlacement='outside'
                                placeholder='Select Request Type'
                                classNames={formSelectStyles}
                                listboxProps={listBoxProps}
                                defaultSelectedKeys={["request"]}
                            >
                                <SelectItem key="request">Request</SelectItem>
                                <SelectItem key="purchase_order">Purchase Order</SelectItem>
                                <SelectItem key="quotation">Quotation Request</SelectItem>
                            </Select>

                            <Divider className="mt-5" />

                            <Accordion>
                                <AccordionItem key="remarks" aria-label="Remarks" subtitle="Press to expand" title="Remarks">
                                    <Input
                                        ref={fileRef}
                                        label="Add to file"
                                        labelPlacement='outside'
                                        placeholder='Enter filename'
                                        radius='none'
                                        classNames={{ ...formInputStyles }} />

                                    <Textarea
                                        ref={descriptionRef}
                                        label="Remarks"
                                        labelPlacement='outside'
                                        radius='none'
                                        classNames={formTextAreaStyles}
                                    />
                                </AccordionItem>
                            </Accordion>

                            <div className='w-full flex gap-3 pt-5'>
                                <Button
                                    className={formButtonStyles.secondary}
                                    onClick={handleCancel}
                                >Cancel</Button>
                                <Button
                                    className={formButtonStyles.primary}
                                    onClick={handleNext}>Next</Button>
                            </div>

                        </div>
                    </>
                ) : (
                    <>
                        <VerifyStoreItemRequest
                            data={formData}
                            onBack={() => setActiveBlock(0)}
                            onVerify={() => { onClose && onClose() }}
                        />
                    </>
                )
            }
        </div>
    );
}