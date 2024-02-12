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

export const COUNT_SUMMARY_STATS = gql`
query CountRequests(
  $page: Int!,
  $pageSize: Int!,
  $requestType: RequestType,
  $status: RequestStatus
) {
  countRequests(
    page: $page
    pageSize: $pageSize
    requestType: $requestType
    status: $status
  )
}`;

export const REQUESTS_QUERY = gql`
query GetRequests(
  $page: Int, 
  $pageSize: Int, 
  $requestType: RequestType,
  $status: RequestStatus,
  $updatedAt: DateTime,
){
  getRequestsWithUser(
    page: $page, 
    pageSize: $pageSize, 
    requestType: $requestType,
    status: $status,
    updatedAt: $updatedAt
  ) {
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
      forwardTo
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

export const REQUEST_QUERY = gql`
{
  requests(page: 1, pageSize: 10) {
    data {
      id
      createdAt
      requestType
      requestedUser{
        name
      }
      file{
        name
      }
      status
    }
    totalPages
  }
}
`;

export const NOTIFICATION_QUERY = gql`
query Notifications(
  $page: Int!, 
  $pageSize: Int!,
  $type: String,
  $recieverId: String,
) {
  notifications(
    page: $page, 
    pageSize: $pageSize,
    type: $type,
    recieverId: $recieverId,
) {
    data {
      id
      createdAt
      updatedAt
      deletedAt
      message
      senderId
      recievers{
        id
        isRead
        recieverId
      }
      type
    }
    totalItems
  }
}
`;

export const NOTIFICATIONS_WITH_USERS_QUERY = gql`
query GetNotificationsWithUser($page: Int!, $pageSize: Int!, $type: String){
  getNotificationsWithUser(page: $page, pageSize: $pageSize, type: $type) {
    data {
      id
      createdAt
      updatedAt
      deletedAt
      message
      senderId
      sender {
        id
        name
        email
        role {
          name
          division
        }
        username
        verified
      }
      recievers {
        id
      }
      type
    }
    totalItems
  }
}
`;

export const VENDORS_QUERY = gql`
query Vendors($page: Int!, $pageSize: Int!, $region: Region) {
  vendors(page: $page, pageSize: $pageSize, region: $region) {
    data {
      id
      createdAt
      updatedAt
      deletedAt
      name
      email
      phone
      group
      address {
        houseNumber
        addressLine1
        addressLine2
        city
        country
        state
        postalCode
      } 
      region
    }
    totalItems
  }
}
`;

export const VENDORS_STORE_ITEMS_QUERY = gql`
{
  vendors(page: 1, pageSize: 10) {
    data {
      id
      createdAt
      updatedAt
      deletedAt
      name
      email
      phone
      group
      address {
        houseNumber
        addressLine1
        addressLine2
        city
        country
        state
        postalCode
      } 
      region
      storeItems {
        id
        createdAt
        updatedAt
        deletedAt
        name
        sku
        stock
        type
        unit
        price
        properties {
          id
          createdAt
          updatedAt
          deletedAt
          key
          value
          type
        }
      } 
    }
    totalItems
  }
}
`;

export const STORE_ITEMS_QUERY = gql`
query StoreItems($page: Int!, $pageSize: Int!) {
  storeItems(page: $page, pageSize: $pageSize) {
    data {
      id
      createdAt
      updatedAt
      deletedAt
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
      vendors {
        id
        createdAt
        updatedAt
        deletedAt
        name
        email
        phone
        group
        address {
          houseNumber
          addressLine1
          addressLine2
          city
          country
          state
          postalCode
        }
        region
      } 
    }
    totalItems
  }
}
`;