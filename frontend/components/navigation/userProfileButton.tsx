'use client'
import React, { useState } from 'react';
import avatarImage from '@/public/OIP.jpeg';
import Image from 'next/image';
import logo from '@/public/nifs_logo.png'
import { BiUser, BiLogIn } from "react-icons/bi";

const UserProfileButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="hidden sm:flex bg-white rounded-full gap-3 h-10 pl-3 pr-0 sm:pr-3">
      <button onClick={() => toggleExpand()}>
        <div className='rounded-full overflow-hidden hidden sm:block'>
          <Image width={25} src={avatarImage} alt='Avatar' />
        </div>
      </button>
      <div className="items-center gap-4 hidden sm:flex">
        {!isExpanded && (
          <>
            <div className="flex-col items-start justify-center hidden sm:block">
              <p className="font-semibold">Dammika Rathnasri</p>
            </div>
            <div>
              <Image src={logo} alt='logo' width={60} />
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
              <button className="hidden sm:block">Log out</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileButton;
