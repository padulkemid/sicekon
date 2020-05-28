import { gql } from 'apollo-server';

const typeDefs = gql`
    type User {
        sex: String
        age: Int
        evidence: [String]
    }

    type StringResult {
        result: String!
    }

    type Query {
        authUser: StringResult
    }
`;

export default typeDefs;
