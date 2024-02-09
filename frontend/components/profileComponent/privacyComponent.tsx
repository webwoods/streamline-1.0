import { forwardRef, useEffect, useState, ChangeEvent } from "react";
import { FormField } from "../forms/formField";
import { Button } from "@nextui-org/react";
interface Props {
    currentPassword: string;
    onPasswordChange?: (newPassword: string) => void;
}

export const PrivacyComponent = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const [enteredCurrentPassword, setEnteredCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordMatch, setPasswordMatch] = useState<boolean>(true);

    const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEnteredCurrentPassword(e.target.value);
        setPasswordMatch(true); // Reset the password match status on input change
    };

    const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    useEffect(() => {
        const validatePassword = () => {
            const isPasswordMatch = enteredCurrentPassword === props.currentPassword;
            setPasswordMatch(isPasswordMatch);
        };

        validatePassword();
    }, [enteredCurrentPassword, props.currentPassword]);

    useEffect(() => {
        if (newPassword === confirmPassword) {
            // Passwords match, pass the new password to the parent component
            props.onPasswordChange && props.onPasswordChange(newPassword);
        }
    }, [newPassword, confirmPassword, props.onPasswordChange]);

    return (
        <div>
            <FormField
                label='Current Password'
                placeholder='Enter Your Current Password'
                type='password'
                ref={ref}
               // onChange={handleCurrentPasswordChange}
            />
            {!passwordMatch && (
                <div className='text-red-500 text-xs'>Entered current password does not match.</div>
            )}

            <FormField
                label='New Password'
                placeholder='Enter Your New Password'
                type='password'
                ref={ref}
              //  onChange={handleNewPasswordChange}
            />

            <FormField
                label='Confirm Password'
                placeholder='Re-Enter Your New Password'
                type='password'
                ref={ref}
                //onChange={handleConfirmPasswordChange}
            />

            <div className='flex justify-between gap-3'>
                <Button className='bg-red-500' 
                //onClick={props.onCancel}
                >
                    Cancel
                </Button>
                <Button className='bg-green-500'
                // onClick={handleSaveButton}
                 > 
                    Save
                </Button>
            </div>
        

    </div>
       
    );
});
