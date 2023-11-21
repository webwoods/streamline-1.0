import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
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

export const REGISTER_NEW_USER = gql`
  mutation RegisterNewUser($email: String!, $password: String!) {
    registerNewUser(input: { email: $email, password: $password }) {
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
        verificationToken
      }
      ... on UserAlreadyExistsError {
        message
      }
      ... on PasswordMismatchError {
        message
      }
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($username: String, $email: String, $token: String!) {
    verifyUser(
      input: { username: $username, email: $email, verificationToken: $token }
    ) {
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
          username
          verified
        }
      }
    }
  }
`;
