'use client'

// Import necessary libraries and modules
import React, { createRef, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { VERIFY_USER } from "@/gql/mutation";
import { useMutation } from '@apollo/client';
import authClient from '@/gql/client';
import { parseCookies, setCookie } from 'nookies';
import { Button, Input, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

// Functional component for the verify form
function VerifyUserForm() {
  // Use Apollo Client's useMutation hook for the verify mutation
  const [verifyMutation] = useMutation(VERIFY_USER, { client: authClient });

  // State variables to manage form input, visibility
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  // Next.js router instance for navigation
  const router = useRouter();

  // Function to handle the verify process
  const handleVerify = async () => {
    try {
      // Perform the verification mutation
      const response = await verifyMutation({
        variables: {
          email: email,
          token: code,
        },
      });

      if (response) {
        setVerifySuccess(true);
      } else {
        throw new Error("Failed to verify user");
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const handleInputChange = (value: string) => {
    // Check if the input is a single-digit number
    if (!isNaN(Number(value))) {
      setCode(value);
    }
    // Ignore any other characters
  };

  // Effect hook to redirect to the login interface after a successful verification
  useEffect(() => {
    const redirectToDashboard = async () => {
      if (verifySuccess) {
        // Delay the redirection for a better user experience
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.push('/auth/login');
      }
    };

    redirectToDashboard();
  }, [verifySuccess, router]);

  useEffect(() => {
    const cookies = parseCookies();
    const currentUserEmail = cookies.currentUserEmail;

    // Use current user email as needed
    setEmail(currentUserEmail);
  }, []);

  // Render the verify form component
  return (
    <div className='h-screen bg-[#197dfd] flex flex-col gap-5 justify-center items-center'>
      <div className='w-[20rem] sm:w-[25rem] bg-white px-5 py-10 rounded-xl'>
        <div className='flex flex-col justify-center items-center mb-10'>
          {/* Company logo */}
          <Image
            src="/nifs_logo.png"
            alt="Company Logo"
            width={150}
            height={150}
          />
          {/* Display welcome message if not a successful verify */}
          {!verifySuccess && (
            <>
              <h2 className='mt-5 text-2xl font-semibold'>Enter Verification Code</h2>
              <p className='text-sm text-gray-400 font-normal text-center'>
                Check you email for a <span className='text-sm font-semibold text-[#197dfd]'>6 digit</span> verification code. The email may take a few minutes to send.
              </p>
            </>
          )}
        </div>
        {/* Display verify form or loading spinner based on verify success */}
        {!verifySuccess ? (
          <>
            <form className='flex flex-col gap-3 justify-center items-center'>
              <input
                className='w-full bg-slate-100 text-center text-2xl py-3 rounded-xl border-2 border-solid border-transparent focus:border-[#197dfd] outline-none tracking-widest'
                placeholder='XXXXXX'
                value={code}
                onChange={(e) => handleInputChange(e.target.value)}
                maxLength={6}
              />
            </form>
            {/* Verify button */}
            <Button
              className='w-full bg-ctertiary text-white text-md mt-10 hover:bg-accent-yellow hover:text-cprimary'
              onClick={() => handleVerify()}
            >
              Verify
            </Button>
          </>
        ) :
          <div className='align-center flex flex-col justify-center gap-5'>
            {/* Loading spinner and redirection message */}
            <p className='text-xs text-center'>You will be redirected to the login shortly...</p>
            <Spinner color='primary' />
          </div>}
      </div>
      {/* Powered by StreamLine message */}
      <p className='text-center text-white text-sm'>
        Powered by <span>StreamLine</span>
      </p>
    </div>
  );
}

// Export the VerifyUserForm component as the default export
export default VerifyUserForm;
