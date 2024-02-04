import { gql } from "@apollo/client";

export const USER_QUERY = gql`
query User($id: String!) {
  user(id: $id) {
    id
    createdAt
    updatedAt
    username
    email
    password
    name
    role {
      id
      name
      division
    }
    verified
  }
}
`;

export const USER_BY_USERNAME_OR_EMAIL_QUERY = gql`
query UserByUsernameOrEmail($username: String, $email: String) {
  userByUsernameOrEmail(
    username: $username, 
    email: $email
  ) {
    id
    username
    email
    name
    role {
      name
      division
    }
    verified
  }
}
`;

export const REQUESTS_QUERY = gql`
query GetRequests($page: Int, $pageSize: Int){
  getRequestsWithUser(page: $page, pageSize: $pageSize) {
    data {
      id
      createdAt
      updatedAt
      requestType
      subject
      description
      file {
        id
        name
      }
      requestedUser {
        id
        name
        email
        role {
          name
          division
        }
      }
      requestedUserId
      requestItems {
        id
        qty
        storeItem {
          id
          name
          price
          properties {
            key
            value
          }
          sku
          stock
          unit
        }
      }
      status
    }
    totalItems
  }
}
`;

export const SEARCH_STORE_ITEMS = gql`
  query SearchStoreItems($page: Int, $pageSize: Int, $searchString: String!){
    searchStoreItems(page: $page, pageSize: $pageSize, searchString: $searchString) {
      data {
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
    }
  }
`;
