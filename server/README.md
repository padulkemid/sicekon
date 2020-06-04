<div align="center">
  <img src="https://i.imgur.com/tLp3L3c.png">
</div>

<h1 align="center">👨🏼‍⚕️ Si Cekon Server ⭐️</h1>

## Contributing 🍥

  - Please do `npm install` after clone 👥
  - To run do `npm run start` and to test do `npm run test` 🏃🏽‍♂️
  - To run test properly, edit `./setupTests_template.js` to be the same as
    your `.env`, and **DON'T FORGET TO CHANGE IT INTO** `setupTests.js` 👓
  - Have fun ! 🤩

## Queries and Mutations ⚡️

```graphql
### Check api key and api id
query checkInfo {
  checkInfo {
    updated_at
    conditions_count
    symptoms_count
  }
}
```

```graphql
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

```

```json
{
	"id": "c_563"
}

```

```graphql
query searchObservations($params: SearchParams!) {
  searchObservations(params: $params) {
    id
    label
  }
}
```

```json
{
  "params": {
    "phrase": "headache",
    "sex": "male",
    "age": 20,
    "max_results": 10,
    "type": "symptom"
  }
}
```

```graphql
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

```

```json
{
	"diagnosis": {
		"sex": "male",
		"age": 20,
		"evidence": [
			{
				"id": "s_1193",
				"choice_id": "present",
				"initial": true
			},
			{
				"id": "s_488",
				"choice_id": "present"
			},
			{
				"id": "s_418",
				"choice_id": "present"
			},
			{
				"id": "s_98",
				"choice_id": "present"
			},
			{
				"id": "s_100",
				"choice_id": "absent"
			},
			{
				"id": "s_1535",
				"choice_id": "unknown"
			},
			{
				"id": "s_25",
				"choice_id": "present"
			}
		],
		"extras": {
			"disable_groups": true
		}
	}
}

```

```graphql
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

```json
{
	"complaint": {
		"text": "my stomach hurts"
	}
}

```

```graphql
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

```json
{
	"diagnosis": {
		"sex": "male",
		"age": 20,
		"evidence": [
			{
				"id": "s_1193",
				"choice_id": "present",
				"initial": true
			},
			{
				"id": "s_488",
				"choice_id": "present"
			},
			{
				"id": "s_418",
				"choice_id": "present"
			},
			{
				"id": "s_98",
				"choice_id": "present"
			},
			{
				"id": "s_100",
				"choice_id": "absent"
			},
			{
				"id": "s_1535",
				"choice_id": "unknown"
			},
			{
				"id": "s_25",
				"choice_id": "present"
			}
		],
		"extras": {
			"disable_groups": true
		}
	}
}

```

```graphql
### Register new user
mutation register($input: UserRegister!) {
  register(input: $input) {
    result
  }
}

```

```json
{
	"input": {
		"sex": "female",
		"age": 16,
		"username": "sudarmi",
		"email": "aku_sudarmi29@rocketmail.com",
		"password": "123456"
	}
}

```

```graphql
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

```

```json
{
	"input": {
		"email": "aku_sudarmi29@gmail.com",
		"password": "123456"
	}
}

```

```graphql
### Logout user
mutation logout {
  logout {
    result
  }
}

```

```graphql
### Get historical conditions for respected / logged in user
### Warning: NEED TO LOGIN ###
query getHistory {
  getHistory {
    email
    conditions
    date
  }
}

```

```graphql
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

```json
{
	"input": {
		"conditions": [
			"c_671",
			"c_55"
		],
		"date": "2020-05-30T17:43:18.793Z"
	}
}

```

