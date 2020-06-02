import gql from "graphql-tag";

export const CHECK_API_INFO = gql`
query checkInfo {
  checkInfo {
    updated_at
    conditions_count
    symptoms_count
  }
}`;

export const CHECK_CONDITIONS = gql`
query checkCondition($id: ID!) {
  checkCondition(id: $id) {
    id
    name
    common_name
    categories
    prevalence
    acuteness
    severity
    extras {
      hint
    }
  }
}`;

export const SEARCH_OBSERVATIONS = gql`
query searchObservations($params: SearchParams!) {
  searchObservations(params: $params) {
    id
    label
  }
}`;

export const DIAGNOSE_SYMPTOMS = gql`
mutation diagnoseSymptoms($diagnosis: Diagnosis!) {
  diagnoseSymptoms(diagnosis: $diagnosis) {
    question {
      type
      text
      items {
        id
        name
        choices {
          id
          label
        }
      }
    }
    conditions {
      id
      name
      common_name
      probability
    }
    should_stop
  }
}`;

export const CHAT_FINAL_RESPONSE = gql`
mutation chatFinalResponse($complaint: ChatComplaint!) {
  chatFinalResponse(complaint: $complaint) {
    mentions {
      id
      name
      common_name
      orth
      type
      choice_id
    }
    obvious
  }
}`;

export const CHAT_TRIAGE = gql`
mutation checkTriage($diagnosis: Diagnosis!) {
  checkTriage(diagnosis: $diagnosis) {
    triage_level
    serious {
      id
      name
      common_name
      is_emergency
    }
  }
}`;