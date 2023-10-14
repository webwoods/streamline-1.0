// graphql-client.ts
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core';
import { createURI } from '../scripts/generate-uri';
import { AUTH_APP, PROCUREMENT_APP } from '../constants/appInfo';

export const createApolloClient = (
  uri: string,
): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });
};

export const authApolloClient = createApolloClient(createURI(AUTH_APP));
export const procurementApolloClient = createApolloClient(
  createURI(PROCUREMENT_APP),
);
