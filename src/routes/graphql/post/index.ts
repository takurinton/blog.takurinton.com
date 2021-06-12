import { ApolloClient, InMemoryCache } from '@apollo/client/core/core.cjs.js';
import { POST_QUERY } from '../query';

export const get = async (req) => {
  const id = req.query.get('id');
  const client = new ApolloClient({
      uri: 'https://api.takurinton.com/graphql',
      cache: new InMemoryCache()
  });
  
  const props = await client.query({
    query: POST_QUERY, 
    variables: { id }
  })

  return {
    body: props,
  };
}