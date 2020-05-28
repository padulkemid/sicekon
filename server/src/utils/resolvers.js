import fetch from 'node-fetch';

const baseUrl = 'https://api.infermedica.com/v2/info';
const resolvers = {
  Query: {
    async authUser() {
      const getInfo = await fetch(baseUrl, {
        method: 'get',
        headers: {
          'App-Id': 'eca17a2f',
          'App-Key': 'c7305e1cceeb5d4092dd524ae694c0b8',
        },
      });
      const data = await getInfo.json();
      console.log(data);

      return {
        result: 'Data successfuly retrieved!',
      };
    },
  },
};

export default resolvers;
