// API

const diagnoseSymptoms = `
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
`;

const checkTriage = `
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
`;

const chatFinalResponse = `
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
`;

export { diagnoseSymptoms, checkTriage, chatFinalResponse };

// User

const register = `
  mutation register($input: UserRegister!) {
    register(input: $input) {
      result
    }
  }
`;

const login = `
  mutation login($input: UserLogin!) {
    login(input: $input) {
      username
      email
      sex
      age
      result
    }
  }
`;

const logout = `
  mutation logout {
    logout {
      result
    }
  }
`;

export { register, login, logout };

// User History

const createHistory = `
  mutation createHistory($input: NewHistory!) {
    createHistory(input: $input) {
      email
      conditions
      date
    }
  }
`;

export { createHistory };
