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

export { checkInfo };

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

export { diagnoseSymptoms };
