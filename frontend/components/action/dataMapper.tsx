'use client'

import { Accordion, AccordionItem, Button, Input, Select, SelectItem, Textarea, Tooltip } from "@nextui-org/react";
import { Ref, RefObject, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { formInputStyles, formSelectStyles, formTextAreaStyles } from "../forms/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faPenClip } from "@fortawesome/free-solid-svg-icons";

interface Props {
    data?: any
    onSelectStatus?: (e: any) => void
    onSubjectMapperRef?: (ref: RefObject<any>) => void
    onDescriptionMapperRef?: (ref: RefObject<any>) => void
    updateFormData?: () => void
}

function getStatusColor(status: string) {
    switch (status) {
        case 'AWAITING_APPROVAL':
            return 'text-gray-500';
        case 'PROCESSING':
            return 'text-blue-500';
        case 'PENDING':
            return 'text-yellow-500';
        case 'APPROVED':
            return 'text-green-500';
        case 'REJECTED':
            return 'text-red-500';
        default:
            return 'text-black';
    }
};

function convertObjectToString(obj: any) {
    // Convert values to strings
    const stringValues: { [key: string]: string } = Object.entries(obj).reduce(
        (acc: any, [key, value]) => {
            acc[key] = value ? String(value) : '';
            return acc;
        },
        {}
    );

    return stringValues;
}

function extractDateOnly(date: any) {
    return new Date(date).toLocaleDateString();
}

function ToolTipIconOnlyButton({ content, onClick, isReadOnly }: {
    content?: string,
    onClick?: () => void,
    isReadOnly?: boolean
}) {
    return (
        <Tooltip content={content} className="text-xs">
            <Button
                className="bg-transparent"
                isIconOnly
                onClick={onClick}
            >
                {
                    isReadOnly ?
                        <FontAwesomeIcon size="1x" icon={faPenClip} /> :
                        <FontAwesomeIcon size="lg" icon={faFloppyDisk} />
                }
            </Button>
        </Tooltip>
    );
}

function DateMapper({ date, title, pStyle, spanLeftStyle }: { title: string, date: any, pStyle?: string, spanLeftStyle?: string }) {
    return (
        <p className={pStyle}>
            <span className={spanLeftStyle}>{title}:</span>
            <span className="text-right text-xs">{extractDateOnly(date)}</span>
        </p>
    )
}

function DescriptionMapper({ content, style }: { content: string, style?: string }) {
    // Split the content into paragraphs using '\n\n' as a separator
    const paragraphs = content.split('\n\n');

    return (
        <>
            {paragraphs.map((paragraph, index) => (
                <p className={style} key={index}>{paragraph}</p>
            ))}
        </>
    );
}

function UserDataMapper({ content, style }: { content: any, style?: any }) {
    return (
        <>{
            content ?

                <>
                    <p className={style?.pStyle}>
                        <span className={style?.spanLeftStyle}>Id:</span>
                        <span className={style?.spanRightStyle}>{content.id}</span>
                    </p>

                    <p className={style?.pStyle}>
                        <span className={style?.spanLeftStyle}>Name:</span>
                        <span className={style?.spanRightStyle}>{content.name}</span>
                    </p>

                    <p className={style?.pStyle}>
                        <span className={style?.spanLeftStyle}>Email:</span>
                        <span className={style?.spanRightStyle}>{content.email}</span>
                    </p>

                    <p className={style?.pStyle}>
                        <span className={style?.spanLeftStyle}>Role:</span>
                        <span className={style?.spanRightStyle}>{content.role?.name}</span>
                    </p>

                    <p className={style?.pStyle}>
                        <span className={style?.spanLeftStyle}>Division:</span>
                        <span className={style?.spanRightStyle}>{content.role?.division}</span>
                    </p>
                </>

                : 'No user assigned. Please contact you administator.'
        }
        </>
    );
}

function RequestItemsDataMapper({ content, style }: { content: any, style?: any }) {
    return (
        <div className="flex flex-col gap-1">
            {Array.isArray(content) && content.length > 0 ? (
                content.map((item: any, index: number) => (
                    <div key={item.id}>
                        <p className={style?.pStyle}>
                            <span className={style?.spanLeftStyle}>Id:</span>
                            <span className={style?.spanRightStyle}>{item.id}</span>
                        </p>

                        <p className={style?.pStyle}>
                            <span className={style?.spanLeftStyle}>Quantity:</span>
                            <span className={style?.spanRightStyle}>{item.qty} {item.storeItem?.unit}</span>
                        </p>

                        <p className={style?.pStyle}>
                            <span className={style?.spanLeftStyle}>Store Item:</span>
                            <span className={style?.spanRightStyle}>{item.storeItem?.name}</span>
                        </p>

                        <p className={style?.pStyle}>
                            <span className={style?.spanLeftStyle}>SKU:</span>
                            <span className={style?.spanRightStyle}>{item.storeItem?.sku}</span>
                        </p>

                        <p className={style?.pStyle}>
                            <span className={style?.spanLeftStyle}>Unit price:</span>
                            <span className={style?.spanRightStyle}>{item.storeItem?.price}</span>
                        </p>

                        <p className={style?.pStyle}>
                            <span className={style?.spanLeftStyle}>Additional info:</span>
                            <span className={style?.spanRightStyle}>{JSON.stringify(item.storeItem?.properties)}</span>
                        </p>
                    </div>
                ))
            ) : (
                'Currently, there are no request items for this request.'
            )}
        </div>
    );
}

interface EditableSubjectMapperProps {
    content: string;
    style?: any;
    updateFormData?: () => void
}

export const EditableSubjectMapper = forwardRef((
    { content, style, updateFormData }: EditableSubjectMapperProps,
    ref: Ref<any>,
) => {
    const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleIsReadOnly = () => {
        // if (!isReadOnly) {
        //     updateFormData && updateFormData(); // Call the updateFormData function whenever the value changes
        // }
        setIsReadOnly((prevIsReadOnly) => !prevIsReadOnly);
    };

    useImperativeHandle(ref, () => ({
        getSubjectValue: () => inputRef.current?.value || content,
    }), [inputRef]);

    return (
        <Input
            ref={inputRef}
            label={
                <div className="flex items-center">
                    <span>Subject: </span>
                    <ToolTipIconOnlyButton
                        content={isReadOnly ? 'edit' : 'save'}
                        onClick={handleIsReadOnly}
                        isReadOnly={isReadOnly}
                    />
                </div>
            }
            labelPlacement="outside"
            isReadOnly={isReadOnly}
            classNames={{
                ...style,
                mainWrapper: 'w-full'
            }}
            placeholder={content}
            defaultValue={content}
        />
    );
});

interface EditableDescriptionMapperProps {
    content: string;
    style?: any;
    updateFormData?: () => void
}

export const EditableDescriptionMapper = forwardRef((
    { content, style, updateFormData }: EditableDescriptionMapperProps,
    ref: Ref<any>,
) => {
    const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleIsReadOnly = () => {
        // if (!isReadOnly) {
        //     updateFormData && updateFormData(); // Call the updateFormData function whenever the value changes
        // }
        setIsReadOnly((prevIsReadOnly) => !prevIsReadOnly);
    };

    useImperativeHandle(ref, () => ({
        getDescriptionValue: () => inputRef.current?.value || content,
    }), [inputRef]);

    return (
        <Textarea
            ref={inputRef}
            label={
                <div className="flex items-center">
                    <span>Remarks: </span>
                    <ToolTipIconOnlyButton
                        content={isReadOnly ? 'edit' : 'save'}
                        onClick={handleIsReadOnly}
                        isReadOnly={isReadOnly}
                    />
                </div>
            }
            isReadOnly={isReadOnly}
            labelPlacement="outside"
            classNames={style}
            placeholder={content}
            defaultValue={content}
        />
    );
});

export function RequestDataMapper({ data = {} }: Props) {
    // Define the keys to exclude
    const excludedKeys = ['__typename', 'id', 'requestedUserId', 'requestedBy'];

    // Filter out the excluded keys
    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([key]) => !excludedKeys.includes(key))
    );

    const stringData = convertObjectToString(filteredData);

    // console.log(filteredData);

    const pStyle = "flex justify-between";
    const spanLeftStyle = "text-left font-semibold text-xs";
    const spanRightStyle = "text-right text-xs";

    return (
        <>
            {/* dates */}
            <DateMapper title="Date created" date={stringData['createdAt']} pStyle={pStyle} spanLeftStyle={spanLeftStyle} />
            <DateMapper title="Date updated" date={stringData['updatedAt']} pStyle={pStyle} spanLeftStyle={spanLeftStyle} />

            {/* status */}
            <p className={pStyle}>
                <span className={spanLeftStyle}>Status:</span>
                <span className={getStatusColor(stringData['status'])}>{stringData['status']}</span>
            </p>

            <hr className="my-2"></hr>

            {/* subject and description */}
            <p className={pStyle}>
                <span className={spanLeftStyle}>Subject:</span>
                <span className={spanRightStyle}>{stringData['subject']}</span>
            </p>
            <div className="flex flex-col gap-2">
                <span className={spanLeftStyle}>Description:</span>
                <DescriptionMapper content={stringData['description']} style="text-xs text-justify py-1" />
            </div>

            <hr className="my-2"></hr>

        </>
    );
}

export function EditableRequestDataMapper({
    data = {},
    onSelectStatus,
    onSubjectMapperRef,
    onDescriptionMapperRef,
    updateFormData
}: Props) {
    // Define the keys to exclude
    const excludedKeys = ['__typename', 'id', 'requestedUserId', 'requestedBy'];

    // Filter out the excluded keys
    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([key]) => !excludedKeys.includes(key))
    );

    const stringData = convertObjectToString(filteredData);

    // console.log(filteredData);

    const pStyle = "flex justify-between";
    const spanLeftStyle = "text-left font-semibold text-xs";
    const spanRightStyle = "text-right text-xs";

    return (
        <>
            {/* dates */}
            <DateMapper title="Date created" date={stringData['createdAt']} pStyle={pStyle} spanLeftStyle={spanLeftStyle} />
            <DateMapper title="Date updated" date={stringData['updatedAt']} pStyle={pStyle} spanLeftStyle={spanLeftStyle} />

            {/* status */}
            <Select
                label="Status"
                classNames={{ ...formSelectStyles }}
                onChange={(e) => onSelectStatus && onSelectStatus(e.target.value)}
                defaultSelectedKeys={[data?.status]}
            >
                <SelectItem className={getStatusColor("AWAITING_APPROVAL")} key={"AWAITING_APPROVAL"} aria-label="AWAITING_APPROVAL">AWAITING_APPROVAL</SelectItem>
                <SelectItem className={getStatusColor("PROCESSING")} key={"PROCESSING"} aria-label="PROCESSING">PROCESSING</SelectItem>
                <SelectItem className={getStatusColor("PENDING")} key={"PENDING"} aria-label="PENDING">PENDING</SelectItem>
                <SelectItem className={getStatusColor("APPROVED")} key={"APPROVED"} aria-label="APPROVED">APPROVED</SelectItem>
                <SelectItem className={getStatusColor("REJECTED")} key={"REJECTED"} aria-label="REJECTED">REJECTED</SelectItem>
            </Select>

            <hr className="my-2"></hr>

            {/* subject and description */}
            <EditableSubjectMapper
                content={stringData['subject']}
                style={formInputStyles}
                ref={(ref) => onSubjectMapperRef && onSubjectMapperRef(ref)}
                updateFormData={updateFormData}
            />
            <EditableDescriptionMapper
                content={stringData['description']}
                style={formTextAreaStyles}
                ref={(ref) => onDescriptionMapperRef && onDescriptionMapperRef(ref)}
                updateFormData={updateFormData}
            />

            <hr className="my-2"></hr>

            <Accordion defaultExpandedKeys={["1"]}>
                <AccordionItem
                    key="1"
                    aria-label="requested user info"
                    subtitle="Press to expand"
                    title="Requested User Info"
                >
                    <UserDataMapper
                        content={data?.requestedUser}
                        style={{ pStyle, spanLeftStyle, spanRightStyle }}
                    />
                </AccordionItem>
                <AccordionItem
                    key="2"
                    aria-label="requested user info"
                    subtitle="Press to expand"
                    title="Requested Items Info"
                >
                    <RequestItemsDataMapper
                        content={data?.requestItems}
                        style={{ pStyle, spanLeftStyle, spanRightStyle }}
                    />
                </AccordionItem>
            </Accordion>

        </>
    );
}

export default function DataMapper({ data = {} }: Props) {

    useEffect(() => {
        console.log('DATA MAPPER', data);
    }, [data]);

    return (
        <div className="flex flex-col gap-1">
            {
                data &&
                // Object.entries(data).map(([key, value]) => (
                //     <p key={key} className="flex justify-between">
                //         <span className="text-left font-medium text-xs">{key}:</span>
                //         <span className="text-right text-xs">{value ? JSON.stringify(value) : ''}</span>
                //     </p>
                // )) &&
                data.requestType === 'REQUEST' && <RequestDataMapper data={data} />
            }
        </div>
    );
}