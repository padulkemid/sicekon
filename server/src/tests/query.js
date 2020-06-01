// API

const checkInfo = `
  query checkInfo {
    checkInfo {
      updated_at
      conditions_count
      symptoms_count
    }
  }
`;

const checkCondition = `
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
`;

const searchObservations = `
  query searchObservations($params: SearchParams!) {
    searchObservations(params: $params) {
      id
      label
    }
  }
`;

export { checkInfo, checkCondition, searchObservations };

// User History

const getHistory = `
  query getHistory {
    getHistory {
      email
      conditions
      date
    }
  }
`;

export { getHistory };
