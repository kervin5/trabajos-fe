import { m } from 'framer-motion';
import { useRouter } from 'next/router';

// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Stack, StackProps } from '@mui/material';
// routes
import { MotionContainer, varFade } from '../../components/animate';
import dynamic from 'next/dynamic';
import useGuestLocation from 'src/hooks/useGuestLocation';

const JobSearchForm = dynamic(() => import('src/sections/jobs/JobSearchForm'), {
  ssr: false,
});

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  },
}));

const ContentStyle = styled((props: StackProps) => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    // maxWidth: 520,
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up('md')]: {
      margin: 'unset',
      textAlign: 'left',
    },
  })
);

const HeroOverlayStyle = styled(m.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const HeroImgStyle = styled(m.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  // width: '100%',
  margin: 0,
  position: 'absolute',
  // [theme.breakpoints.up('lg')]: {
  //   right: '8%',
  //   width: 'auto',
  //   height: '48vh',
  // },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const router = useRouter();

  const { loading, data } = useGuestLocation();

  const location = loading ? '' : data?.city ?? data?.country ?? '';

  const handleFormSubmit = ({ query, location }: { query: string; location: string }) => {
    router.push(`/jobs?query=${query}&location=${location}`);
  };

  return (
    <MotionContainer>
      <RootStyle>
        <HeroOverlayStyle
          alt="overlay"
          src="https://minimals.cc/assets/overlay.svg"
          variants={varFade().in}
        />

        <HeroImgStyle alt="hero" src="/images/gradient-bg.jpg" variants={varFade().inUp} />

        <Container>
          <ContentStyle>
            <m.div variants={varFade().inRight}>
              <Typography variant="h1" sx={{ color: 'common.white' }}>
                Oportunidades {location === '' ? '' : 'en'}
                <br />
                <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
                  {location === '' ? 'cerca de ti' : location}
                </Typography>
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography sx={{ color: 'common.white' }}>
                Encuentra oportunidades laborales en tu ciudad.
              </Typography>
            </m.div>
            <JobSearchForm onSubmit={handleFormSubmit} />
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </MotionContainer>
  );
}
