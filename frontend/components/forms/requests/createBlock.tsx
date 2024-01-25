import { Button, Divider, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useMemo, useRef, useState } from "react";
import { formButtonStyles, formSelectStyles, formTextAreaStyles, listBoxProps } from "../styles";
import { useRouter } from "next/navigation";

interface Props {
    user: string
    onNext: () => void
    formInputStyles: any
    onDataSubmit?: (data: any) => void
};

export default function CreateBlock({ user, onNext, formInputStyles, onDataSubmit }: Props) {

    const requestedUserNameRef = useRef<HTMLInputElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);
    const expectedAtRef = useRef<HTMLInputElement>(null);
    const requestTypeRef = useRef<HTMLSelectElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const handleCancel = () => {
        router.push('/requests');
    }

    const handleNext = () => {
        const requestedUserName = requestedUserNameRef.current?.value || "";
        const subject = subjectRef.current?.value || "";
        const createdAt = new Date();
        const expectedAt = expectedAtRef.current?.value ? new Date(expectedAtRef.current?.value) : null;
        const requestType = requestTypeRef.current?.value || ""; // Assuming you want to add a ref for requestType as well
        const description = descriptionRef.current?.value || ""; // Assuming you want to add a ref for description as well
        const file = fileRef.current?.value || "";
        const status = "awaiting_approval";

        const formData = { requestedUserName, createdAt, expectedAt, requestType, subject, description, file, status };

        onDataSubmit && onDataSubmit(formData);
        onNext();
    }

    return (
        <div className='w-96 max-w-3xl py-10'>
            <div className="flex items-center justify-center flex-col">
                <h1 className="leading-5 font-semibold text-lg">Create</h1>
                <h2 className="text-slate-400 text-sm">New Request</h2>
            </div>

            <div className='flex flex-col items-center pt-10 gap-3'>
                <Input
                    ref={requestedUserNameRef}
                    label="Requested by"
                    labelPlacement='outside'
                    placeholder='Enter Username'
                    radius='none'
                    classNames={{ ...formInputStyles }}
                />
                <Input
                    ref={subjectRef}
                    label="Subject"
                    labelPlacement='outside'
                    placeholder='Request for ...'
                    radius='none'
                    classNames={{ ...formInputStyles }}
                />
                <Input
                    ref={expectedAtRef}
                    type="date"
                    label="Expect a response by"
                    labelPlacement='outside'
                    placeholder='Select date'
                    radius='none'
                    classNames={{ ...formInputStyles }}
                />
                <Select
                    ref={requestTypeRef}
                    radius='none'
                    label="Type"
                    labelPlacement='outside'
                    placeholder='Select Request Type'
                    classNames={formSelectStyles}
                    listboxProps={listBoxProps}
                >
                    <SelectItem key="request">Request</SelectItem>
                    <SelectItem key="purchase_order">Purchase Order</SelectItem>
                    <SelectItem key="quotation">Quotation Request</SelectItem>
                </Select>

                <Divider className="my-5" />

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
        </div>
    );
}