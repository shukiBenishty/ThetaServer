const { gql } = require('apollo-server');
export let typeDefs = gql`

  interface INode  {
    id: ID!
  }

  type Employee implements INode {
    id: ID!

    name: String!
  }

  type Query {
    employees: [Employee]
  }

`;
