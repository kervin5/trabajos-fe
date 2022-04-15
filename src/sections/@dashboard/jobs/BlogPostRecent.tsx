// @mui
import { Grid, Typography } from '@mui/material';
import { JobsQuery } from 'src/generated/graphql';
// @types
import { Job } from '../../../@types/jobs';
//
import BlogPostCard from './BlogPostCard';

// ----------------------------------------------------------------------

type Props = {
  jobs: JobsQuery['jobs']['nodes'];
};

export default function BlogPostRecent({ jobs }: Props) {
  return (
    <>
      <Typography variant="h4" sx={{ mt: 10, mb: 5 }}>
        Recent posts
      </Typography>

      <Grid container spacing={3}>
        {jobs?.map(
          (post) =>
            post && (
              <Grid key={post.id} item xs={12} sm={6} md={3}>
                <BlogPostCard job={post} />
              </Grid>
            )
        )}
      </Grid>
    </>
  );
}
