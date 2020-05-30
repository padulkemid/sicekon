<h1 align="center">👨🏼‍⚕️ Si Cekon Server ⭐️</h1>

## Temporary Queries ( Mutation and Query )

`tldr` , please read

  - Please do `npm install` after clone
  - To run do `npm run start` and to test do `npm run test`
  - Currently tests is only for truthy data yet, error tests is on the way
  - To run test properly, edit `server/setupTests_template.js` to be the same as
    your `.env`, and **DON'T FORGET TO CHANGE IT INTO** `setupTests.js`
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
  - Users are optional, but feature is added ( because symptom is emergency
      hence it don't need any user at all ), but it is added to preserve
      historical conditions about your symptoms before

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

### Register new user
mutation register($input: UserRegister!) {
  register(input: $input) {
    result
  }
}

### Login user
mutation login($input: UserLogin!) {
  login(input: $input) {
    username
    email
    sex
    age
    result
  }
}

### Logout user
mutation logout {
  logout {
    result
  }
}

### Get historical conditions for respected / logged in user
### Warning: NEED TO LOGIN ###
query getHistory {
  getHistory {
    email
    conditions
    date
  }
}

### Create new history of conditions in database
### Warning: NEED TO LOGIN ###
mutation createHistory($input: NewHistory!) {
  createHistory(input: $input) {
    email
    conditions
    date
  }
}

```

