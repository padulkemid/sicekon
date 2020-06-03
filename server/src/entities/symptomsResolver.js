import fetch from 'node-fetch';

const baseUrl = 'https://api.infermedica.com/v2';

// Queries
const checkInfo = async () => {
  const getInfo = await fetch(`${baseUrl}/info`, {
    method: 'get',
    headers: {
      'App-Id': process.env.APP_ID,
      'App-key': process.env.APP_KEY,
    },
  });
  const data = await getInfo.json();
  const { updated_at, conditions_count, symptoms_count } = data;
  const struct = {
    updated_at,
    conditions_count,
    symptoms_count,
  };

  return struct;
};

const checkCondition = async (_, { id }) => {
  const getDetails = await fetch(`${baseUrl}/conditions/${id}`, {
    method: 'get',
    headers: {
      'App-Id': process.env.APP_ID,
      'App-key': process.env.APP_KEY,
    },
  });
  const response = await getDetails.json();
  const {
    name,
    common_name,
    categories,
    prevalence,
    acuteness,
    severity,
    extras,
  } = response;

  const struct = {
    id,
    name,
    common_name,
    categories,
    prevalence,
    acuteness,
    severity,
    extras,
  };

  return struct;
};

const searchObservations = async (_, { params }) => {
  const { phrase, sex, age, max_results, type } = params;
  const observeParams = await fetch(
    `${baseUrl}/search?phrase=${phrase}&sex=${sex}&age=${age}&max_results=${max_results}&type=${type}`,
    {
      method: 'get',
      headers: {
        'App-Id': process.env.APP_ID,
        'App-key': process.env.APP_KEY,
      },
    }
  );
  const response = await observeParams.json();

  return response;
};

export { checkInfo, checkCondition, searchObservations };

// Mutations
const diagnoseSymptoms = async (_, { diagnosis }) => {
  const diagnoseData = await fetch(`${baseUrl}/diagnosis`, {
    method: 'post',
    body: JSON.stringify(diagnosis),
    headers: {
      'App-Id': process.env.APP_ID,
      'App-key': process.env.APP_KEY,
      'Content-Type': 'application/json',
    },
  });

  const response = await diagnoseData.json();
  const { question, conditions, should_stop } = response;
  const struct = {
    question,
    conditions,
    should_stop,
  };

  return struct;
};

const chatFinalResponse = async (_, { complaint }) => {
  const getComplaint = await fetch(`${baseUrl}/parse`, {
    method: 'post',
    body: JSON.stringify(complaint),
    headers: {
      'App-Id': process.env.APP_ID,
      'App-key': process.env.APP_KEY,
      'Content-Type': 'application/json',
    },
  });
  const response = await getComplaint.json();
  const { mentions, obvious } = response;
  const struct = {
    mentions,
    obvious,
  };

  return struct;
};

const checkTriage = async (_, { diagnosis }) => {
  const triageData = await fetch(`${baseUrl}/triage`, {
    method: 'post',
    body: JSON.stringify(diagnosis),
    headers: {
      'App-Id': process.env.APP_ID,
      'App-key': process.env.APP_KEY,
      'Content-Type': 'application/json',
    },
  });

  const response = await triageData.json();
  const { triage_level, serious } = response;
  const struct = {
    triage_level,
    serious,
  };

  return struct;
};

export { diagnoseSymptoms, chatFinalResponse, checkTriage };
