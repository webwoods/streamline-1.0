import client from "@/gql/client";
import { USER_BY_USERNAME_OR_EMAIL_QUERY } from "@/gql/query";
import { useLazyQuery } from "@apollo/client";
import { Input } from "@nextui-org/react";
import { useRef, useState, useEffect } from "react";

interface SearchUserInputProps {
  formInputStyles: any;
  onDataSubmit: (isValid: boolean) => void;
};

export default function SearchUserInput({ formInputStyles, onDataSubmit }: SearchUserInputProps) {
  const requestedUserNameRef = useRef<HTMLInputElement>(null);
  const [isUserValid, setIsUserValid] = useState<boolean>(true);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const [
    getUserByUsernameOrEmail,
    { loading, error, data }
  ] = useLazyQuery(USER_BY_USERNAME_OR_EMAIL_QUERY, { client });

  useEffect(() => {
    if (error) {
      setIsUserValid(false);
    } else if (data?.getUserByUsernameOrEmail) {
      setIsUserValid(true);
    }
  }, [data, error]);

  const handleBlur = () => {
    const username = requestedUserNameRef.current?.value;
    if (username) {
      // Clear any existing timer before setting a new one
      if (timer !== null) {
        clearTimeout(timer);
      }

      const newTimer = setTimeout(() => {
        getUserByUsernameOrEmail({ variables: { username } });
      }, 2000);

      setTimer(newTimer);
    }
  };

  const handleChange = () => {
    setIsUserValid(true);
  };

  useEffect(() => {
    // Cleanup the timer on component unmount or when the input changes
    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  useEffect(() => {
    onDataSubmit(isUserValid);
  }, [isUserValid]);

  return (
    <Input
      ref={requestedUserNameRef}
      label="Requested by"
      labelPlacement="outside"
      placeholder="Enter Username"
      radius="none"
      classNames={{ ...formInputStyles }}
      // color={isUserValid ? "success" : "default"}
      isInvalid={!isUserValid}
      errorMessage={!isUserValid ? "Invalid username!" : ""}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
}