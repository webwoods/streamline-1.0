'use client'

// Import necessary libraries and modules
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LOGIN } from "@/gql/mutation";
import { useMutation } from '@apollo/client';
import client from '@/gql/client';
import { setCookie } from 'nookies';
import { Button, Checkbox, Input, Link, Spinner } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

// Functional component for the login form
function LoginForm() {
  // Use Apollo Client's useMutation hook for the login mutation
  const [loginMutation] = useMutation(LOGIN, { client: client });

  // State variables to manage form input, visibility, and login success
  const [isVisible, setIsVisible] = React.useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Next.js router instance for navigation
  const router = useRouter();

  // Function to toggle password visibility
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Function to handle the login process
  const handleLogin = async () => {
    try {
      // Validate username and password
      if (!username) {
        setIsEmailInvalid(true);
        return;
      }

      if (!password) {
        setIsPasswordInvalid(true);
        return;
      }

      // Store or remove the remembered username based on the "Remember Me" checkbox
      if (rememberMe) {
        localStorage.setItem('rememberedUsername', username);
      } else {
        localStorage.removeItem('rememberedUsername');
      }

      // Perform the login mutation
      const response = await loginMutation({
        variables: {
          username: username,
          password: password,
        },
      });

      // Extract and set the access token from the login response
      const responseData = response?.data?.login;
      const token = responseData?.accessToken;
      const currentUser = responseData?.me;

      if (token) {
        setCookie(null, "accessToken", token, { path: "/" });
        setCookie(null, "currentUser", JSON.stringify(currentUser), { path: "/" });
      } else {
        setLoginSuccess(false);
        return;
      }

      setLoginSuccess(true);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  // Function to handle changes in the "Remember Me" checkbox
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  // Effect hook to pre-fill the username field if it was remembered
  useEffect(() => {
    const storedUsername = localStorage.getItem('rememberedUsername');
    if (storedUsername) {
      setUsername(storedUsername);
      setRememberMe(true);
    }
  }, []);

  // Effect hook to redirect to the dashboard after a successful login
  useEffect(() => {
    const redirectToDashboard = async () => {
      if (loginSuccess) {
        // Delay the redirection for a better user experience
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.push('/dashboard');
      }
    };

    redirectToDashboard();
  }, [loginSuccess, router]);

  // Render the login form component
  return (
    <div className='h-screen bg-white flex flex-col gap-5 justify-center items-center'>
      <div className='w-[20rem] sm:w-[25rem] bg-white px-5 py-10 rounded-xl'>
        <div className='flex flex-col justify-center items-center mb-10'>
          {/* Company logo */}
          <Image
            src="/nifs_logo.png"
            alt="Company Logo"
            width={150}
            height={150}
          />
          {/* Display welcome message if not a successful login */}
          {!loginSuccess && (
            <>
              <h2 className='mt-5 text-2xl font-semibold'>Sign in</h2>
              <p className='text-sm text-gray-400 font-normal text-center'>
                Not a member? <Link href='/auth/signup' className='text-sm font-semibold text-[#197dfd]'>Create your account now!</Link>
              </p>
            </>
          )}
        </div>
        {/* Display login form or loading spinner based on login success */}
        {!loginSuccess ? (
          <>
            <form className='flex flex-col gap-3'>
              {/* Username input */}
              <Input
                label='Username'
                labelPlacement='outside'
                placeholder='Enter your email or username'
                isRequired={true}
                value={username}
                autoComplete='username' // Enable browser autocomplete for username
                onValueChange={(value: string) => {
                  setIsEmailInvalid(false);
                  setUsername(value);
                }}
                isInvalid={isEmailInvalid}
                errorMessage={isEmailInvalid ? "Please enter a valid email" : ''}
              />
              {/* Password input */}
              <Input
                label='Password'
                labelPlacement='outside'
                placeholder='Enter your password'
                isRequired={true}
                value={password}
                autoComplete='current-password' // Enable browser autocomplete for password
                onValueChange={(value: string) => {
                  setIsPasswordInvalid(false);
                  setPassword(value);
                }}
                isInvalid={isPasswordInvalid}
                errorMessage={isPasswordInvalid ? "Please enter the correct password" : ''}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {/* Toggle password visibility icon */}
                    {isVisible ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
              {/* Remember Me checkbox and Forgot Password link */}
              <div className='flex justify-between'>
                <div className='flex items-center'>
                  {/* Remember Me checkbox */}
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                  <label className='text-sm'>Remember me</label>
                </div>
                {/* Forgot Password link */}
                <Link href='#' className='text-sm text-[#197dfd]'>Forgot password?</Link>
              </div>
            </form>
            {/* Sign In button */}
            <Button
              className='w-full bg-ctertiary text-white text-md mt-10 hover:bg-accent-yellow hover:text-cprimary'
              onClick={() => handleLogin()}
            >
              Sign in
            </Button>
          </>
        ) :
          <div className='align-center flex flex-col justify-center gap-5'>
            {/* Loading spinner and redirection message */}
            <p className='text-xs text-center'>You will be redirected to the dashboard shortly...</p>
            <Spinner color='primary' />
          </div>}
      </div>
      {/* Powered by StreamLine message */}
      <p className='text-center text-[#197dfd] text-sm'>
        Powered by <span>StreamLine</span>
      </p>
    </div>
  );
}

// Export the LoginForm component as the default export
export default LoginForm;
