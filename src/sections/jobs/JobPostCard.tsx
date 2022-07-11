import { paramCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Avatar, Typography, CardContent, Link, Stack } from '@mui/material';
import { Job } from 'src/@types/jobs';
import useResponsive from 'src/hooks/useResponsive';
import SvgIconStyle from 'src/components/SvgIconStyle';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { fDate } from 'src/utils/formatTime';
import TextIconLabel from 'src/components/TextIconLabel';
import Iconify from 'src/components/Iconify';
import { fShortenNumber } from 'src/utils/formatNumber';
import TextMaxLine from 'src/components/TextMaxLine';
import Image from 'src/components/Image';
import { deepOrange } from '@mui/material/colors';
// routes

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.8),
}));

// ----------------------------------------------------------------------

type Props = {
  job: Job;
  index?: number;
};

export default function JobPostCard({ job, index }: Props) {
  const isDesktop = useResponsive('up', 'md');

  const { title, author, createdAt, plainTextContent } = job;

  // const { cover, title, views, comment, share, author, createdAt } = job;

  const latestPost = index === 0 || index === 1 || index === 2;

  if (isDesktop && latestPost) {
    return (
      <Card>
        {/* <Avatar
          alt={author?.firstName ?? ""}
          src={author.avatarUrl}
          sx={{
            zIndex: 9,
            top: 24,
            left: 24,
            width: 40,
            height: 40,
            position: 'absolute',
          }}
        /> */}
        <Avatar
          sx={{
            color: 'common.white',
            bgcolor: deepOrange[500],
            width: 40,
            height: 40,
            zIndex: 9,
            top: 24,
            left: 24,
            position: 'absolute',
          }}
        >
          {author?.firstName?.[0]}
        </Avatar>
        <PostContent
          title={title}
          plainTextContent={plainTextContent ?? ''}
          view={22}
          comment={44}
          share={44}
          createdAt={createdAt}
          index={index}
        />
        <OverlayStyle />
        {/* <Image alt="cover" src={'/images/gradient-bg.jpg'} sx={{ height: 360 }} /> */}
      </Card>
    );
  }

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="https://minimals.cc/assets/icons/shape-avatar.svg"
          sx={{
            width: 80,
            height: 36,
            zIndex: 9,
            bottom: -15,
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
          sx={{
            color: 'common.white',
            bgcolor: deepOrange[500],
            width: 48,
            height: 48,
            top: '20px',
            left: '20px',
          }}
        >
          {author?.firstName?.[0]}
        </Avatar>
        {/* <Avatar
          alt={author.name}
          src={author.avatarUrl}
          sx={{
            left: 24,
            zIndex: 9,
            width: 32,
            height: 32,
            bottom: -16,
            position: 'absolute',
          }}
        /> */}
        {/* <Image alt="cover" src={'/images/gradient-bg.jpg'} ratio="16/9" /> */}
      </Box>

      <PostContent
        title={title}
        view={33}
        comment={44}
        share={99}
        createdAt={createdAt}
        plainTextContent={plainTextContent ?? ''}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type PostContentProps = {
  title: string;
  plainTextContent: string;
  view: number;
  comment: number;
  share: number;
  createdAt: Date | string | number;
  index?: number;
};

export function PostContent({
  title,
  view,
  comment,
  share,
  createdAt,
  index,
  plainTextContent,
}: PostContentProps) {
  // const isDesktop = useResponsive('up', 'md');

  const linkTo = PATH_DASHBOARD.blog.view(paramCase(title));

  const latestPostLarge = index === 0;
  const latestPostSmall = index === 1 || index === 2;

  const POST_INFO = [
    { number: comment, icon: 'eva:message-circle-fill' },
    { number: view, icon: 'eva:eye-fill' },
    { number: share, icon: 'eva:share-fill' },
  ];

  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
        ...((latestPostLarge || latestPostSmall) && {
          pt: 0,
          zIndex: 9,
          bottom: 0,
          position: 'absolute',
          color: 'common.white',
        }),
      }}
    >
      <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {fDate(createdAt)}
      </Typography>

      <NextLink href={linkTo} passHref>
        <Link color="inherit">
          <TextMaxLine variant={'h5'}>{title}</TextMaxLine>
        </Link>
      </NextLink>

      <NextLink href={linkTo} passHref>
        <Link color="inherit">
          <TextMaxLine variant={'body1'} line={4} persistent>
            {plainTextContent}
          </TextMaxLine>
        </Link>
      </NextLink>

      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 3,
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {POST_INFO.map((info, index) => (
          <TextIconLabel
            key={index}
            icon={<Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />}
            value={fShortenNumber(info.number)}
            sx={{ typography: 'caption', ml: index === 0 ? 0 : 1.5 }}
          />
        ))}
      </Stack>
    </CardContent>
  );
}
