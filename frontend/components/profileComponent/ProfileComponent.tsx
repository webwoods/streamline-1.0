'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { USER_QUERY } from '@/gql/query';
import client from '@/gql/client';
import Loading from '@/app/loading';
import { parseCookies } from 'nookies';

interface ProfileFieldProps {
    type?: string
    label?: string
    placeholder?: string
    defaultValue?: string
    value?: string
    ref?: string
    onChange?: (value: string) => void
}

const ProfileField = ({
    type,
    label,
    placeholder,
    defaultValue,
    value = '',
    onChange
}: ProfileFieldProps) => {

    return (
        <div className="flex items-end">
            <input
                type={type}
                aria-label={label}
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value}
                className="max-w-xs"
            />

            <button type="button" style={{ marginLeft: '5px' }}>
                <FontAwesomeIcon icon={faPen} />
            </button>
        </div>
    );
};

function ProfileComponent() {
    // const [currentUser, setCurrentUser] = useState(JSON.parse(parseCookies()['currentUser']));

    // const [firstName, setFirstName] = useState<string>();

    // const { loading, error, data } = useQuery(USER_QUERY, {
    //     client,
    //     variables: {
    //         id: currentUser.id
    //     }
    // });

    // if (loading) { return <Loading />; }

    // const handleSubmit = () => {
    //     console.log('Form submitted with data:',);
    // };

    return (
        <div className="flex flex-col items-center ml-10">
            {/* <ProfileField
                label="First Name"
                placeholder="First Name"
                type="text"
            />
            <button type="button" onClick={handleSubmit} style={{ marginTop: '10px' }}>
                Submit
            </button> */}
        </div>
    );
}

export default ProfileComponent;
