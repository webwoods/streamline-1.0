
'use client'

import { forwardRef } from "react";
import { FormField } from "../forms/formField";

interface Props {
    password?: string
}

export const PrivacyComponent = forwardRef<HTMLInputElement, Props>((props, ref) => {

    return (
        <div>
            <FormField
                label='Password'
                placeholder='Enter Your Password'
                type='password'
                ref={ref}
            />
        </div>
    )
});