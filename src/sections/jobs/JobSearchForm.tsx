import React, { SyntheticEvent, useEffect } from 'react';
import { Button, Grid, InputAdornment, Paper, Stack, TextField } from '@mui/material';
import Search from '@mui/icons-material/Search';
import LocationAutocomplete from '../../components/input/LocationAutocomplete';

interface Props {
  onSubmit: ({ location, query }: { location: string; query: string }) => void;
  initialValues?: { location: string; query: string };
}

const JobSearchForm = ({ onSubmit, initialValues }: Props) => {
  const [searchLocation, setLocation] = React.useState<string>(initialValues?.location || '');
  const [searchQuery, setQuery] = React.useState<string>(initialValues?.query || '');

  useEffect(() => {
    if (initialValues && initialValues.location) {
      setLocation(initialValues.location);
    }

    if (initialValues && initialValues.query) {
      setQuery(initialValues.query);
    }
  }, [initialValues, initialValues?.location, initialValues?.query]);

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Stack
        spacing={2}
        component={'form'}
        onSubmit={(e: SyntheticEvent) => {
          e.preventDefault();
          onSubmit({ location: searchLocation, query: searchQuery });
        }}
        direction={{ xs: 'column', sm: 'row' }}
        // spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Búsqueda"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              placeholder="Titulo, industria, etc."
              onChange={(e) => setQuery(e.target.value)}
              value={searchQuery}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocationAutocomplete
              onChange={(e) => setLocation(e as string)}
              value={searchLocation}
              placeholder="Ciudad, departamento, pais"
              label="Ubicación"
              name="location"
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          sx={{ height: '56px' }}
        >
          Buscar
        </Button>
      </Stack>
    </Paper>
  );
};

export default JobSearchForm;
