import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'https://sicekon.herokuapp.com/',
    onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors)
        console.log('networkError', networkError)
    },
    clientState: {
        resolvers: {
            Mutation: {
                setUserData: (_, variables, client) => {
                    const { userData } = variables;
                    localStorage.setItem('userData', JSON.stringify(userData));
                    client.cache.writeData({
                        data: {
                            userData
                        }
                    })
                },
            }
        },
        defaults: {
            userData: {},
        }
    }
});

export default client