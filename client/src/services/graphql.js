import ApolloClient from 'apollo-boost';
import { GET_USER_DATA } from '../schema';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
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
                setSymptoms: (_, variables, client) => {
                    const { symptoms } = variables;
                    client.cache.writeData({
                        data: {
                            symptoms
                        }
                    })
                },
                // removeFavorites: (_, variables, client) => {
                //     const { id } = variables;
                //     let { favorites } = client.cache.readQuery({ query: GET_FAVORITES });
                //     favorites = favorites.filter(el => el.id !== id);
                //     client.cache.writeData({
                //         data: {
                //             favorites
                //         }
                //     })
                // }
            }
        },
        defaults: {
            userData: {},
            symptoms: []
        }
    }
});

export default client