'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '@/public/nifs_logo.png'
import { BiUser, BiLogIn } from "react-icons/bi";
import { useRouter } from 'next/navigation';
import { Button, Tooltip } from '@nextui-org/react';
import { parseCookies } from 'nookies';

type CurrentUser = {
  email?: string,
  id?: string,
  name?: string,
  role?: string,
  username?: string
}

export function UserProfileButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | string>("Log in");

  const toggleExpand = () => { setIsExpanded(!isExpanded); };
  const buttonTextStyle = 'bg-transparent hover:bg-slate-100 font-semibold';
  const router = useRouter();

  const handleLogin = () => {
    // console.log("log in clicked!");
    router.push('/auth/login')
  };

  const handleProfile = () => {
    // console.log("profile clicked!!");
    router.push('/profile')
  }

  useEffect(() => {
    const cookies = parseCookies();
    const loggedInUser: CurrentUser | string = cookies['currentUser'] ? JSON.parse(cookies['currentUser']) : 'Log in';
    loggedInUser && setCurrentUser(loggedInUser);
  }, [])

  // useEffect(() => {
  //   console.log(currentUser);
  // }, [currentUser])

  return (
    <Tooltip content="click the profile photo to expand/collapse">
      <div className="hidden sm:flex items-center bg-gradient-to-r from-white to-cyan-50 dark:bg-zinc-900 rounded-full gap-3 h-14 pl-3 pr-0 sm:pr-3 drop-shadow-md">

        {/* avatar button */}
        <Button
          radius="full"
          className='p-0 rounded-full overflow-hidden hidden sm:block'
          onClick={() => toggleExpand()}
          isIconOnly
        >
          <Image width={40} height={40} src='/avatar-image.png' alt='Avatar' />
        </Button>
        <div className="items-center gap-4 hidden sm:flex">

          {/* collapsed view */}
          {!isExpanded && (
            <>
              <Button
                radius="full"
                className={buttonTextStyle}
                onClick={typeof currentUser === 'string' ? handleLogin : handleProfile}
              >{typeof currentUser === 'string' ? currentUser : currentUser.name}</Button>
              <Image src={logo} alt='logo' width={60} height={60} />
            </>
          )}

          {/* expanded view */}
          {isExpanded && (
            <div className="flex pr-2 sm:pr-0 sm:gap-1 items-center min-w-fit">
              <Button
                radius="full"
                className={buttonTextStyle}
                startContent={<BiUser size={20} />}
                onClick={handleProfile}
              >Profile</Button>
              <Button
                radius="full"
                className={buttonTextStyle}
                startContent={<BiLogIn size={20} />}
                onClick={handleLogin}
              >
                {typeof currentUser === 'string' ? 'Log in' : 'Log out'}
              </Button>
            </div>
          )}

        </div>
      </div>
    </Tooltip>
  );
};

export default UserProfileButton;
