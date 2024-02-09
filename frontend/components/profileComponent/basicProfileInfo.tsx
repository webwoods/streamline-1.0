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
    const [allIsReadOnly, setAllIsReadOnly] = useState<boolean>(false);
    const firstName = useRef<HTMLInputElement>(null);
    const lastName = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const RoleName = useRef<HTMLInputElement>(null);
    const division = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
 


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

        props.getBioInfoData && props.getBioInfoData({
            firstName: firstName?.current?.value,
            lastName: lastName?.current?.value,
            email: email?.current?.value,
            role: RoleName?.current?.value,
            division: division?.current?.value

        })
    }
    useEffect(() => {
        props.isLoggedIn && setIsLoggedIn(props.isLoggedIn)
    }, [props?.isLoggedIn])

    
    useEffect(() => {
        //console.log('Allisreadonly button clicked',props?.allIsReadOnly);
        props?.allIsReadOnly && setAllIsReadOnly(props?.allIsReadOnly);
    }, [props?.allIsReadOnly])
    
    useEffect(()=>{
        console.log('ff',allIsReadOnly);
    },[allIsReadOnly])
    
    return (
        <>
            {/* <div>
                <span className='font-semibold text-lg'>Profile</span>
                <div className='text-xs text-slate-500 flex gap-1 items-center'>
                    <span>{isEditMode ? "Cancel Edit" : "Save Edit"}</span>
                    <Button isIconOnly onClick={handleEditProfile} className='bg-transparent'>
                        {isEditMode ?
                            <FontAwesomeIcon icon={faCircleXmark} />
                            :
                            <FontAwesomeIcon icon={faPen} />
                        }
                    </Button>
                </div>
            </div> */}

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
                            allIsReadOnly={allIsReadOnly}
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