import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  Json: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Image = {
  __typename?: 'Image';
  bucket: Scalars['String'];
  id: Scalars['String'];
  path: Scalars['String'];
  signedUrl?: Maybe<Scalars['String']>;
};

export type Job = {
  __typename?: 'Job';
  author?: Maybe<User>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  images: Array<Image>;
  location?: Maybe<Location>;
  source: JobSource;
  status: JobStatus;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  views: Scalars['Int'];
};

export type JobConnection = {
  __typename?: 'JobConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<JobEdge>>>;
  /** Flattened list of Job type */
  nodes?: Maybe<Array<Maybe<Job>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};


export type JobConnectionTotalCountArgs = {
  filter?: InputMaybe<Scalars['Json']>;
};

export type JobCreateInput = {
  content: Scalars['String'];
  location: Scalars['String'];
  publish?: InputMaybe<Scalars['Boolean']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title: Scalars['String'];
};

export type JobEdge = {
  __typename?: 'JobEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Job>;
};

export type JobFilterInput = {
  location?: InputMaybe<Scalars['String']>;
  searchString?: InputMaybe<Scalars['String']>;
};

export type JobOrderByInput = {
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type JobOrderByUpdatedAtInput = {
  updatedAt: SortOrder;
};

export enum JobSource {
  External = 'EXTERNAL',
  Internal = 'INTERNAL'
}

export enum JobStatus {
  Closed = 'CLOSED',
  Deleted = 'DELETED',
  Draft = 'DRAFT',
  Expired = 'EXPIRED',
  Published = 'PUBLISHED'
}

export type Location = {
  __typename?: 'Location';
  id: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createJob?: Maybe<Job>;
  deleteJob?: Maybe<Job>;
  incrementJobViewCount?: Maybe<Job>;
  login?: Maybe<AuthPayload>;
  register?: Maybe<AuthPayload>;
  togglePublishJob?: Maybe<Job>;
};


export type MutationCreateJobArgs = {
  data: JobCreateInput;
};


export type MutationDeleteJobArgs = {
  id: Scalars['String'];
};


export type MutationIncrementJobViewCountArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  isEmployer?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};


export type MutationTogglePublishJobArgs = {
  id: Scalars['String'];
};

/** PageInfo cursor, as defined in https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor corresponding to the last nodes in edges. Null if the connection is empty. */
  endCursor?: Maybe<Scalars['String']>;
  /** Used to indicate whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Used to indicate whether more edges exist prior to the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** The cursor corresponding to the first nodes in edges. Null if the connection is empty. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
  draftsByUser?: Maybe<Array<Maybe<Job>>>;
  feed: Array<Job>;
  job?: Maybe<Job>;
  jobs: JobConnection;
  mapboxLocations?: Maybe<Array<Location>>;
  me?: Maybe<User>;
};


export type QueryDraftsByUserArgs = {
  userUniqueInput: UserUniqueInput;
};


export type QueryFeedArgs = {
  orderBy?: InputMaybe<JobOrderByUpdatedAtInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryJobArgs = {
  id: Scalars['String'];
};


export type QueryJobsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<JobFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<JobOrderByInput>;
};


export type QueryMapboxLocationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export enum SystemRole {
  Admin = 'ADMIN',
  Candidate = 'CANDIDATE',
  Employer = 'EMPLOYER'
}

export type User = {
  __typename?: 'User';
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  jobs: Array<Job>;
  lastName?: Maybe<Scalars['String']>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  jobs?: InputMaybe<Array<JobCreateInput>>;
  name: Scalars['String'];
};

export enum UserRoleInCompany {
  Admin = 'ADMIN',
  Owner = 'OWNER',
  Recruiter = 'RECRUITER'
}

export type UserUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type MapboxLocationsQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']>;
}>;


export type MapboxLocationsQuery = { __typename?: 'Query', mapboxLocations?: Array<{ __typename?: 'Location', id: string, name: string, latitude: number, longitude: number }> | null };

export type CreateJobMutationVariables = Exact<{
  data: JobCreateInput;
}>;


export type CreateJobMutation = { __typename?: 'Mutation', createJob?: { __typename?: 'Job', id: string, title: string, content: string } | null };

export type JobsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<JobFilterInput>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<JobOrderByInput>;
}>;


export type JobsQuery = { __typename?: 'Query', jobs: { __typename?: 'JobConnection', totalCount?: number | null, nodes?: Array<{ __typename?: 'Job', id: string, title: string, createdAt: any, updatedAt: any, content: string, location?: { __typename?: 'Location', id: string, name: string, latitude: number, longitude: number } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, startCursor?: string | null, hasNextPage: boolean } } };


export const MapboxLocationsDocument = gql`
    query MapboxLocations($query: String) {
  mapboxLocations(query: $query) {
    id
    name
    latitude
    longitude
  }
}
    `;

/**
 * __useMapboxLocationsQuery__
 *
 * To run a query within a React component, call `useMapboxLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMapboxLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMapboxLocationsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useMapboxLocationsQuery(baseOptions?: Apollo.QueryHookOptions<MapboxLocationsQuery, MapboxLocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MapboxLocationsQuery, MapboxLocationsQueryVariables>(MapboxLocationsDocument, options);
      }
export function useMapboxLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MapboxLocationsQuery, MapboxLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MapboxLocationsQuery, MapboxLocationsQueryVariables>(MapboxLocationsDocument, options);
        }
export type MapboxLocationsQueryHookResult = ReturnType<typeof useMapboxLocationsQuery>;
export type MapboxLocationsLazyQueryHookResult = ReturnType<typeof useMapboxLocationsLazyQuery>;
export type MapboxLocationsQueryResult = Apollo.QueryResult<MapboxLocationsQuery, MapboxLocationsQueryVariables>;
export const CreateJobDocument = gql`
    mutation CreateJob($data: JobCreateInput!) {
  createJob(data: $data) {
    id
    title
    content
  }
}
    `;
export type CreateJobMutationFn = Apollo.MutationFunction<CreateJobMutation, CreateJobMutationVariables>;

/**
 * __useCreateJobMutation__
 *
 * To run a mutation, you first call `useCreateJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJobMutation, { data, loading, error }] = useCreateJobMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateJobMutation(baseOptions?: Apollo.MutationHookOptions<CreateJobMutation, CreateJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateJobMutation, CreateJobMutationVariables>(CreateJobDocument, options);
      }
export type CreateJobMutationHookResult = ReturnType<typeof useCreateJobMutation>;
export type CreateJobMutationResult = Apollo.MutationResult<CreateJobMutation>;
export type CreateJobMutationOptions = Apollo.BaseMutationOptions<CreateJobMutation, CreateJobMutationVariables>;
export const JobsDocument = gql`
    query Jobs($first: Int, $filter: JobFilterInput, $after: String, $before: String, $last: Int, $orderBy: JobOrderByInput) {
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
    totalCount
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
  }
}
    `;

/**
 * __useJobsQuery__
 *
 * To run a query within a React component, call `useJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      filter: // value for 'filter'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      last: // value for 'last'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useJobsQuery(baseOptions?: Apollo.QueryHookOptions<JobsQuery, JobsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JobsQuery, JobsQueryVariables>(JobsDocument, options);
      }
export function useJobsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JobsQuery, JobsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JobsQuery, JobsQueryVariables>(JobsDocument, options);
        }
export type JobsQueryHookResult = ReturnType<typeof useJobsQuery>;
export type JobsLazyQueryHookResult = ReturnType<typeof useJobsLazyQuery>;
export type JobsQueryResult = Apollo.QueryResult<JobsQuery, JobsQueryVariables>;