import { gql } from '@apollo/client/core';

export const createRequestItem = gql`
  mutation CreateRequestItem(
    $requestId: string
    $sku: string
    $type: string
    $name: string
  ) {
    createRequestItem(
      input: { requestId: $requestId, sku: $sku, type: $type, name: $name }
    ) {
      __typename
      createdAt
      id
      name
      price
      properties {
        createdAt
        id
        key
        type
        updatedAt
        value
      }
      quantity
      requests {
        createdAt
        description
        file {
          createdAt
          id
          name
          updatedAt
        }
        id
        requestType
        requestedUser {
          createdAt
          email
          id
          name
          password
          role {
            createdAt
            division
            id
            name
            updatedAt
          }
          type
          verified
        }
        status
        updatedAt
      }
      sku
      updatedAt
    }
  }
`;
