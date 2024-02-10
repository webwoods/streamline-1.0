import { forwardRef, useEffect, useState, ChangeEvent, useRef } from "react";
import { FormField } from "../forms/formField";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { formButtonStyles } from "../forms/styles";
import NewPassword from '../auth/NewPassword';
import { useMutation } from "@apollo/client";
import { VERIFY_PASSWORD_MUTATION } from "@/gql/mutation";
import client from "@/gql/client";
import { ifError } from "assert";

interface Props {
    username?: string;
    onPasswordChange?: (data: any) => void;

}

export const PrivacyComponent = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const [enteredCurrentPassword, setEnteredCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordMatch, setPasswordMatch] = useState<boolean>(true);

    const currentPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const confirmNewPasswordRef = useRef<HTMLInputElement>(null);
    const [verfyPasswordMutation, { loading, data, error }] = useMutation(VERIFY_PASSWORD_MUTATION, { client })


    const validatePassword = (currentPassword: string) => {
        verfyPasswordMutation({
            variables: {
                password: currentPassword,
                username: props?.username
            }
        })

    };
    const validateNewPassword = (newPassword: string, confirmNewPassword: string) => {

        const isConfirmPasswordMatch = newPassword === confirmNewPassword;
        if (isConfirmPasswordMatch === false) {
            setPasswordMatch(false);
            return;
        }

    };
    const handleSave = () => {
        const currentPasswordInput = currentPasswordRef && currentPasswordRef?.current?.value;
        const newPasswordInput = newPasswordRef && newPasswordRef?.current?.value;
        const confirmNewPasswordInput = confirmNewPasswordRef && confirmNewPasswordRef?.current?.value;
        
        currentPasswordInput && validatePassword(currentPasswordInput)
    };

    useEffect(() => {
        if (data) {
            const newPasswordInput = newPasswordRef && newPasswordRef?.current?.value;
            const confirmNewPasswordInput = confirmNewPasswordRef && confirmNewPasswordRef?.current?.value;
            newPasswordInput && confirmNewPasswordInput && validateNewPassword(newPasswordInput, confirmNewPasswordInput)
        }
        if(error){
            alert(`Password mismatch error :${error}`)
            
        }
    }, [data,error]);

    useEffect(()=>{
        const currentPasswordInput = currentPasswordRef && currentPasswordRef?.current?.value;
        const newPasswordInput = newPasswordRef && newPasswordRef?.current?.value;
        const confirmNewPasswordInput = confirmNewPasswordRef && confirmNewPasswordRef?.current?.value;
        
        if(passwordMatch===true){
            props.onPasswordChange && props.onPasswordChange({
            currentPassword: currentPasswordInput,
            newPassword: newPasswordInput,
            confirmPassword: confirmNewPasswordInput
        });
        }
    },[passwordMatch])

    useEffect(()=>{
        console.log(props.username);
    },[])
    return (
        <div className="flex flex-col gap-5">

            <span className="text-2xl">
                Change password
            </span>

            <div className="flex flex-col gap-3">
                <FormField
                    label='Current Password'
                    placeholder='Current Password'
                    type='text'
                    ref={currentPasswordRef}
                    endContent={<FontAwesomeIcon icon={faEye} />}
                    isPasswordField={true}
                // onChange={handleCurrentPasswordChange}
                />

                {!passwordMatch && (
                    <div className='text-red-500 text-xs'>Entered current password does not match.</div>
                )}

                <FormField
                    label='New Password'
                    placeholder='Enter Your New Password'
                    type='text'
                    ref={newPasswordRef}
                    endContent={<FontAwesomeIcon icon={faEye} />}
                    isPasswordField={true}
                //  onChange={handleNewPasswordChange}
                />

                <FormField
                    label='Confirm Password'
                    placeholder='Re-Enter Your New Password'
                    type='text'
                    ref={confirmNewPasswordRef}
                    endContent={<FontAwesomeIcon icon={faEye} />}
                    isPasswordField={true}
                //onChange={handleConfirmPasswordChange}
                />
            </div>

            <div className='flex justify-end'>

                <Button className={formButtonStyles.primary}
                    onClick={handleSave}
                >
                    Save
                </Button>
            </div>


        </div>

    );
});
