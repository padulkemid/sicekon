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
