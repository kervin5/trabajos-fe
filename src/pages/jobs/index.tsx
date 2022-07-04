import { useRouter } from 'next/router';
import React from 'react';
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
      <JobSearchForm
        onSubmit={handleFormSubmit}
        initialValues={{ location: location as string, query: query as string }}
      />
      <JobsCards searchQuery={query as string} searchLocation={location as string} />
    </>
  );
}
