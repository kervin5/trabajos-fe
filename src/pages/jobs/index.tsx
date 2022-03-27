import { useRouter } from 'next/router';
import React from 'react';
import JobSearchForm from 'src/sections/jobs/JobSearchForm';
import JobsList from 'src/sections/jobs/JobsList';

const JobsPage = () => {
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
      <JobsList searchQuery={query as string} searchLocation={location as string} />
    </>
  );
};
export default JobsPage;
