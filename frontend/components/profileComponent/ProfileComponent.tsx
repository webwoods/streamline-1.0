'use client'

import React, { Ref, RefObject, forwardRef, useEffect, useRef, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faClose, faPen, faPenAlt, faPenSquare, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { USER_QUERY } from '@/gql/query';
import client from '@/gql/client';
import Loading from '@/app/loading';
import { parseCookies } from 'nookies';
import { Button, Input, Tooltip } from '@nextui-org/react';

interface FormFieldProps {
    label?: string
    placeholder?: string
    type?: string
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>((props, ref) => {
    const [isReadOnly, setIsReadOnly] = useState<boolean>(true);

    const handleReadOnly = () => {
        setIsReadOnly(!isReadOnly);
    }

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
                isReadOnly={isReadOnly}
                type={props.type}
                placeholder={props.placeholder}
                ref={ref}
            />
        </div>
    )
});

function ProfileComponent() {

    const [currentUserId, setCurrentUserId] = useState<string>();
    const [getCurrentUser, { loading, error, data }] = useLazyQuery(USER_QUERY, { client });
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    // useLazyQuery is better than useQuery because we do not want to fetch the user data 
    // from the db just when a user visits the page. Instead, when ever a user is logged in,
    // and the 'currentUser' cookie is set, then and then only should the query run.

    // these `ref` objects keep track of teh latest values inside the input components.
    const firstName = useRef<HTMLInputElement>(null);
    const lastName = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);

    const handleSaveButton = () => {
        // get the latest values of the input fields in the form
        // when the save button is clicked.
        console.log(firstName?.current?.value);
        console.log(lastName?.current?.value);
        console.log(email?.current?.value);
    }

    const handleCancelButton = () => {
        console.log('clicked cancel!!');
    }

    useEffect(() => {
        // when the component intially loads, fetch the current user cookie
        if (parseCookies()['currentUser']) {
            const parsedUserId = JSON.parse(parseCookies()['currentUser']).id;
            setCurrentUserId(parsedUserId);
            setLoggedIn(true);
        } else {
            // you are not logged in
            setLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        // when the currentUserId is set, then check if it is valid.
        // if yes, fetch the user data from db using lazy query.
        if (currentUserId) {
            getCurrentUser({ variables: { id: currentUserId } });
        }
    }, [currentUserId]);

    useEffect(() => { console.log(firstName.current) }, [firstName]);

    if (loading) { return <Loading />; }
    if (error) { return <div className='p-10'>error: {JSON.stringify(error)}</div> }

    return (
        < div className='flex flex-col p-10 gap-3 w-96 bg-white h-max rounded-2xl' >

            {
                loggedIn ?
                <>
                    <FormField
                        label='First name'
                        placeholder='Billy'
                        type='text'
                        ref={firstName}
                    />

                    <FormField
                        label='Last name'
                        placeholder='Jeans Jr.'
                        type='text'
                        ref={lastName}
                    />

                    <FormField
                        label='Email'
                        placeholder='billy@jeans.com'
                        type='email'
                        ref={email}
                    />

                    <div className='flex justify-between gap-3'>
                        <Button className='w-full' onClick={handleCancelButton}>Cancel</Button>
                        <Button className='w-full' onClick={handleSaveButton}>Save</Button>
                    </div>
                </> :
                <>Please log in to the system to view your profile settings.</>
            }
        </div >
    );
}

export default ProfileComponent;
