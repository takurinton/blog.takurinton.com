import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core/core.cjs.js';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'https://api.takurinton.com/graphql'
});

export const client = new ApolloClient({
    cache, 
    link, 
});