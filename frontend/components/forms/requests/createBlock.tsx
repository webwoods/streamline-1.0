import { Button, Divider, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useMemo, useRef, useState } from "react";
import { formSelectStyles, formTextAreaStyles, listBoxProps } from "../styles";

export default function CreateBlock({ user, onNext, formInputStyles }: { user: string; onNext: () => void; formInputStyles: any }) {

    const requestedUserNameRef = useRef<HTMLInputElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);
    const expectedAtRef = useRef<HTMLInputElement>(null);
    const requestTypeRef = useRef<HTMLSelectElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const handleCancel = () => { }

    const handleNext = () => {
        const requestedUserName = requestedUserNameRef.current?.value || "";
        const subject = subjectRef.current?.value || "";
        const createdAt = new Date();
        const expectedAt = expectedAtRef.current?.value ? new Date(expectedAtRef.current?.value) : null;
        const requestType = requestTypeRef.current?.value || ""; // Assuming you want to add a ref for requestType as well
        const description = ""; // Assuming you want to add a ref for description as well
        const file = fileRef.current?.value || "";

        console.log({ requestedUserName, createdAt, expectedAt, requestType, description });
        // onNext();
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
                    <Button className='w-full rounded-[0.25rem] bg-slate-200 hover:bg-slate-300'>Cancel</Button>
                    <Button
                        className='w-full rounded-[0.25rem] text-slate-50 bg-slate-800 hover:text-accent-yellow hover:bg-slate-700'
                        onClick={handleNext}>Next</Button>
                </div>

            </div>
        </div>
    );
}