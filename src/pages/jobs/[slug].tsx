import { useEffect, useState, useCallback } from 'react';
import { sentenceCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Card, Divider, Container, Typography, Pagination } from '@mui/material';
import Layout from 'src/layouts';
import useSettings from 'src/hooks/useSettings';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'axios';
import { Post } from 'src/@types/blog';
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/routes/paths';
import {
  BlogPostCommentForm,
  BlogPostCommentList,
  BlogPostHero,
  BlogPostTags,
} from 'src/sections/jobs';
import Markdown from 'src/components/Markdown';
import { SkeletonPost } from 'src/components/skeleton';
import BlogPostRecent from 'src/sections/@dashboard/jobs/BlogPostRecent';
import { MotionViewport } from 'src/components/animate';
import gql from 'graphql-tag';
import { useJobQuery, useJobsQuery } from 'src/generated/graphql';

// ----------------------------------------------------------------------

JobListingPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

gql`
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

export default function JobListingPage() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const { query } = useRouter();

  //   const { title } = query;
  const title = 'Hello world';
  const jobId = '94c025b8-1eed-4a63-b40d-0b17a76ea87e';

  const [recentPosts, setRecentPosts] = useState([]);

  //   const [post, setPost] = useState<Post | null>(null);

  //   const [error, setError] = useState(null);

  //   const getPost = useCallback(async () => {
  //     try {
  //       const response = await axios.get('/api/blog/post', {
  //         params: { title },
  //       });

  //       if (isMountedRef.current) {
  //         setPost(response.data.post);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setError(error.message);
  //     }
  //   }, [isMountedRef, title]);

  const { error, loading, data } = useJobQuery({ variables: { jobId } });

  const { data: recentJobsData, loading: recentJobsLoading } = useJobsQuery({
    variables: { last: 5 },
  });

  const job = data?.job;

  //   const getRecentPosts = useCallback(async () => {
  //     try {
  //       const response = await axios.get('/api/blog/posts/recent', {
  //         params: { title },
  //       });

  //       if (isMountedRef.current) {
  //         setRecentPosts(response.data.recentPosts);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }, [isMountedRef, title]);

  //   useEffect(() => {
  //     getPost();
  //     getRecentPosts();
  //   }, [getRecentPosts, getPost]);

  return (
    <Page title="Blog: Post Details">
      <Container component={MotionViewport} sx={{ pt: 4, mb: 4 }}>
        <HeaderBreadcrumbs
          heading="Post Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: sentenceCase(title as string) },
          ]}
        />

        {job && (
          <Card>
            <BlogPostHero job={job} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                {job.plainTextContent?.substring(0, 100)}
              </Typography>

              <Markdown children={job.content} />

              <Box sx={{ my: 5 }}>
                <Divider />
                <BlogPostTags job={job} />
                <Divider />
              </Box>

              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography variant="h4">Comments</Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                  {/* ({post.comments.length}) */}
                  {30}
                </Typography>
              </Box>

              <BlogPostCommentList job={job} />

              <Box sx={{ mb: 5, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination count={8} color="primary" />
              </Box>

              <BlogPostCommentForm />
            </Box>
          </Card>
        )}

        {!job && !error && <SkeletonPost />}

        {error && <Typography variant="h6">404 {error}!</Typography>}

        {recentJobsData?.jobs.nodes?.length && <BlogPostRecent jobs={recentJobsData.jobs.nodes} />}
      </Container>
    </Page>
  );
}
