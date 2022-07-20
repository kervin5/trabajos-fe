import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../hooks/useApolloClient';

interface GraphqlProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any;
}

const GraphqlProvider: React.FC<GraphqlProviderProps> = ({ children, pageProps }) => {
  const client = useApollo(pageProps.initialApolloState);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphqlProvider;
