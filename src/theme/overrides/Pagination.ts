import { alpha, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Pagination(theme: Theme) {
  return {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            fontWeight: theme.typography.fontWeightBold,
          },
        },
        textPrimary: {
          '&.Mui-selected': {
            color: theme.palette.primary?.main,
            backgroundColor:
              theme.palette.primary?.main && alpha(theme.palette.primary?.main, 0.08),
            '&:hover, &.Mui-focusVisible': {
              backgroundColor: `${
                theme.palette.primary?.main ? alpha(theme.palette.primary?.main, 0.24) : '#fff'
              } !important`,
            },
          },
        },
        outlined: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
        },
        outlinedPrimary: {
          '&.Mui-selected': {
            backgroundColor:
              theme.palette.primary?.main && alpha(theme.palette.primary?.main, 0.08),
            border:
              theme.palette.primary?.main &&
              `1px solid ${alpha(theme.palette.primary?.main, 0.24)}`,
          },
        },
      },
    },
  };
}
