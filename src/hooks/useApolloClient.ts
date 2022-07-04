import { useMemo } from 'react';
// import { relayStylePagination } from "@apollo/client/utilities";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import useAuth from './useAuth';
import { getBackendUrl } from 'src/lib/api';
// import { useSession } from "next-auth/react";

const uri = getBackendUrl() as string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let apolloClient: ApolloClient<any> | undefined;

function createApolloClient(token: string | undefined | unknown) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    uri, // Server URL (must be absolute)
    // credentials: "include",
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            jobs: {
              // Don't cache separate results based on
              // any of this field's arguments.
              keyArgs: false,
              // Concatenate the incoming list items with
              // the existing list items.
              merge(existing = {}, incoming) {
                return {
                  ...existing,
                  ...incoming,
                  edges: [...(existing?.nodes ?? []), ...incoming.nodes],
                };
              },
            },
          },
        },
      },
    }),
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}

export function initializeApollo(initialState = null, token: string | undefined | null | unknown) {
  const _apolloClient = apolloClient ?? createApolloClient(token);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useApollo(initialState: any) {
  // const { data: session } = useSession();

  const { accessToken } = useAuth();

  // const handleError = useErrorHandler();
  const store = useMemo(
    () => initializeApollo(initialState, accessToken),
    [initialState, accessToken]
  );
  return store;
}
