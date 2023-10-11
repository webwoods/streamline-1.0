// graphql-client.ts
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
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

export const authApolloClient =
  process.env.AUTH_APP_URI || createApolloClient(createURI(AUTH_APP));
export const procurementApolloClient =
  process.env.PROCUREMENT_APP_URI ||
  createApolloClient(createURI(PROCUREMENT_APP));
