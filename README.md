<h1 align="center">👨🏼‍⚕️ Si Cekon Server ⭐️</h1>

## Temporary Queries ( Mutation and Query )

`tldr` , please read

  - All results is not filtered (full data from api, but extras is removed [cuz
      its meh 🙃])
  - Symptom diagnosis should be mutated after every iteriation with interview
    questions until `should_stop: true` ( for the best result, and maybe more accurate )
  - Chat bot is only final response, so it'll check the `text` query
    for more further info you could go to the docs NLP

```graphql
### Check api key and api id
query checkInfo {
  checkInfo {
    updated_at
    conditions_count
    symptoms_count
  }
}

### Symptom diagnosis
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
}

### Chat bot final response
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
}


```

