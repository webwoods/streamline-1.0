export const MAIN_APP = {
  host: 'localhost',
  port: 3333,
  name: 'streamline',
  graphqlEndpoint: '/graphql',
  ssl: false,
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