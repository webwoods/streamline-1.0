export const MAIN_APP = {
  host: process.env.MAIN_APP_HOST || 'localhost',
  port: process.env.MAIN_APP_PORT || 3333,
  name: process.env.MAIN_APP_NAME || 'streamline',
  graphqlEndpoint: process.env.MAIN_APP_GRAPHQL || '/graphql',
  schema: '/apps/streamline/src/schema.gql',
  ssl: process.env.SSL || false,
}

export const AUTH_APP = {
  host: 'localhost',
  port: 5001,
  name: 'auth',
  graphqlEndpoint: '/auth',
  schema: '/apps/auth-plugin/src/auth-schema.gql',
  ssl: false,
}

export const PROCUREMENT_APP = {
  host: 'localhost',
  port: 5002,
  name: 'procurement',
  graphqlEndpoint: '/procurement',
  schema: '/apps/procurement-plugin/src/procurement-schema.gql',
  ssl: false,
}