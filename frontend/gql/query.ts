import { gql } from "@apollo/client";

export const USERS_QUERY = gql`
  {
    users {
      email
      id
      name
      password
      username
    }
  }
`;

export const COMPANIES_QUERY = gql`
  {
    companies {
      companyName
      id
      stalls {
        floorPlanLocation
        id
        stallNumber
      }
      user {
        email
        id
        name
        password
        username
      }
    }
  }
`;

export const STUDENTS_QUERY = gql`
  {
    students {
      id
      interestedRooms {
        id
      }
      interviews {
        id
      }
      studentEmail
      studentId
      studentName
      user {
        email
        id
        name
        password
        username
      }
    }
  }
`;

export const SEARCH_REQUEST_ITEMS = gql`
  query SearchRequestItems($page: Int, $pageSize: Int, $searchString: String!){
    searchRequestItems(page: $page, pageSize: $pageSize, searchString: $searchString) {
      data {
        id
        name
        sku
        quantity
        type
        unit
        price
        properties {
          key
          value
        }
      }
    }
  }
`;
