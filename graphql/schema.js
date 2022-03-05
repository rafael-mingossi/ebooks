import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    userId: String
    firstName: String
    lastName: String
    phoneNo: Int
    email: String
    password: String
  }

  type Query {
    users: [User]!
  }
`;
