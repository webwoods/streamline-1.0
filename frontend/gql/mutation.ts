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
}`;

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
}`;

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
}`;

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
}`;

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
}`;

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
}`;

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
}`;

export const REMOVE_REQUEST_ITEMS_FROM_REQUEST_MUTATION = gql`
mutation RemoveRequestItemsFromRequest(
  $requestId: String!
  $requestItemIds: [String!]!
) {
  removeRequestItemsFromRequest(
    requestId: $requestId
    requestItemIds: $requestItemIds
  ) {
    id
    createdAt
    updatedAt
    requestItems {
      id
    }
  }
}`;

export const DELETE_REQUEST_ITEMS_MUTATION = gql`
mutation DeleteRequestItems($ids: [String!]!) {
  deleteRequestItems(ids: $ids) {
    id
    createdAt
    updatedAt
  }
}`;

export const DELETE_REQUEST_MUTATION = gql`
mutation deleteRequest($id: String!) {
  deleteRequest(id: $id) {
    id
    createdAt
    updatedAt
  }
}`;

export const SOFT_DELETE_REQUEST_MUTATION = gql`
mutation softDeleteRequest($id: String!) {
  softDeleteRequest(id: $id) {
    id
    createdAt
    updatedAt
    deletedAt
  }
}`;

export const VERIFY_PASSWORD_MUTATION = gql`
mutation  VerifyPassword($password: String , $username: String) {
  verifyPassword(input: {
    password: $password,
    username: $username  
  }) 
}
`;

// export const CREATE_INVOICE = gql`
// mutation {
//   createInvoice(
//     # invoiceInput: {
//     #   requestId: "4a0aa05f-8a6a-4afd-9db8-e6d5b87c375c"
//     #   amount: 2000
//     #   isPaid: false
//     #   dueDate: "2024-02-10T00:00:00.000Z"
//     # }
//     # proformaInvoiceInput: {
//     #   requestId: "4a0aa05f-8a6a-4afd-9db8-e6d5b87c375c"
//     #   amount: 150
//     #   isPaid: false
//     #   dueDate: "2024-02-10T00:00:00.000Z"
//     #   validityPeriod: "quarterly"
//     # }
//     # reccuringInvoiceInput: {
//     #   requestId: "84dea6d0-b12f-4707-9b2f-b552249abaa0"
//     #   amount: 1000
//     #   isPaid: false
//     #   dueDate: "2024-01-10T00:00:00.000Z"
//     #   recurrencePattern: "monthly"
//     # }
//   ) {
//     __typename
//     ... on Invoice {
//       request {
//         id
//         createdAt
//         updatedAt
//         deletedAt
//         requestType
//         description
//         file {
//           id
//           createdAt
//           updatedAt
//           deletedAt
//           name
//         }
//         fileId
//         requestedUserId
//         requestItems {
//           id
//           createdAt
//           updatedAt
//           deletedAt
//           storeItem {
//             id
//             createdAt
//             updatedAt
//             deletedAt
//             name
//             sku
//             stock
//             type
//             unit
//             price
//             properties {
//               key
//               value
//               type
//             }
//           }
//           qty
//         }
//         status
//         subject
//         subtotal
//         tax
//         total
//         expectedAt
//         forwardTo
//         vendorId
//         invoices {
//           id
//           createdAt
//           updatedAt
//           deletedAt
//           dueDate
//           amount
//           isPaid
//           creditMemos {
//             id
//             createdAt
//             updatedAt
//             deletedAt
//             invoiceId
//             reason
//           }
//           debitMemos {
//             id
//             createdAt
//             updatedAt
//             deletedAt
//             invoiceId
//             reason
//           }
//           overdueMemos {
//             id
//             createdAt
//             updatedAt
//             deletedAt
//             invoiceId
//             lateFee
//           }
//           type
//         }
//       } 
//     }
//     ... on ProformaInvoice {
//       request {
//         id
//         createdAt
//         updatedAt
//         deletedAt
//         requestType
//         description
//         file {
//           id
//           createdAt
//           updatedAt
//           deletedAt
//           name
//         }
//         fileId
//         requestedUserId
//         requestItems {
//           id
//           createdAt
//           updatedAt
//           deletedAt
//           storeItem {
//             id
//             createdAt
//             updatedAt
//             deletedAt
//             name
//             sku
//             stock
//             type
//             unit
//             price
//             properties {
//               key
//               value
//               type
//             }
//           }
//           qty
//         }
//         status
//         subject
//         subtotal
//         tax
//         total
//         expectedAt
//         forwardTo
//         vendorId
//         invoices {
//           id
//           createdAt
//           updatedAt
//           deletedAt
//           dueDate
//           amount
//           isPaid
          
//           creditMemos {
//             id
//             createdAt
//             updatedAt
//             deletedAt
//             invoiceId
//             reason
//           }
//           debitMemos {
//             id
//             createdAt
//             updatedAt
//             deletedAt
//             invoiceId
//             reason
//           }
//           overdueMemos {
//             id
//             createdAt
//             updatedAt
//             deletedAt
//             invoiceId
//             lateFee
//           }
//           type
//         }
//       } 
//     }
//     ... on RecurringInvoice {
//       request {
//         id
//         createdAt
//         updatedAt
//         deletedAt
//         requestType
//         description
//         file {
//           id
//           createdAt
//           updatedAt
//           deletedAt
//           name
//         }
//         fileId
//         requestedUserId
//         requestItems {
//           id
//           createdAt
//           updatedAt
//           deletedAt
//           storeItem {
//             id
//             createdAt
//             updatedAt
//             deletedAt
//             name
//             sku
//             stock
//             type
//             unit
//             price
//             properties {
//               key
//               value
//               type
//             }
//           }
//           qty
//         }
//         status
//         subject
//         subtotal
//         tax
//         total
//         expectedAt
//         forwardTo
//         vendorId
//         invoices {
//           id
//           createdAt
//           updatedAt
//           deletedAt
//           dueDate
//           amount
//           isPaid
          
//           creditMemos {
//             id
//             createdAt
//             updatedAt
//             deletedAt
//             invoiceId
//             reason
//           }
//           debitMemos {
//             id
//             createdAt
//             updatedAt
//             deletedAt
//             invoiceId
//             reason
//           }
//           overdueMemos {
//             id
//             createdAt
//             updatedAt
//             deletedAt
//             invoiceId
//             lateFee
//           }
//           type
//         }
//       } 
//     }
//   }
// }`;