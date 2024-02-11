'use client'

import React, { Ref, RefObject, forwardRef, useEffect, useRef, useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleXmark, faClose, faFloppyDisk, faPen, faPenAlt, faPenSquare, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { USER_QUERY } from '@/gql/query';
import client from '@/gql/client';
import Loading from '@/app/loading';
import { parseCookies } from 'nookies';
import { Button } from '@nextui-org/react';
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { BasicProfileInfo } from './basicProfileInfo';
import { PrivacyComponent } from './privacyComponent';
import { UPDATE_USER_MUTATION, VERIFY_PASSWORD_MUTATION } from '@/gql/mutation';

function ProfileComponent() {

    const [currentUserId, setCurrentUserId] = useState<string>();
    const [getCurrentUser, { loading, error, data }] = useLazyQuery(USER_QUERY, { client });
    const [currentUserName, setCurrentUserName] = useState<string>();
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>("bio");
    const [formData, setFormData] = useState<any>();
    const [allIsReadOnly, setAllIsReadOnly] = useState<boolean>(true);
    const [UpdateUserMutation, { loading:updateUserLoading, data:updateUserData, error:UpdateUserError }] = useMutation(UPDATE_USER_MUTATION, { client })

    const handleAllIsReadOnly = () => {
        setAllIsReadOnly((prevAllIsReadOnly) => !prevAllIsReadOnly)
    }

    const handleChangePassword = (data : any)=> {
        console.log('profile component received changed password', data);
    }

    const handleSaveButton = () => {
        console.log('clicked save!!');
    }

    const handleCancelButton = () => {
        console.log('clicked cancel!!');
    }

    const getDataFromBio = (data: any) => { 
        setFormData(data) };

    useEffect(()=>{
        if(formData!==null || formData!==undefined){
            UpdateUserMutation({
                variables: {
                    id:currentUserId,
                    input: {
                        name: formData?.name!== '' ? formData?.name : data?.user?.name,
                        email: formData?.email!=='' ? formData?.email : data?.user?.email,
                        username : formData?.username !== '' ? formData?.username : data?.username.email
                    }
                }
            })
    
        }
    },[formData])

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

    useEffect(()=>{
        if(data){
            console.log(data)
        }
    },[data])
    
    useEffect(()=>{
        if(updateUserData){
            alert('Successfully Created User');
        }
    },[updateUserData])

    if (loading) { return <Loading />; }
    if (error) { return <div className='p-10'>error: {JSON.stringify(error)}</div> }
    
    return (
        < div className='flex  flex-col p-10 gap-3 w-full bg-white h-max rounded-2xl' >
            <div>
                <span className='font-semibold text-lg'>Profile</span>
                <div className='text-xs text-slate-500 flex items-center'>
                    <Button
                        size='sm'
                        isIconOnly
                        onClick={handleAllIsReadOnly}
                        className='bg-transparent w-16'
                        endContent={
                            !allIsReadOnly ?
                                <FontAwesomeIcon icon={faCircleXmark} />
                                :
                                <FontAwesomeIcon size='sm' icon={faPen} />
                        }
                    >
                        <span className='pr-3'>{!allIsReadOnly ? "cancel" : "edit"}</span>
                    </Button>
                </div>
            </div>

            <div className='grid grid-cols-4'>

                <div className='col-span-1 flex flex-col  gap-2'>

                    <Tabs
                        aria-label="Options"
                        selectedKey={selected}
                        onSelectionChange={(key) => setSelected(key as string)}
                        variant='light'
                        classNames={{
                            tabList: 'flex flex-col',
                            tab: 'flex justify-start'
                        }}
                    >
                        <Tab key="bio" title="Bio" />
                        <Tab key="privacy" title="Privacy" />
                        <Tab key="settings" title="Settings" />

                    </Tabs>

                </div>

                <div className='col-span-3 flex flex-col item-center gap-2'>
                    {selected === 'bio' && <BasicProfileInfo allIsReadOnly={allIsReadOnly} getBioInfoData={getDataFromBio} isLoggedIn={loggedIn} />}
                    {selected === 'privacy' && <PrivacyComponent onPasswordChange={handleChangePassword} username={data?.user?.username}/>}
                    {/* {selected==='bio' && <BasicProfileInfo/>} */}

                </div>

            </div>
        </div >
    );
}

export default ProfileComponent;