import client from "@/gql/client";
import { USER_BY_USERNAME_OR_EMAIL_QUERY } from "@/gql/query";
import { useLazyQuery } from "@apollo/client";
import { Input, Spinner } from "@nextui-org/react";
import { useRef, useState, useEffect } from "react";

interface SearchUserInputProps {
  savedData?: any
  formInputStyles: any;
  onUserNameChange?: (user: any | null) => void;
};

export default function SearchUserInput({ savedData, formInputStyles, onUserNameChange }: SearchUserInputProps) {
  const requestedUserNameRef = useRef<HTMLInputElement>(null);
  const [isUserValid, setIsUserValid] = useState<boolean>(true);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const [
    getUserByUsernameOrEmail,
    { loading, error, data }
  ] = useLazyQuery(USER_BY_USERNAME_OR_EMAIL_QUERY, { client });

  const handleBlur = () => {
    // this function is triggered whenever the user stops typing
    const username = requestedUserNameRef.current?.value;
    if (username) {
      // Clear any existing timer before setting a new one
      if (timer !== null) {
        clearTimeout(timer);
      }

      const newTimer = setTimeout(() => {
        getUserByUsernameOrEmail({ variables: { username } });
      }, 1000);

      setTimer(newTimer);
    }
  };

  const handleChange = () => {
    setIsUserValid(true);
  };

  useEffect(() => {
    if (data) {
      setIsUserValid(true);
      onUserNameChange && onUserNameChange(data.userByUsernameOrEmail);

      // Update the input value with the user's name
      requestedUserNameRef.current && (requestedUserNameRef.current.value = data.userByUsernameOrEmail.name);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setIsUserValid(false);
    }
  }, [error]);

  useEffect(() => {
    // Cleanup the timer on component unmount or when the input changes
    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  useEffect(() => {
    requestedUserNameRef.current && (requestedUserNameRef.current.value = savedData?.name);
  }, [savedData]);

  return (
    <Input
      ref={requestedUserNameRef}
      label="Requested by"
      labelPlacement="outside"
      placeholder="Enter Username"
      radius="none"
      classNames={{ ...formInputStyles }}
      isInvalid={!isUserValid}
      errorMessage={!isUserValid ? "Invalid username!" : ""}
      onBlur={handleBlur}
      onChange={handleChange}
      isRequired
      startContent={loading && <Spinner size="sm" color="success" />}
    />
  );
}