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
    const [isReadOnly, setIsReadOnly] = useState<boolean>(true);

    const handleReadOnly = () => {
        setIsReadOnly(!isReadOnly);
    }
    useEffect(()=>{
        if(props.allIsReadOnly){
            console.log("formFieldIsReadOnly", props.allIsReadOnly);
            setIsReadOnly(props.allIsReadOnly);
        }

    },[props.allIsReadOnly])

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
                classNames={formInputStyles}
                isReadOnly={isReadOnly}
                type={props.type}
                placeholder={props.placeholder}
                ref={ref}
            />
        </div>
    )
});