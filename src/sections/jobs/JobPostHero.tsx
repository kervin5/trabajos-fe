// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Avatar, SpeedDial, Typography, SpeedDialAction } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { fDate } from '../../utils/formatTime';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';

import { deepOrange } from '@mui/material/colors';
import { Job } from 'src/@types/jobs';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Iconify icon="eva:facebook-fill" width={20} height={20} color="#1877F2" />,
  },
  {
    name: 'Instagram',
    icon: <Iconify icon="ant-design:instagram-filled" width={20} height={20} color="#D7336D" />,
  },
  {
    name: 'Linkedin',
    icon: <Iconify icon="eva:linkedin-fill" width={20} height={20} color="#006097" />,
  },
  {
    name: 'Twitter',
    icon: <Iconify icon="eva:twitter-fill" width={20} height={20} color="#1C9CEA" />,
  },
];

// const OverlayStyle = styled('h1')(({ theme }) => ({
//   top: 0,
//   right: 0,
//   bottom: 0,
//   left: 0,
//   zIndex: 9,
//   position: 'absolute',
//   backgroundColor: alpha(theme.palette.grey[900], 0.72),
// }));

const HeroBackgroundStyle = styled(Box)(({ theme }) => ({
  backgroundImage: "url('/images/gradient-bg.jpg')",
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  position: 'relative',
  paddingBottom: theme.spacing(10),
  '&:after': {
    top: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: theme.palette.grey[800],
    display: 'block',
    content: '""',
    position: 'absolute',
    opacity: 0.6,
  },
}));

const TitleStyle = styled('h1')(({ theme }) => ({
  ...theme.typography.h3,
  top: 0,
  zIndex: 10,
  width: '100%',
  position: 'relative',
  padding: theme.spacing(3),
  paddingBottom: 0,
  color: theme.palette.common.white, //,
  // [theme.breakpoints.up('lg')]: {
  //   padding: theme.spacing(10),
  // },
}));

const LocationStyle = styled('h2')(({ theme }) => ({
  ...theme.typography.h6,
  top: 0,
  zIndex: 10,
  width: '100%',
  position: 'relative',
  padding: theme.spacing(3),
  paddingTop: 0,
  fontWeight: theme.typography.fontWeightLight,
  color: theme.palette.common.white, //,
  // [theme.breakpoints.up('lg')]: {
  //   padding: theme.spacing(10),
  // },
}));

const FooterStyle = styled('div')(({ theme }) => ({
  bottom: 0,
  zIndex: 10,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'flex-end',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
    paddingRight: theme.spacing(3),
  }, //,
  // [theme.breakpoints.up('lg')]: {
  //   padding: theme.spacing(10),
  // },
}));

// ----------------------------------------------------------------------

type Props = {
  job: Job;
};

export default function JobPostHero({ job }: Props) {
  const isDesktop = useResponsive('up', 'sm');

  const { title, author, createdAt, location } = job;

  return (
    <HeroBackgroundStyle>
      <TitleStyle>{title}</TitleStyle>
      <LocationStyle>{location?.name}</LocationStyle>

      <FooterStyle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <Avatar sx={{ color: 'common.white', bgcolor: deepOrange[500], width: 48, height: 48 }}>
            {author?.firstName?.[0]}
          </Avatar> */}
          <Box sx={{ ml: 0 }}>
            {/* <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
              {author?.displayName}
            </Typography> */}
            <Typography variant="body2" sx={{ color: 'common.white' }}>
              {fDate(createdAt)}
            </Typography>
          </Box>
        </Box>

        <SpeedDial
          direction={isDesktop ? 'left' : 'up'}
          ariaLabel="Share post"
          icon={<Iconify icon="eva:share-fill" sx={{ width: 20, height: 20 }} />}
          sx={{ '& .MuiSpeedDial-fab': { width: 48, height: 48 } }}
        >
          {SOCIALS.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipPlacement="top"
              FabProps={{ color: 'default' }}
            />
          ))}
        </SpeedDial>
      </FooterStyle>

      {/* <OverlayStyle /> */}
      {/* <Image alt="post cover" src={images?.[0]?.signedUrl ?? '/images/gradient-bg.jpg'} ratio="21/9" /> */}
    </HeroBackgroundStyle>
  );
}
