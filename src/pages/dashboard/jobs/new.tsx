// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { JobsNewJobForm } from '../../../sections/@dashboard/jobs';

// ----------------------------------------------------------------------

JobsNewJob.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function JobsNewJob() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Ofertas: Nueva Oferta">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Publicar una nueva oferta"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Ofertas', href: PATH_DASHBOARD.jobs.root },
            { name: 'Nueva Oferta' },
          ]}
        />

        <JobsNewJobForm />
      </Container>
    </Page>
  );
}
