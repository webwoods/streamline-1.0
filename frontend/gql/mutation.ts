import { gql } from "@apollo/client";

export const CREATE_REQUEST = gql`
  mutation CreateRequest(
    $description: String
    $fileId: String
    $requestedUserId: String!
    $requestType: RequestType!
    $status: RequestStatus!
    $subject: String!
  ) {
    createRequest(input: {
      description: $description
      fileId: $fileId
      requestedUserId: $requestedUserId
      requestType: $requestType
      status: $status
      subject: $subject
    }) {
      id
      createdAt
      updatedAt
      requestType
      description
      file {
        id
        name
      }
      requestedUser {
        id
        createdAt
        updatedAt
        username
        email
        name
        role {
          id
          name
          division
        } 
        verified
      }
      requestedUserId
      requestItems {
        id
        createdAt
        updatedAt
        storeItem {
          id
          createdAt
          updatedAt
          name
          sku
          stock
          type
          unit
          price
          properties {
            id
            key
            value
            type
          }
        } 
        qty
      }
      status
      subject
    }
  }
`;

// {
//   qty: Float
//   requestId: String!,
//   storeItemId: String!
// } 

// {
//   description: ""
//   fileId: ""
//   status: APPROVED
//   subject: ""
//   subtotal: 100
//   tax: 23
//   total: 100
// }

export const UPDATE_REQUEST = gql`
  mutation UpdateRequest($id: String!, $input: UpdateRequestInput!) {
    updateRequest(
      id: $id, 
      input: $input
    ) {
      id
      createdAt
      updatedAt
      requestType
      description
      file {
        id
        name
      }
      requestedUser {
        id
        createdAt
        updatedAt
        username
        email
        name
        role {
          id
          name
          division
        }
        verified
      }
      requestedUserId
      requestItems {
        id
        createdAt
        updatedAt
        storeItem {
          id
          name
          price
          properties {
            key
            value
            type
          }
          sku
          stock
          type
          unit
          updatedAt
        }
        qty
      }
      status
      subject
      subtotal
      tax
      total
    }
  }
`;

export const CREATE_REQUEST_ITEMS = gql`
  mutation CreateRequestItems($input: CreateRequestItemsInput!) {
    createRequestItems(input: $input) {
      id
      createdAt
      updatedAt
      storeItem {
        id
        createdAt
        updatedAt
        name
        sku
        stock
        type
        unit
        price
        properties {
          key
          value
          type
        }
      }
      qty
      requests {
        id
      }
    }
  }
`;

export const ADD_REQUEST_ITEMS_TO_REQUEST = gql`
  mutation AddRequestItemsToRequest(
    $requestId: String!, 
    $requestItemIds: [String!]!
  ) {
    addRequestItemsToRequest(
      requestId: $requestId, 
      requestItemIds: $requestItemIds
    ) {
      id
      requestedUserId
      requestItems {
        id
        storeItem {
          id
        }
      }
      status
    }
  }
`;

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
