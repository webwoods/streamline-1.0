// graphql-client.ts
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

export const createApolloClient = (
  uri: string,
): ApolloClient<NormalizedCacheObject> => {
  Logger.log(`🚀 Connected to Gateway via on: ${uri}`);
  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });
};

export const apolloClient = createApolloClient(process.env.GATEWAY_SERVICE);
