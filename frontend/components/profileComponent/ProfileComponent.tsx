'use client'

import React, { Ref, RefObject, forwardRef, useEffect, useRef, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleXmark, faClose, faFloppyDisk, faPen, faPenAlt, faPenSquare, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { USER_QUERY } from '@/gql/query';
import client from '@/gql/client';
import Loading from '@/app/loading';
import { parseCookies } from 'nookies';
import { Button, Input, Tooltip } from '@nextui-org/react';
import { formButtonStyles, formInputStyles } from '../forms/styles';
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import { FormField } from '../forms/formField';
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { BasicProfileInfo } from './basicProfileInfo';
import { PrivacyComponent } from './privacyComponent';






function ProfileComponent() {

    const [currentUserId, setCurrentUserId] = useState<string>();
    const [getCurrentUser, { loading, error, data }] = useLazyQuery(USER_QUERY, { client });
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>("bio");

    // useLazyQuery is better than useQuery because we do not want to fetch the user data 
    // from the db just when a user visits the page. Instead, when ever a user is logged in,
    // and the 'currentUser' cookie is set, then and then only should the query run.

    // these `ref` objects keep track of teh latest values inside the input components.
    // const firstName = useRef<HTMLInputElement>(null);
    // const lastName = useRef<HTMLInputElement>(null);
    // const email = useRef<HTMLInputElement>(null);
    // const RoleName = useRef<HTMLInputElement>(null);
    // const division = useRef<HTMLInputElement>(null);
    // const password = useRef<HTMLInputElement>(null);

    const handleSaveButton = () => {
        // get the latest values of the input fields in the form
        // // when the save button is clicked.
        // console.log(firstName?.current?.value);
        // console.log(lastName?.current?.value);
        // console.log(email?.current?.value);
        // console.log(RoleName?.current?.value);
        // console.log(division?.current?.value);
    }



    const handleCancelButton = () => {
        console.log('clicked cancel!!');
    }

    const handleEditProfile = () => {
        setIsEditMode((prevEditMode) => !prevEditMode);
    }
    const getDataFromBio= (data:any)=> {
        console.log(data);
    }
    useEffect(() => {
        // when the component initially loads, fetch the current user cookie
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

    // useEffect(() => { console.log(firstName.current) }, [firstName]);
    
    useEffect(()=> {
            console.log(selected);

    },[selected])

    if (loading) { return <Loading />; }
    if (error) { return <div className='p-10'>error: {JSON.stringify(error)}</div> }

    return (
        < div className='flex  flex-col p-10 gap-3 w-full bg-white h-max rounded-2xl' >
            <div className='flex flex-col'>
                <span>Profile</span>
                <span>Edit Profile</span>
            </div>

            <div className='grid grid-cols-4'>

                <div className='col-span-1 flex flex-col  gap-2'>

                    {/* <span>Bio</span>
                <span>Privacy</span>
                <span>Settings</span> */}

                    <Tabs
                        aria-label="Options"
                        selectedKey={selected}
                        onSelectionChange={(key) => setSelected(key as string)}
                    >
                        <Tab key="bio" title="Bio" />
                        <Tab key="privacy" title="Privacy" />
                        <Tab key="settings" title="Settings" />

                    </Tabs>

                </div>

                <div className='col-span-3 flex flex-col item-center gap-2'>
                        {selected==='bio' && <BasicProfileInfo  getBioInfoData={getDataFromBio} isLoggedIn={loggedIn}/>}
                        {selected==='privacy' && <PrivacyComponent/>}
                        {/* {selected==='bio' && <BasicProfileInfo/>} */}

                </div>

            </div>



        </div >
    );
}

export default ProfileComponent;