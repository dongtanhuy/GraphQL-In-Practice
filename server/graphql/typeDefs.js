import { gql } from 'apollo-server';

const typeDefs = gql`
  type Author {
    id: ID!,
    name: String!,
    yearOfBirth: Int!,
    gender: Boolean,
  }
  type Query {
    authors: [Author]
    author(id: String): Author
  }
  type Mutation {
    createAuthor(
      name: String!,
      yearOfBirth: Int!,
      gender: Boolean,
    ): Author
    updateAuthor(
      id: String!
      newName: String!
      newYearOfBirth: Int!
      newGender: Boolean
    ): Author
    deleteAuthor(
      id: String!
    ): String
  }
  type Subscription {
    authorCreated: Author
    authorUpdated: Author
  }
`;

export default typeDefs;
