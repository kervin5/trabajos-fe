// @mui
import { Box, Chip, Avatar, Checkbox, AvatarGroup, FormControlLabel } from '@mui/material';
// utils
import { fShortenNumber } from '../../utils/formatNumber';
// @types
import { Job } from '../../@types/jobs';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  job: Job;
};

export default function BlogPostTags({ job }: Props) {
  // const { favorite, tags, favoritePerson } = job;
  const { favorite, tags, favoritePerson } = {
    tags: ['finance', 'marketing', 'sales'],
    favoritePerson: [
      { name: 'Kervin', avatarUrl: 'https://avatars2.githubusercontent.com/u/1609898?s=460&v=4' },
      { name: 'Kev', avatarUrl: 'https://avatars2.githubusercontent.com/u/1609898?s=460&v=4' },
      { name: 'Kev', avatarUrl: 'https://avatars2.githubusercontent.com/u/1609898?s=460&v=4' },
    ],
    favorite: 30,
  };

  return (
    <Box sx={{ py: 3 }}>
      {tags.map((tag) => (
        <Chip key={tag} label={tag} sx={{ m: 0.5 }} />
      ))}

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              size="small"
              color="error"
              icon={<Iconify icon="eva:heart-fill" />}
              checkedIcon={<Iconify icon="eva:heart-fill" />}
            />
          }
          label={fShortenNumber(favorite)}
        />
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': { width: 32, height: 32 },
          }}
        >
          {favoritePerson.map((person) => (
            <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
          ))}
        </AvatarGroup>
      </Box>
    </Box>
  );
}
