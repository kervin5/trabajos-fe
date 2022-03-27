const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL;

export function getBackendUrl() {
  return endpoint as string;
}
