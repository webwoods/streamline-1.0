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
