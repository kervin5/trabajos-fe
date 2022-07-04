const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export function getBackendUrl() {
  return endpoint as string;
}
