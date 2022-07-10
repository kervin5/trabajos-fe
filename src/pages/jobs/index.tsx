import { Box, Container } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import MotionViewport from 'src/components/animate/MotionViewport';
import Page from 'src/components/Page';
import { JobSearchForm, JobsCards } from 'src/sections/jobs';
import Layout from '../../layouts';

JobsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="main">{page}</Layout>;
};

export default function JobsPage() {
  const router = useRouter();
  const {
    query: { query, location },
  } = router;

  const handleFormSubmit = ({ query, location }: { query: string; location: string }) => {
    router.push(`/jobs?query=${query}&location=${location}`);
  };

  return (
    <>
      <Page title="The starting point for your next project">
        <Container component={MotionViewport} sx={{ pt: 4, mb: 4 }}>
          {/* <RootStyle>

          <ContentStyle> */}
          <Box sx={{ mb: 3 }}>
            <JobSearchForm
              onSubmit={handleFormSubmit}
              initialValues={{ location: location as string, query: query as string }}
            />
          </Box>
          <JobsCards searchQuery={query as string} searchLocation={location as string} />
          {/* </ContentStyle>
        </RootStyle> */}
        </Container>
      </Page>
    </>
  );
}
