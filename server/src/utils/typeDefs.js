import { gql } from 'apollo-server';

const typeDefs = gql`
  ### Query types
  type Info {
    updated_at: String!
    conditions_count: Int!
    symptoms_count: Int!
  }

  type DiagnosisResultItemChoices {
    id: String
    label: String
  }

  type DiagnosisResultItems {
    id: ID
    name: String
    choices: [DiagnosisResultItemChoices]
  }

  type DiagnosisResultQuestion {
    type: String
    text: String
    items: [DiagnosisResultItems]
  }

  type DiagnosisResultConditions {
    id: ID
    name: String
    common_name: String
    probability: Float
  }

  type DiagnosisResult {
    question: DiagnosisResultQuestion
    conditions: [DiagnosisResultConditions]
    should_stop: Boolean
  }

  type ChatResponseMentions {
    id: ID
    name: String
    common_name: String
    orth: String
    type: String
    choice_id: String
  }

  type ChatResponse {
    mentions: [ChatResponseMentions]
    obvious: Boolean
  }

  ### Mutation inputs
  input Evidence {
    id: ID!
    choice_id: String!
    initial: Boolean
  }

  input DiagnosisExtras {
    disable_groups: Boolean!
  }

  input Diagnosis {
    sex: String!
    age: Int!
    evidence: [Evidence!]!
    extras: DiagnosisExtras!
  }

  input ChatComplaint {
    text: String!
    context: [String]
  }

  ### Generic returns
  type GenericResult {
    result: String!
  }

  ### Invocations
  type Query {
    checkInfo: Info!
  }

  type Mutation {
    diagnoseSymptoms(diagnosis: Diagnosis!): DiagnosisResult!
    chatFinalResponse(complaint: ChatComplaint!): ChatResponse!
  }
`;

export default typeDefs;
