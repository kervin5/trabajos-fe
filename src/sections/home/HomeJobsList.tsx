import { m } from 'framer-motion';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// components
import { varFade, MotionViewport } from '../../components/animate';
import { JobsCards } from '../jobs';
import useGuestLocation from 'src/hooks/useGuestLocation';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function HomePricingPlans() {
  const theme = useTheme();
  const { loading, data } = useGuestLocation();

  const isLight = theme.palette.mode === 'light';

  const location = loading ? 'Cargando' : data?.city ?? data?.country ?? '';

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box sx={{ mb: 10, textAlign: 'center' }}>
          <m.div variants={varFade().inDown}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              Ofertas Recientes 🔥
            </Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Typography
              sx={{
                color: isLight ? 'text.secondary' : 'text.primary',
              }}
            >
              Oportunidades recientemente publicadas o actualizadas
            </Typography>
          </m.div>
        </Box>

        <JobsCards searchLocation={location} searchQuery={''} />
      </Container>
    </RootStyle>
  );
}
