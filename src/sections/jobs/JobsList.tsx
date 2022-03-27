import React, { useEffect, useMemo } from 'react';
import gql from 'graphql-tag';
import { SortOrder, useJobsQuery } from 'src/generated/graphql';
import usePrevious from 'src/hooks/usePrevious';

gql`
  query Jobs(
    $first: Int
    $filter: JobFilterInput
    $after: String
    $before: String
    $last: Int
    $orderBy: JobOrderByInput
  ) {
    jobs(
      first: $first
      filter: $filter
      after: $after
      before: $before
      last: $last
      orderBy: $orderBy
    ) {
      nodes {
        id
        title
        createdAt
        updatedAt
        content
        location {
          id
          name
          latitude
          longitude
        }
      }

      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

const JobsList = ({
  searchQuery,
  searchLocation,
}: {
  searchQuery: string;
  searchLocation: string;
}) => {
  const { data, loading, refetch } = useJobsQuery({
    variables: {
      filter: {
        location: searchLocation,
        searchString: searchQuery,
      },
      first: 10,
      orderBy: { createdAt: SortOrder.Desc },
    },
  });

  const previousQuery = usePrevious(searchQuery);
  const previousLocation = usePrevious(searchLocation);

  const paramsChanged = useMemo(
    () => previousQuery !== searchQuery || previousLocation !== searchLocation,
    [searchQuery, searchLocation, previousLocation, previousQuery]
  );

  useEffect(() => {
    if (paramsChanged) {
      refetch();
    }
  }, [paramsChanged, refetch]);

  console.log({ data, loading, searchQuery, searchLocation });
  return (
    <p>
      {searchQuery}
      {searchLocation}
    </p>
  );
};

export default React.memo(JobsList);
