import { gql } from "@apollo/client/core";

export const USER_QUERY = gql`
query user($id: String!) {
  user(id: $id) {
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
`;