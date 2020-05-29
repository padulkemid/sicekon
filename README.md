<h1 align="center">👨🏼‍⚕️ Si Cekon Server ⭐️</h1>

## Temporary Queries ( Mutation and Query )

`tldr` , please read

  - All results is not filtered (full data from api, but extras is removed [cuz
      its meh 🙃])
  - Symptom diagnosis should be mutated after every iteriation with interview
    questions ~~until _should_stop: true_ ( for the best result, and maybe more accurate )~~

    **UPDATE**: temporarily gonna ask for about 3~5 questions then choose the best
    of 3 probability ( sorted and get the details about them )

    **UPDATE**: conditions met will be scanned and server will response with 
    `severity`, `prevalance`, and `hint`
  - Chat bot is only final response, so it'll check the `text` query
    for more further info you could go to the docs NLP
  - Triage level for emergency includes `emergency`, `consultation`, `self_care`
    3 of this will be explained later ( usability for client )

```graphql
### Check api key and api id
query checkInfo {
  checkInfo {
    updated_at
    conditions_count
    symptoms_count
  }
}

### Check conditions details
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

### Triage response after diagnosis
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
}
```

