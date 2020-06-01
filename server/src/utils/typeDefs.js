import { gql } from 'apollo-server';

const typeDefs = gql`
  ### Query types
  ### API
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

  type ConditionExtras {
    hint: String
  }

  type ConditionCheck {
    id: ID!
    name: String!
    common_name: String!
    categories: [String]
    prevalence: String
    acuteness: String
    severity: String!
    extras: ConditionExtras
  }

  type TriageSeriousConditions {
    id: ID!
    name: String!
    common_name: String!
    is_emergency: Boolean!
  }

  type TriageResult {
    triage_level: String
    serious: [TriageSeriousConditions]
  }

  type SearchResult {
    id: String!
    label: String!
  }
  ### END API

  ### Query inputs
  ### API

  input SearchParams {
    phrase: String!
    sex: String!
    age: Int!
    max_results: Int!
    type: String!
  }

  ### Mutation inputs
  ### API
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
  ### END API

  ### USER
  input UserRegister {
    sex: String!
    age: Int!
    username: String!
    email: String!
    password: String!
  }

  input UserLogin {
    email: String!
    password: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    sex: String!
    age: Int!
  }

  type UserLoginReturn {
    username: String
    email: String
    sex: String
    age: Int
    result: String!
  }

  ### END USER

  ### History
  type History {
    email: String
    conditions: [String]
    date: String
  }

  input NewHistory {
    conditions: [String!]!
    date: String!
  }

  ### END History

  ### Generic returns
  type GenericResult {
    result: String!
  }

  ### Invocations
  type Query {
    ### API Queries
    checkInfo: Info!
    checkCondition(id: ID!): ConditionCheck!
    searchObservations(params: SearchParams!): [SearchResult!]!

    ### History Queries
    getHistory: [History]
  }

  type Mutation {
    ### API Mutations
    diagnoseSymptoms(diagnosis: Diagnosis!): DiagnosisResult!
    checkTriage(diagnosis: Diagnosis!): TriageResult!
    chatFinalResponse(complaint: ChatComplaint!): ChatResponse!

    ### User Mutations
    register(input: UserRegister!): GenericResult!
    login(input: UserLogin!): UserLoginReturn!
    logout: GenericResult!

    ### History Mutations
    createHistory(input: NewHistory!): History!
  }
`;

export default typeDefs;
