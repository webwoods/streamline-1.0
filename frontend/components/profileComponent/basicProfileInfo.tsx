import { faCircleXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { FormField } from "../forms/formField";
import { formButtonStyles } from "../forms/styles";

interface Props {
    isLoggedIn?: boolean;
    getBioInfoData?: (data: any) => void
    allIsReadOnly?: boolean
}

export const BasicProfileInfo = forwardRef<any, Props>((props, ref) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [allIsReadOnly, setAllIsReadOnly] = useState<boolean>(props.allIsReadOnly || true);
    const firstName = useRef<HTMLInputElement>(null);
    const lastName = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const RoleName = useRef<HTMLInputElement>(null);
    const division = useRef<HTMLInputElement>(null);

    const handleEditProfile = () => {
        setIsEditMode((prevEditMode) => !prevEditMode);
    }

    const handleCancelButton = () => {
        console.log('clicked cancel!!');
    }

    const handleSaveButton = () => {
        // get the latest values of the input fields in the form
        // when the save button is clicked.
        console.log(firstName?.current?.value);
        console.log(lastName?.current?.value);
        console.log(email?.current?.value);
        console.log(RoleName?.current?.value);
        console.log(division?.current?.value);
        
        const fName = firstName?.current?.value;
        const lName = lastName?.current?.value;
        let name : string = "";
        if(fName && lName){
            name= `${fName} ${lName}`
        }

        props.getBioInfoData && props.getBioInfoData({
            name:name,
            email: email?.current?.value,
            role: RoleName?.current?.value,
            division: division?.current?.value

        })
    }

    useEffect(() => {
        props.isLoggedIn && setIsLoggedIn(props.isLoggedIn)
    }, [props?.isLoggedIn])

    useEffect(() => {
        if (props.allIsReadOnly !== undefined) {
            setAllIsReadOnly(props.allIsReadOnly);
        }
    }, [props.allIsReadOnly]);

    useEffect(() => {
        console.log('child component received new allIsReadOnly value', allIsReadOnly);
    }, [allIsReadOnly]);

    return (
        <>
            {
                isLoggedIn ?
                    <>
                        <FormField
                            label='First name'
                            placeholder='Billy'
                            type='text'
                            ref={firstName}

                            allIsReadOnly={allIsReadOnly}
                        />

                        <FormField
                            label='Last name'
                            placeholder='Jeans Jr.'
                            type='text'
                            ref={lastName}
                            allIsReadOnly={allIsReadOnly}
                        />

                        <FormField
                            label='Email'
                            placeholder='billy@jeans.com'
                            type='email'
                            ref={email}
                            allIsReadOnly={!allIsReadOnly}
                        />

                        <FormField
                            label='Role Name'
                            placeholder='Director'
                            type='text'
                            ref={RoleName}
                            allIsReadOnly={allIsReadOnly}
                        />

                        <FormField
                            label='Division'
                            placeholder='Accounts'
                            type='text'
                            ref={division}
                            allIsReadOnly={allIsReadOnly}
                        />

                        <div className='flex justify-between gap-3'>
                            <Button className={formButtonStyles.secondary} onClick={handleCancelButton}>Cancel</Button>
                            <Button className={formButtonStyles.primary} onClick={handleSaveButton}>Save</Button>
                        </div>
                    </> :
                    <>Please log in to the system to view your profile settings.</>
            }
        </>
    )
})