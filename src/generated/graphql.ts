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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

/** a single tag */
export type Company = {
  __typename?: 'Company';
  _count: CompanyCount;
  id: Scalars['ID'];
  jobs?: Maybe<Array<Job>>;
  name: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type CompanyCount = {
  __typename?: 'CompanyCount';
  employees: Scalars['Int'];
  jobs: Scalars['Int'];
};

export type CompanyRelationFilter = {
  is?: InputMaybe<CompanyWhereInput>;
  isNot?: InputMaybe<CompanyWhereInput>;
};

export type CompanyWhereInput = {
  AND?: InputMaybe<Array<CompanyWhereInput>>;
  NOT?: InputMaybe<Array<CompanyWhereInput>>;
  OR?: InputMaybe<Array<CompanyWhereInput>>;
  employees?: InputMaybe<EmployeeInCompanyListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  jobs?: InputMaybe<JobListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  verified?: InputMaybe<BoolFilter>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type EmployeeInCompanyListRelationFilter = {
  every?: InputMaybe<EmployeeInCompanyWhereInput>;
  none?: InputMaybe<EmployeeInCompanyWhereInput>;
  some?: InputMaybe<EmployeeInCompanyWhereInput>;
};

export type EmployeeInCompanyOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type EmployeeInCompanyWhereInput = {
  AND?: InputMaybe<Array<EmployeeInCompanyWhereInput>>;
  NOT?: InputMaybe<Array<EmployeeInCompanyWhereInput>>;
  OR?: InputMaybe<Array<EmployeeInCompanyWhereInput>>;
  company?: InputMaybe<CompanyRelationFilter>;
  companyId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  employee?: InputMaybe<UserRelationFilter>;
  employeeId?: InputMaybe<StringFilter>;
  role?: InputMaybe<EnumUserRoleInCompanyFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type EnumJobSourceFilter = {
  equals?: InputMaybe<JobSource>;
  in?: InputMaybe<Array<JobSource>>;
  not?: InputMaybe<NestedEnumJobSourceFilter>;
  notIn?: InputMaybe<Array<JobSource>>;
};

export type EnumJobStatusFilter = {
  equals?: InputMaybe<JobStatus>;
  in?: InputMaybe<Array<JobStatus>>;
  not?: InputMaybe<NestedEnumJobStatusFilter>;
  notIn?: InputMaybe<Array<JobStatus>>;
};

export type EnumSystemRoleFilter = {
  equals?: InputMaybe<SystemRole>;
  in?: InputMaybe<Array<SystemRole>>;
  not?: InputMaybe<NestedEnumSystemRoleFilter>;
  notIn?: InputMaybe<Array<SystemRole>>;
};

export type EnumUserRoleInCompanyFilter = {
  equals?: InputMaybe<UserRoleInCompany>;
  in?: InputMaybe<Array<UserRoleInCompany>>;
  not?: InputMaybe<NestedEnumUserRoleInCompanyFilter>;
  notIn?: InputMaybe<Array<UserRoleInCompany>>;
};

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

/** a single image */
export type Image = {
  __typename?: 'Image';
  bucket: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  jobId?: Maybe<Scalars['String']>;
  path: Scalars['String'];
  signedUrl?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type ImageListRelationFilter = {
  every?: InputMaybe<ImageWhereInput>;
  none?: InputMaybe<ImageWhereInput>;
  some?: InputMaybe<ImageWhereInput>;
};

export type ImageWhereInput = {
  AND?: InputMaybe<Array<ImageWhereInput>>;
  NOT?: InputMaybe<Array<ImageWhereInput>>;
  OR?: InputMaybe<Array<ImageWhereInput>>;
  bucket?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  job?: InputMaybe<JobRelationFilter>;
  jobId?: InputMaybe<StringNullableFilter>;
  path?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

/** a single job */
export type Job = {
  __typename?: 'Job';
  _count: JobCount;
  author?: Maybe<User>;
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  expiresAt?: Maybe<Scalars['DateTime']>;
  externalUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  images?: Maybe<Array<Image>>;
  location?: Maybe<Location>;
  locationId?: Maybe<Scalars['String']>;
  plainTextContent?: Maybe<Scalars['String']>;
  source: JobSource;
  status: JobStatus;
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  views: Scalars['Int'];
};

export type JobAvgOrderByAggregateInput = {
  views?: InputMaybe<SortOrder>;
};

export type JobCount = {
  __typename?: 'JobCount';
  images: Scalars['Int'];
  tags: Scalars['Int'];
};

export type JobCountOrderByAggregateInput = {
  authorId?: InputMaybe<SortOrder>;
  companyId?: InputMaybe<SortOrder>;
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  expiresAt?: InputMaybe<SortOrder>;
  externalUrl?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  locationId?: InputMaybe<SortOrder>;
  source?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  views?: InputMaybe<SortOrder>;
};

export type JobCreateInput = {
  content: Scalars['String'];
  location: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type JobEdge = {
  __typename?: 'JobEdge';
  cursor: Scalars['String'];
  node: Job;
};

export type JobListRelationFilter = {
  every?: InputMaybe<JobWhereInput>;
  none?: InputMaybe<JobWhereInput>;
  some?: InputMaybe<JobWhereInput>;
};

export type JobMaxOrderByAggregateInput = {
  authorId?: InputMaybe<SortOrder>;
  companyId?: InputMaybe<SortOrder>;
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  expiresAt?: InputMaybe<SortOrder>;
  externalUrl?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  locationId?: InputMaybe<SortOrder>;
  source?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  views?: InputMaybe<SortOrder>;
};

export type JobMinOrderByAggregateInput = {
  authorId?: InputMaybe<SortOrder>;
  companyId?: InputMaybe<SortOrder>;
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  expiresAt?: InputMaybe<SortOrder>;
  externalUrl?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  locationId?: InputMaybe<SortOrder>;
  source?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  views?: InputMaybe<SortOrder>;
};

export type JobOrderByInput = {
  _avg?: InputMaybe<JobAvgOrderByAggregateInput>;
  _count?: InputMaybe<JobCountOrderByAggregateInput>;
  _max?: InputMaybe<JobMaxOrderByAggregateInput>;
  _min?: InputMaybe<JobMinOrderByAggregateInput>;
  _sum?: InputMaybe<JobSumOrderByAggregateInput>;
  authorId?: InputMaybe<SortOrder>;
  companyId?: InputMaybe<SortOrder>;
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  expiresAt?: InputMaybe<SortOrder>;
  externalUrl?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  locationId?: InputMaybe<SortOrder>;
  source?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  views?: InputMaybe<SortOrder>;
};

export type JobOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type JobRelationFilter = {
  is?: InputMaybe<JobWhereInput>;
  isNot?: InputMaybe<JobWhereInput>;
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

export type JobSumOrderByAggregateInput = {
  views?: InputMaybe<SortOrder>;
};

export type JobWhereInput = {
  AND?: InputMaybe<Array<JobWhereInput>>;
  NOT?: InputMaybe<Array<JobWhereInput>>;
  OR?: InputMaybe<Array<JobWhereInput>>;
  author?: InputMaybe<UserRelationFilter>;
  authorId?: InputMaybe<StringNullableFilter>;
  company?: InputMaybe<CompanyRelationFilter>;
  companyId?: InputMaybe<StringNullableFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  expiresAt?: InputMaybe<DateTimeNullableFilter>;
  externalUrl?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  images?: InputMaybe<ImageListRelationFilter>;
  location?: InputMaybe<LocationRelationFilter>;
  locationId?: InputMaybe<StringNullableFilter>;
  source?: InputMaybe<EnumJobSourceFilter>;
  status?: InputMaybe<EnumJobStatusFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  views?: InputMaybe<IntFilter>;
};

export type JobsConnection = {
  __typename?: 'JobsConnection';
  edges?: Maybe<Array<JobEdge>>;
  nodes: Array<Job>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type JobsFilterInput = {
  AND?: InputMaybe<Array<JobWhereInput>>;
  NOT?: InputMaybe<Array<JobWhereInput>>;
  OR?: InputMaybe<Array<JobWhereInput>>;
  author?: InputMaybe<UserRelationFilter>;
  authorId?: InputMaybe<StringNullableFilter>;
  company?: InputMaybe<CompanyRelationFilter>;
  companyId?: InputMaybe<StringNullableFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  expiresAt?: InputMaybe<DateTimeNullableFilter>;
  externalUrl?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  images?: InputMaybe<ImageListRelationFilter>;
  location?: InputMaybe<LocationRelationFilter>;
  locationId?: InputMaybe<StringNullableFilter>;
  locationName?: InputMaybe<Scalars['String']>;
  searchString?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<EnumJobSourceFilter>;
  status?: InputMaybe<EnumJobStatusFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  views?: InputMaybe<IntFilter>;
};

/** a single location */
export type Location = {
  __typename?: 'Location';
  _count: LocationCount;
  id: Scalars['ID'];
  jobs?: Maybe<Array<Job>>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Scalars['String'];
};

export type LocationCount = {
  __typename?: 'LocationCount';
  jobs: Scalars['Int'];
};

export type LocationRelationFilter = {
  is?: InputMaybe<LocationWhereInput>;
  isNot?: InputMaybe<LocationWhereInput>;
};

export type LocationWhereInput = {
  AND?: InputMaybe<Array<LocationWhereInput>>;
  NOT?: InputMaybe<Array<LocationWhereInput>>;
  OR?: InputMaybe<Array<LocationWhereInput>>;
  id?: InputMaybe<StringFilter>;
  jobs?: InputMaybe<JobListRelationFilter>;
  latitude?: InputMaybe<FloatFilter>;
  longitude?: InputMaybe<FloatFilter>;
  name?: InputMaybe<StringFilter>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

/** a single mapbox location */
export type MapboxLocation = {
  __typename?: 'MapboxLocation';
  id: Scalars['ID'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Scalars['String'];
};

export type MapboxLocationFilterInput = {
  limit?: InputMaybe<Scalars['Float']>;
  locationName?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createJob: Job;
  login: LoginResponse;
};


export type MutationCreateJobArgs = {
  data: JobCreateInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedEnumJobSourceFilter = {
  equals?: InputMaybe<JobSource>;
  in?: InputMaybe<Array<JobSource>>;
  not?: InputMaybe<NestedEnumJobSourceFilter>;
  notIn?: InputMaybe<Array<JobSource>>;
};

export type NestedEnumJobStatusFilter = {
  equals?: InputMaybe<JobStatus>;
  in?: InputMaybe<Array<JobStatus>>;
  not?: InputMaybe<NestedEnumJobStatusFilter>;
  notIn?: InputMaybe<Array<JobStatus>>;
};

export type NestedEnumSystemRoleFilter = {
  equals?: InputMaybe<SystemRole>;
  in?: InputMaybe<Array<SystemRole>>;
  not?: InputMaybe<NestedEnumSystemRoleFilter>;
  notIn?: InputMaybe<Array<SystemRole>>;
};

export type NestedEnumUserRoleInCompanyFilter = {
  equals?: InputMaybe<UserRoleInCompany>;
  in?: InputMaybe<Array<UserRoleInCompany>>;
  not?: InputMaybe<NestedEnumUserRoleInCompanyFilter>;
  notIn?: InputMaybe<Array<UserRoleInCompany>>;
};

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  search?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  search?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  job: Job;
  jobs: JobsConnection;
  mapboxLocations: Array<MapboxLocation>;
  user: User;
  users: Array<User>;
};


export type QueryJobArgs = {
  id: Scalars['String'];
};


export type QueryJobsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<JobsFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<JobOrderByInput>;
};


export type QueryMapboxLocationsArgs = {
  filter: MapboxLocationFilterInput;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  search?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  search?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export enum SystemRole {
  Admin = 'ADMIN',
  Candidate = 'CANDIDATE',
  Employer = 'EMPLOYER'
}

/** a single tag */
export type Tag = {
  __typename?: 'Tag';
  User?: Maybe<User>;
  _count: TagCount;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  jobs?: Maybe<Array<Job>>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId?: Maybe<Scalars['String']>;
};

export type TagCount = {
  __typename?: 'TagCount';
  jobs: Scalars['Int'];
};

export type TagListRelationFilter = {
  every?: InputMaybe<TagWhereInput>;
  none?: InputMaybe<TagWhereInput>;
  some?: InputMaybe<TagWhereInput>;
};

export type TagOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TagWhereInput = {
  AND?: InputMaybe<Array<TagWhereInput>>;
  NOT?: InputMaybe<Array<TagWhereInput>>;
  OR?: InputMaybe<Array<TagWhereInput>>;
  User?: InputMaybe<UserRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  jobs?: InputMaybe<JobListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringNullableFilter>;
};

/** a single user */
export type User = {
  __typename?: 'User';
  _count: UserCount;
  createdAt: Scalars['DateTime'];
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  jobs?: Maybe<Array<Job>>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  phoneVerified: Scalars['Boolean'];
  role: SystemRole;
  tags?: Maybe<Array<Tag>>;
  updatedAt: Scalars['DateTime'];
};

export type UserCount = {
  __typename?: 'UserCount';
  companies: Scalars['Int'];
  jobs: Scalars['Int'];
  tags: Scalars['Int'];
};

export enum UserOrderByRelevanceFieldEnum {
  Email = 'email',
  FirstName = 'firstName',
  Id = 'id',
  LastName = 'lastName',
  Password = 'password',
  Phone = 'phone'
}

export type UserOrderByRelevanceInput = {
  fields: Array<UserOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type UserOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<UserOrderByRelevanceInput>;
  companies?: InputMaybe<EmployeeInCompanyOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  emailVerified?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  jobs?: InputMaybe<JobOrderByRelationAggregateInput>;
  lastName?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  phone?: InputMaybe<SortOrder>;
  phoneVerified?: InputMaybe<SortOrder>;
  role?: InputMaybe<SortOrder>;
  tags?: InputMaybe<TagOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export enum UserRoleInCompany {
  Admin = 'ADMIN',
  Owner = 'OWNER',
  Recruiter = 'RECRUITER'
}

export enum UserScalarFieldEnum {
  CreatedAt = 'createdAt',
  Email = 'email',
  EmailVerified = 'emailVerified',
  FirstName = 'firstName',
  Id = 'id',
  LastName = 'lastName',
  Password = 'password',
  Phone = 'phone',
  PhoneVerified = 'phoneVerified',
  Role = 'role',
  UpdatedAt = 'updatedAt'
}

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  companies?: InputMaybe<EmployeeInCompanyListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  emailVerified?: InputMaybe<BoolFilter>;
  firstName?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  jobs?: InputMaybe<JobListRelationFilter>;
  lastName?: InputMaybe<StringNullableFilter>;
  password?: InputMaybe<StringFilter>;
  phone?: InputMaybe<StringNullableFilter>;
  phoneVerified?: InputMaybe<BoolFilter>;
  role?: InputMaybe<EnumSystemRoleFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type MapboxLocationsQueryVariables = Exact<{
  filter: MapboxLocationFilterInput;
}>;


export type MapboxLocationsQuery = { __typename?: 'Query', mapboxLocations: Array<{ __typename?: 'MapboxLocation', id: string, name: string, latitude: number, longitude: number }> };

export type JobQueryVariables = Exact<{
  jobId: Scalars['String'];
}>;


export type JobQuery = { __typename?: 'Query', job: { __typename?: 'Job', id: string, title: string, content: string, createdAt: any, updatedAt: any, plainTextContent?: string | null, status: JobStatus, views: number, source: JobSource, author?: { __typename?: 'User', id: string, displayName?: string | null, lastName?: string | null, firstName?: string | null } | null, location?: { __typename?: 'Location', id: string, name: string, latitude: number, longitude: number } | null, images?: Array<{ __typename?: 'Image', id: string, path: string, bucket: string, signedUrl?: string | null }> | null } };

export type CreateJobMutationVariables = Exact<{
  data: JobCreateInput;
}>;


export type CreateJobMutation = { __typename?: 'Mutation', createJob: { __typename?: 'Job', id: string, title: string, content: string } };

export type JobsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<JobsFilterInput>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<JobOrderByInput>;
}>;


export type JobsQuery = { __typename?: 'Query', jobs: { __typename?: 'JobsConnection', totalCount?: number | null, nodes: Array<{ __typename?: 'Job', id: string, title: string, content: string, createdAt: any, updatedAt: any, plainTextContent?: string | null, status: JobStatus, views: number, source: JobSource, author?: { __typename?: 'User', id: string, displayName?: string | null, lastName?: string | null, firstName?: string | null } | null, location?: { __typename?: 'Location', id: string, name: string, latitude: number, longitude: number } | null, images?: Array<{ __typename?: 'Image', id: string, path: string, bucket: string, signedUrl?: string | null }> | null }>, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, startCursor?: string | null, hasNextPage: boolean } | null } };


export const MapboxLocationsDocument = gql`
    query MapboxLocations($filter: MapboxLocationFilterInput!) {
  mapboxLocations(filter: $filter) {
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
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useMapboxLocationsQuery(baseOptions: Apollo.QueryHookOptions<MapboxLocationsQuery, MapboxLocationsQueryVariables>) {
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
export const JobDocument = gql`
    query Job($jobId: String!) {
  job(id: $jobId) {
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
}
    `;

/**
 * __useJobQuery__
 *
 * To run a query within a React component, call `useJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobQuery({
 *   variables: {
 *      jobId: // value for 'jobId'
 *   },
 * });
 */
export function useJobQuery(baseOptions: Apollo.QueryHookOptions<JobQuery, JobQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JobQuery, JobQueryVariables>(JobDocument, options);
      }
export function useJobLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JobQuery, JobQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JobQuery, JobQueryVariables>(JobDocument, options);
        }
export type JobQueryHookResult = ReturnType<typeof useJobQuery>;
export type JobLazyQueryHookResult = ReturnType<typeof useJobLazyQuery>;
export type JobQueryResult = Apollo.QueryResult<JobQuery, JobQueryVariables>;
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
    query Jobs($first: Int, $filter: JobsFilterInput, $after: String, $before: String, $last: Int, $orderBy: JobOrderByInput) {
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