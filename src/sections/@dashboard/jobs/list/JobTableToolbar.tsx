import { Stack, InputAdornment, TextField } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

// const INPUT_WIDTH = 160;

type Props = {
  optionsService: string[];
  filterName: string;
  filterService: string;
  filterStartDate: Date | null;
  filterEndDate: Date | null;
  onFilterName: (value: string) => void;
  onFilterService: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterStartDate: (value: Date | null) => void;
  onFilterEndDate: (value: Date | null) => void;
};

export default function InvoiceTableToolbar({
  optionsService,
  filterStartDate,
  filterEndDate,
  filterName,
  filterService,
  onFilterName,
  onFilterService,
  onFilterStartDate,
  onFilterEndDate,
}: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2.5, px: 3 }}
    >
      <TextField
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder="Buscar oferta..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon={'eva:search-fill'}
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
      />

      {/* <Tooltip title="Filter list">
        <IconButton>
          <Iconify icon={'ic:round-filter-list'} />
        </IconButton>
      </Tooltip> */}
    </Stack>
  );
}
