import { useState } from 'react';
// @mui
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import Iconify from 'src/components/Iconify';
import { SystemRole } from 'src/generated/graphql';
// components
// import Iconify from '../../../../components/Iconify';
//
// import { Block } from '../../Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { m: '8px !important' },
  '& svg': { width: 24, height: 24 },
} as const;

export default function ToggleButtons() {
  const [accountType, setAccountType] = useState<string | null>(SystemRole.Candidate);

  const handleAccountType = (
    event: React.MouseEvent<HTMLElement>,
    newAccountType: string | null
  ) => {
    setAccountType(newAccountType);
  };

  const caption =
    accountType === SystemRole.Candidate
      ? 'Ingresa tus datos para poder navegar y descubrir cientos de nuevas oportunidades laborales.'
      : 'Ingresa tus datos para poder publcar puestos de trabajos de manera gratuita.';

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Selecciona el motivo para crear una nueva cuenta.
      </Typography>
      <ToggleButtonGroup
        size="large"
        value={accountType}
        exclusive
        fullWidth
        onChange={handleAccountType}
        sx={{ mb: 3 }}
      >
        <ToggleButton value={SystemRole.Candidate} color="primary">
          <Iconify icon="ic:round-search" sx={{ mr: 1 }} height={'24px'} width="24px" /> Buscar
          empleo
        </ToggleButton>
        <ToggleButton value={SystemRole.Employer} color="primary">
          <Iconify icon="ic:round-mode-edit" sx={{ mr: 2 }} height={'24px'} width="24px" />
          Publicar puestos
        </ToggleButton>
      </ToggleButtonGroup>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {caption}
      </Typography>
    </Box>
  );
}
