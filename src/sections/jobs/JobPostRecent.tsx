// @mui
import { Grid, Typography } from '@mui/material';
// @types
import { Job } from '../../@types/jobs';
//
import JobPostCard from './JobPostCard';

// ----------------------------------------------------------------------

type Props = {
  jobs: Job[];
};

export default function JobPostRecent({ jobs }: Props) {
  return (
    <>
      <Typography variant="h4" sx={{ mt: 10, mb: 5 }}>
        Oportunidades similares
      </Typography>

      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid key={job.id} item xs={12} sm={6} md={3}>
            <JobPostCard job={job} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
