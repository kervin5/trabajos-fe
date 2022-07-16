import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Progress(theme: Theme) {
  const isLight = theme.palette.mode === 'light';
  const backgroundColor = theme.palette.primary?.[isLight ? 'lighter' : 'darker'];

  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          overflow: 'hidden',
        },
        bar: {
          borderRadius: 4,
        },
        colorPrimary: {
          backgroundColor,
        },
        buffer: {
          backgroundColor: 'transparent',
        },
      },
    },
  };
}
