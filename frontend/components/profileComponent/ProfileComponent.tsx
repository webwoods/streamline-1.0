'use client'
import { Avatar, Input } from "@nextui-org/react"
import { useState } from "react";

function ProfileComponent() {

    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [designation, setDesignation] = useState('');
    const [division, setDivision] = useState('');
    const [permissions, setPermissions] = useState('');


    return (
        <div className="flex flex-col items-center ml-10">
            <Avatar
                className="w-56 h-56 mt-10"
                isBordered
                color="danger"
                src="https://i.pravatar.cc/150?u=a042581"
            />
            <div className="flex flex-row items-center  mt-10 space-x-5 mb-10">
                <div className="flex-col space-y-5 w-64 h-64 mb-20">
                    <Input
                        label='Username'
                        labelPlacement='outside'
                        placeholder='Enter username'
                        isRequired={true}
                        value={username}
                        autoComplete='username'
                        onValueChange={(value) => setUsername(value)}
                    />
                    <Input
                        label='Full name'
                        labelPlacement='outside'
                        placeholder='Full name'
                        isRequired={true}
                        value={email}
                        autoComplete='fullname'
                        onValueChange={(value) => setFullname(value)}
                    />
                    <Input
                        label='Password'
                        labelPlacement='outside'
                        placeholder='Password'
                        isRequired={true}
                        value={email}
                        autoComplete='password'
                        onValueChange={(value) => setPassword(value)}
                    />
                     <Input
                        label='Email'
                        labelPlacement='outside'
                        placeholder='Enter email'
                        isRequired={true}
                        value={email}
                        autoComplete='email'
                        onValueChange={(value) => setEmail(value)}
                    />
                </div>
                <div className="flex-col space-y-5 w-64 h-64 mb-20">

                    <Input
                        label='Role'
                        labelPlacement='outside'
                        placeholder='Role'
                        isRequired={true}
                        value={username}
                        autoComplete='role'
                        onValueChange={(value) => setRole(value)}
                    />
                    <Input
                        label='Designation'
                        labelPlacement='outside'
                        placeholder='Designation'
                        isRequired={true}
                        value={email}
                        autoComplete='designation'
                        onValueChange={(value) => setDesignation(value)}
                    />
                    <Input
                        label='Division'
                        labelPlacement='outside'
                        placeholder='Division'
                        isRequired={true}
                        value={email}
                        autoComplete='division'
                        onValueChange={(value) => setDivision(value)}
                    />
                    <Input
                        label='Permissions'
                        labelPlacement='outside'
                        placeholder='Permissions'
                        isRequired={true}
                        value={email}
                        autoComplete='permissions'
                        onValueChange={(value) => setPermissions(value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProfileComponent;
