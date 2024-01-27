import { Button, Divider, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { formButtonStyles, formSelectStyles, formTextAreaStyles, listBoxProps } from "../styles";
import { useRouter } from "next/navigation";
import SearchUserInput from "../searchUserInput";

interface Props {
    onNext: () => void
    formInputStyles: any
    onDataSubmit?: (data: any) => void
};

export default function CreateBlock({ onNext, formInputStyles, onDataSubmit }: Props) {

    const subjectRef = useRef<HTMLInputElement>(null);
    const expectedAtRef = useRef<HTMLInputElement>(null);
    const requestTypeRef = useRef<HTMLSelectElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const [isSubjectValid, setIsSubjectValid] = useState<boolean>(true);
    const [isExpectedDateValid, setIsExpectedDateValid] = useState<boolean>(true);

    const [requestedUser, setRequestedUser] = useState<any>(null);

    const handleCancel = () => {
        router.push('/requests');
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
            status 
        };
        
        if (requestedUser === null || !isExpectedDateValid || !isSubjectValid) {
            alert('"Requested by", "Subject" and "Expect a response by" are required. Please check if any of them are empty.');
            return;
        }

        onDataSubmit && onDataSubmit(formData);
        onNext();
    }

    const handleUserNameChange = useCallback((user: any) => {
        setRequestedUser(user);
    }, []);

    return (
        <div className='w-96 max-w-3xl py-10'>
            <div className="flex items-center justify-center flex-col">
                <h1 className="leading-5 font-semibold text-lg">Create</h1>
                <h2 className="text-slate-400 text-sm">New Request</h2>
            </div>

            <div className='flex flex-col items-center pt-10 gap-3'>
                <SearchUserInput
                    formInputStyles={formInputStyles}
                    onUserNameChange={handleUserNameChange}
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