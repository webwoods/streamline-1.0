'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LOGIN } from "@/gql/mutation";
import { useMutation } from '@apollo/client';
import authClient from '@/gql/client';
import { setCookie } from 'nookies';
import { Button, Input, Spinner } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faL } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

function LoginComponent() {
  const [loginMutation, { loading, error, data }] = useMutation(LOGIN, { client: authClient });

  const [isVisible, setIsVisible] = React.useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (username: string, password: string) => {
    try {
      if (!username) {
        setIsEmailInvalid(true);
        return;
      }

      if (!password) {
        setIsPasswordInvalid(true);
        return;
      }

      const response = await loginMutation({
        variables: {
          username: username,
          password: password,
        },
      });

      const token = response?.data?.login?.accessToken;

      if (token) {
        setCookie(null, "accessToken", token, { path: "/" });
      } else {
        setLoginSuccess(false);
        return;
      }

      setLoginSuccess(true);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    const redirectToDashboard = async () => {
      if (loginSuccess) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        router.push('/dashboard');
      }
    };

    redirectToDashboard();
  }, [loginSuccess, router]);

  return (
    <div className='h-screen bg-[#197dfd] flex flex-col gap-5 justify-center items-center'>
      <div className='bg-white px-5 py-10 rounded-xl'>
        <div className='flex flex-col justify-center items-center mb-5'>
          <Image
            src="/nifs_logo.png"
            alt="Company Logo"
            width={150}
            height={150}
          />
          {!loginSuccess && (
            <>
              <h2 className='mt-5 text-2xl font-semibold'>Welcome back!</h2>
              <p className='text-sm text-gray-400 font-normal'>
                Not a member? <a href="#" className='text-[#197dfd] font-medium'>Create your account now!</a>
              </p>
            </>
          )}
        </div>
        {!loginSuccess ? (
          <>
            <form className='flex flex-col gap-3'>
              <Input
                label='Username'
                labelPlacement='outside'
                placeholder='Enter your email or username'
                isRequired={true}
                value={username}
                onValueChange={(value: string) => {
                  setIsEmailInvalid(false);
                  setUsername(value);
                }}
                isInvalid={isEmailInvalid}
                errorMessage={isEmailInvalid ? "Please enter a valid email" : ''}
              />
              <Input
                label='Password'
                labelPlacement='outside'
                placeholder='Enter your password'
                isRequired={true}
                value={password}
                onValueChange={(value: string) => {
                  setIsPasswordInvalid(false);
                  setPassword(value);
                }}
                isInvalid={isPasswordInvalid}
                errorMessage={isPasswordInvalid ? "Please enter the correct password" : ''}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
            </form>
            <Button
              className='w-full bg-ctertiary text-white text-md mt-5 hover:bg-accent-yellow hover:text-cprimary'
              onClick={() => handleLogin(username, password)}
            >
              Sign in
            </Button>
          </>
        ) :
          <div className='align-center flex flex-col justify-center gap-5'>
            <p className='text-xs'>You will be redirected to the dashboard shortly...</p>
            <Spinner color='primary' />
          </div>}
      </div>
      <p className='text-center text-white text-sm'>
        Powered by <span>StreamLine</span>
      </p>
    </div>
  );
}

export default LoginComponent;
