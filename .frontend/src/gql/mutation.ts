import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation Login(
    $username: String!
    $password: String!
    $rememberMe: Boolean!
  ) {
    login(username: $username, password: $password, rememberMe: $rememberMe) {
      ... on CurrentUser {
        id
      }
      __typename
    }
  }
`;
