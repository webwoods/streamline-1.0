import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation Login($username: string, $password: string) {
    login(input: { password: $password, username: $username }) {
      __typename
      ... on LoginSuccess {
        accessToken
        me {
          email
          id
          name
          role {
            division
            id
            name
          }
          username
        }
      }
      ... on UserNotExistError {
        message
      }
      ... on PasswordMismatchError {
        message
      }
    }
  }
`;

const REGISTER_NEW_USER = gql`
  mutation RegisterNewUser(
    $email: string
    $username: string
    $password: string
  ) {
    registerNewUser(
      input: { email: $email, password: $password, username: $user }
    ) {
      __typename
      ... on RegisterNewUserSuccess {
        me {
          email
          id
          name
          role {
            division
            id
            name
          }
          username
        }
      }
      ... on UserNotExistError {
        message
      }
      ... on PasswordMismatchError {
        message
      }
    }
  }
`;

const VERIFY_USER = gql`
  mutation VerifyUser($username: string, $token: string) {
    verifyUser(input: { username: $string, verificationToken: $token }) {
      __typename
      ... on VerificationSuccess {
        me {
          email
          id
          name
          role {
            division
            id
            name
          }
          updatedAt
          username
          verificationCodes {
            code
            id
          }
          verified
        }
      }
    }
  }
`;
