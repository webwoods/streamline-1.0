import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { setCookie, parseCookies } from "nookies";

// Function to get the Bearer token from cookies
const getAuthToken = () => {
  const cookies = parseCookies();
  return cookies.accessToken;
};

// Function to set the Bearer token in cookies
const setAuthToken = (token: string) => {
  setCookie(null, "accessToken", token, { path: "/" });
};

// Create an HTTP link for the Apollo Client
const authHttpLink = createHttpLink({
  uri: "http://localhost:5001/auth",
});

// Create an ApolloLink middleware to intercept requests
const authMiddleware = new ApolloLink((operation, forward) => {
  // Get the Bearer token from cookies
  const token = getAuthToken();

  // If a token exists, set the Authorization header
  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Continue with the request
  return forward(operation);
});

// Create the Apollo Client with the custom link and cache
const authClient = new ApolloClient({
  link: ApolloLink.from([authMiddleware, authHttpLink]),
  cache: new InMemoryCache(),
});

// Export functions to set and get the Bearer token
export const setBearerToken = setAuthToken;
export const getBearerToken = getAuthToken;

export default authClient;
