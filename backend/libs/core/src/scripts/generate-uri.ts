export const createURI = (appData: any): string => {
  if (appData.ssl) {
    return `https://${appData.host}:${appData.port}${appData.graphqlEndpoint}`;
  }
  return `http://${appData.host}:${appData.port}${appData.graphqlEndpoint}`;
};
