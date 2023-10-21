import { gql } from '@apollo/client/core';

export const requestItems = gql`
  {
    requestItems(page: 1, pageSize: 10) {
      data {
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
            updatedAt
            username
            verificationCodes {
              code
              createdAt
              id
              updatedAt
            }
            verified
          }
          status
          updatedAt
        }
        sku
        updatedAt
      }
      totalPages
    }
  }
`;
