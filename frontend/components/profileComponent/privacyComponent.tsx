import { forwardRef, useEffect, useState, ChangeEvent, useRef } from "react";
import { FormField } from "../forms/formField";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { formButtonStyles } from "../forms/styles";

interface Props {
    //currentPassword: string;
    onPasswordChange?: (newPassword: string) => void;
    
}

export const PrivacyComponent = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const [enteredCurrentPassword, setEnteredCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordMatch, setPasswordMatch] = useState<boolean>(true);

    const currentPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const confirmNewPasswordRef = useRef<HTMLInputElement>(null);



    const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEnteredCurrentPassword(e.target.value);
    };

    const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSave = () => {
       const currentPasswordInput = currentPasswordRef && currentPasswordRef?.current?.value;
       const newPasswordInput = newPasswordRef && newPasswordRef?.current?.value;
       const confirmNewPasswordInput = confirmNewPasswordRef && confirmNewPasswordRef?.current?.value;
        console.log({
            currentPassword : currentPasswordInput,
            newPassword : newPasswordInput,
            confirmPassword : confirmNewPasswordInput
        });

    };
    // useEffect(() => {
    //     const validatePassword = () => {
    //         const isPasswordMatch = enteredCurrentPassword === props.currentPassword;
    //         setPasswordMatch(isPasswordMatch);
    //     };

    //     validatePassword();
    // }, [enteredCurrentPassword, props.currentPassword]);

    // useEffect(() => {
    //     if (newPassword === confirmPassword) {
    //         // Passwords match, pass the new password to the parent component
    //         props.onPasswordChange && props.onPasswordChange(newPassword);
    //     }
    // }, [newPassword, confirmPassword, props.onPasswordChange]);

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
