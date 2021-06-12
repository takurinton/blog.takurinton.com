import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { POSTS_QUERY } from '../query';

export const get = async (req) => {
  // なんかここ2重でとってんの無駄に感じてしまうな
  const category = req.query.get('category') ?? '';
  const page = req.query.get('page') ?? 1;

  const client = new ApolloClient({
      uri: 'http://localhost:8080/graphql',
      cache: new InMemoryCache()
  });
  
  const props = await client.query({
    query: POSTS_QUERY, 
    variables: { page, category }
  })

  return {
    body: props,
  };
}