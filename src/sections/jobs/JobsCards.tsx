import React, { useEffect, useMemo } from 'react';
import NextLink from 'next/link';
import gql from 'graphql-tag';
import { SortOrder, useJobsQuery } from 'src/generated/graphql';
import usePrevious from 'src/hooks/usePrevious';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Link,
} from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Job } from 'src/@types/jobs';

gql`
  query Jobs(
    $first: Int
    $filter: JobsFilterInput
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
        content
        author {
          id
          displayName
          lastName
          firstName
        }
        createdAt
        updatedAt
        plainTextContent
        status
        views
        source
        location {
          id
          name
          latitude
          longitude
        }
        images {
          id
          path
          bucket
          signedUrl
        }
      }
      totalCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

const JobsCards = ({
  searchQuery,
  searchLocation,
}: {
  searchQuery: string;
  searchLocation: string;
}) => {
  const { data, refetch } = useJobsQuery({
    variables: {
      filter: {
        locationName: searchLocation,
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

  return (
    <>
      {data?.jobs.nodes?.map((job) => (
        <JobCard job={job} key={`JobCard${job?.id}`} />
      ))}
    </>
  );
};

const JobCard = ({
  job,
}: {
  job: Pick<Job, 'id' | 'title' | 'location' | 'content' | 'plainTextContent'> | null;
}) =>
  job && (
    <Card sx={{ pb: 2, mb: 3 }}>
      <CardHeader
        title={
          <NextLink href={'/jobs'} passHref>
            <Link
              key={'perrote'}
              variant="body2"
              sx={{
                lineHeight: 2,
                display: 'flex',
                alignItems: 'center',
                color: 'text.primary',
                '& > div': { display: 'inherit' },
              }}
            >
              {job.title}
            </Link>
          </NextLink>
        }
        subheader={job.location?.name}
        action={
          <IconButton aria-label="compartir">
            <ShareIcon />
          </IconButton>
        }
      />

      <CardContent>
        <Link href={`/jobs/${job.id}`}>
          <a>
            {job.plainTextContent && job.plainTextContent.substring(0, 200)}...{' '}
            <strong>ver más</strong>
          </a>
        </Link>
      </CardContent>
      <CardActions sx={{ px: 3 }}>
        <Button variant="contained" size="large" fullWidth>
          Aplicar
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{
            border: ({ palette }) => `1px solid ${palette.grey[400]}`,
            color: ({ palette }) => palette.grey[400],
          }}
          aria-label="agregar a favoritos"
        >
          <FavoriteIcon />
        </Button>
      </CardActions>
    </Card>
  );

export default React.memo(JobsCards);
