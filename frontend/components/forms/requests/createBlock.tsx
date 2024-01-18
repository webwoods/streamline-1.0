import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useState } from "react";

export default function CreateBlock({ user, onNext, formInputStyles }: { user: string; onNext: () => void; formInputStyles: any }) {
    const currentDate = new Date();
    const expectedDate = new Date();
    expectedDate.setMonth(currentDate.getMonth() + 1);

    const [requestedUserName, setRequestedUserName] = useState<string>(user ? JSON.parse(user).name : "");
    const [createdAt, setCreatedAt] = useState<string>(currentDate.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }));
    const [expectedAt, setExpectedAt] = useState<string>(expectedDate.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }));
    const [requestType, setRequestType] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [flag, setFlag] = useState(false);

    const handleCancel = () => { }

    const handleNext = () => {
        setFlag(true);
        console.log({ requestedUserName, createdAt, expectedAt, requestType, description });
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
                    label="Requested by"
                    labelPlacement='outside'
                    placeholder='Enter Name'
                    radius='none'
                    value={requestedUserName}
                    onChange={(e) => setRequestedUserName(e.target.value)}
                    isInvalid={flag && requestedUserName === ""}
                    errorMessage={flag && requestedUserName === "" ? "Please enter a valid username" : ""}
                    classNames={{ ...formInputStyles }} />
                <Input
                    type='date'
                    label="Created date"
                    labelPlacement='outside'
                    placeholder='Select date'
                    radius='none'
                    value={createdAt}
                    onChange={(e) => setCreatedAt(e.target.value)}
                    isInvalid={flag && createdAt === ""}
                    errorMessage={flag && createdAt === "" ? "Please enter a valid username" : ""}
                    classNames={{ ...formInputStyles }} />
                <Input
                    type='date'
                    label="Expect response by"
                    labelPlacement='outside'
                    placeholder='Select date'
                    radius='none'
                    value={expectedAt}
                    onChange={(e) => setExpectedAt(e.target.value)}
                    classNames={{ ...formInputStyles }} />
                <Select
                    radius='none'
                    label="Type"
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    labelPlacement='outside'
                    placeholder='Select Request Type'
                    classNames={{
                        trigger: "rounded-[0.25rem]",
                        popover: "rounded-sm",
                    }}
                    listboxProps={{
                        itemClasses: {
                            base: "rounded-[0.25rem]"
                        }
                    }}
                >
                    <SelectItem key="Gas">Gas</SelectItem>
                    <SelectItem key="Lab equipment">Lab equipment</SelectItem>
                </Select>
                <Textarea
                    label="Remarks"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    labelPlacement='outside'
                    radius='none'
                    classNames={{
                        inputWrapper: "rounded-[0.25rem]"
                    }}
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