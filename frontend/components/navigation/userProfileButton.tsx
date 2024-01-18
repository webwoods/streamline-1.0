'use client'
import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import logo from '@/public/nifs_logo.png'
import { BiUser, BiLogIn } from "react-icons/bi";
import { useRouter } from 'next/navigation';
import { Button, Tooltip } from '@nextui-org/react';

export function UserProfileButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentUser, setCurrentUser] = useState("Log in");

  const toggleExpand = () => { setIsExpanded(!isExpanded); };

  const router = useRouter();

  const handleLogin = () => {
    console.log("log in clicked!");
  };

  return (
    <Tooltip content="click the profile photo to expand/collapse">
      <div className="hidden sm:flex bg-gradient-to-r from-white to-cyan-50 dark:bg-zinc-900 rounded-full gap-3 h-14 pl-3 pr-0 sm:pr-3 drop-shadow-md">
        <button onClick={() => toggleExpand()}>
          <div className='rounded-full overflow-hidden hidden sm:block'>
            <Image width={40} height={40} src='/avatar-image.png' alt='Avatar' />
          </div>
        </button>
        <div className="items-center gap-4 hidden sm:flex">
          {!isExpanded && (
            <>
              <div className="flex-col items-start justify-center hidden sm:block">
                {/* <p className="font-semibold">{currentUser}</p> */}
                <Button onClick={handleLogin}>{currentUser}</Button>
              </div>
              <div>
                <Image src={logo} alt='logo' width={60} height={60} />
              </div>
            </>
          )}
          {isExpanded && (
            <div className="flex pr-2 sm:pr-0 sm:gap-1 items-center min-w-fit">
              <div className='flex items-center gap-0 sm:gap-1 hover:bg-slate-200 rounded-full px-1 sm:px-2'>
                <BiUser size={20} />
                <button className="hidden sm:block">Profile</button>
              </div>
              <div className='flex items-center gap-0 sm:gap-1 hover:bg-slate-200 rounded-full px-1 sm:px-2'>
                <BiLogIn size={20} />
                <button className="hidden sm:block" onClick={() => router.push('/auth/login')}>Log out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Tooltip>
  );
};

export default UserProfileButton;
