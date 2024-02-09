import { faCircleXmark, faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { forwardRef, useEffect, useState } from "react";
import { formInputStyles } from "./styles";


interface FormFieldProps {
    label?: string
    placeholder?: string
    type?: string
    allIsReadOnly?: boolean
}


export const FormField = forwardRef<HTMLInputElement, FormFieldProps>((props, ref) => {
    const [isReadOnly, setIsReadOnly] = useState<boolean>(props.allIsReadOnly || true);

    const handleReadOnly = () => {
        setIsReadOnly(!isReadOnly);
    }

    useEffect(() => {
        if (props.allIsReadOnly !== undefined) {
            setIsReadOnly(props.allIsReadOnly);
        }
    }, [props.allIsReadOnly]);

    useEffect(() => {
        console.log('child component received new allIsReadOnly value', isReadOnly);
    }, [isReadOnly]);

    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-between'>
                <span className='text-xs text-slate-500'>{props.label}</span>
                <Tooltip content='edit' className='text-xs'>
                    <Button
                        isIconOnly
                        size='sm'
                        className='p-0 bg-transparent text-slate-400'
                        startContent={<FontAwesomeIcon size='sm' icon={isReadOnly ? faPenAlt : faCircleXmark} />}
                        onClick={handleReadOnly}
                    />
                </Tooltip>
            </div>
            <Input
                classNames={{
                    ...formInputStyles,
                    inputWrapper:`${isReadOnly ? 'bg-slate-50' : 'bg-blue-50'} rounded-[0.25rem]`
                }}
                isReadOnly={isReadOnly}
                type={props.type}
                placeholder={props.placeholder}
                ref={ref}
            />
        </div>
    )
});