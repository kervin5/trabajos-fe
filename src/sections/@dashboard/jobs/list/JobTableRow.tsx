import { useState } from 'react';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, Stack, Link, MenuItem } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';

// components

import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { Job, Location } from 'src/generated/graphql';

// ----------------------------------------------------------------------

type Props = {
  row:
    | (Pick<Omit<Job, 'location'>, 'id' | 'title' | 'createdAt'> & {
        location?: Pick<Location, 'id' | 'latitude' | 'longitude' | 'name'> | null;
      })
    | null;
  selected: boolean;
  onSelectRow: VoidFunction;
  onViewRow: VoidFunction;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function InvoiceTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}: Props) {
  // const theme = useTheme();

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Stack>
          <Typography variant="subtitle2" noWrap>
            {row?.title}
          </Typography>

          <Link
            noWrap
            variant="body2"
            onClick={onViewRow}
            sx={{ color: 'text.disabled', cursor: 'pointer' }}
          >
            {row?.id}
          </Link>
        </Stack>
      </TableCell>

      <TableCell align="left">
        <Typography variant="subtitle2" noWrap>
          {row?.title}
        </Typography>
      </TableCell>

      <TableCell align="left">{row?.location?.name}</TableCell>
      <TableCell align="left">{fDate(row?.createdAt)}</TableCell>

      {/* <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status === 'paid' && 'success') ||
            (status === 'unpaid' && 'warning') ||
            (status === 'overdue' && 'error') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label>
      </TableCell> */}

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onViewRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:eye-fill'} />
                View
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
