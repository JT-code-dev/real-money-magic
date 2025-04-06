import { gql } from "@apollo/client";

export const QUERY_GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      message
      success
      user {
        _id
        name
        email
      }
    }
  }
`;

export const QUERY_ALL_USERS = gql`
  query allUsers {
    users {
      _id
      name
      email
    }
  }
`;

export const QUERY_HELLO = gql`
  query hello {
    hello
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    me {
      id
      name
      email
    }
  }
`;

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id
      date
      type
      category
      amount
    }
  }
`;
