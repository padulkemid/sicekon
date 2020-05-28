import { gql } from 'apollo-server';

const typeDefs = gql`
  ### Query types
  type Info {
    updated_at: String!
    conditions_count: Int!
    symptoms_count: Int!
  }

  ### Invocations
  type Query {
    checkInfo: Info!
  }
`;

export default typeDefs;
