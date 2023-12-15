// graphql.ts
import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      id
      createdAt
    updatedAt
    username
    email
    password
    name
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: ProfileInput!) {
    updateProfile(input: $input) {
      success
      message
    }
  }
`;
