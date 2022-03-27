import React, { SyntheticEvent, useEffect } from 'react';
import { Button, InputAdornment, Paper, Stack, TextField } from '@mui/material';
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
      >
        <TextField
          label="Search"
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
        />
        <LocationAutocomplete
          onChange={(e) => setLocation(e as string)}
          value={searchLocation}
          placeholder="Ciudad, departamento, pais"
          label="Ubicación"
          name="location"
        />
        <Button variant="contained" color="primary" size="large" type="submit">
          Search
        </Button>
      </Stack>
    </Paper>
  );
};

export default JobSearchForm;
