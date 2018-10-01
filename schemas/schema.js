const { gql } = require('apollo-server');
export let typeDefs = gql`

  interface INode  {
    id: ID!
  }

  scalar Date

  type Schedule implements INode {
    id: ID!

    date: Date
    group: Group
    employee: Employee
  }

  type Group implements INode {
    id: ID!

    name: String
    symbol: String

  }

  type Employee implements INode {
    id: ID!

    name: String!
    phone: String
    role: String!
    groups: [Group]

  }

  type Query {
    employees: [Employee]
    schedules(groupSymbol: Int!): [Schedule]
  }

`;
