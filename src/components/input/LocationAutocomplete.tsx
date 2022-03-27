import React, { useEffect, SyntheticEvent } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LocationOn } from '@mui/icons-material';

import { useMapboxLocationsQuery } from 'src/generated/graphql';
import { useDebounce } from 'src/hooks/useDebounce';
import gql from 'graphql-tag';
import InputAdornment from '@mui/material/InputAdornment';

interface LocationAutocompleteProps {
  onChange: (value: string | null) => void;
  value: string | null | undefined;
  label?: string;
  placeholder?: string;
  name?: string;
}

gql`
  query MapboxLocations($query: String) {
    mapboxLocations(query: $query) {
      id
      name
      latitude
      longitude
    }
  }
`;

export default function LocationAutocomplete({
  onChange,
  value,
  label,
  name,
  placeholder,
}: LocationAutocompleteProps) {
  const [locationQuery, setLocationQuery] = React.useState('');
  const [locations, setLocations] = React.useState<string[]>([]);
  const debouncedLocationQuery = useDebounce(locationQuery, 500);

  const { loading, data } = useMapboxLocationsQuery({
    variables: { query: debouncedLocationQuery as string },
  });

  useEffect(() => {
    const matchingLocations = data?.mapboxLocations?.length
      ? data?.mapboxLocations.map((location) => location.name)
      : [];
    setLocations(matchingLocations);
  }, [data?.mapboxLocations]);

  return (
    <Autocomplete
      loading={loading}
      disablePortal
      id="combo-box-demo"
      options={
        !locations.length && !!value
          ? [value]
          : locations.length && value && !locations.includes(value) && value !== ''
          ? [value, ...locations]
          : locations
      }
      fullWidth
      value={value}
      noOptionsText="No hay coincidencias"
      onChange={(event: SyntheticEvent<Element, Event>, newValue: string | null) => {
        onChange(newValue);
      }}
      onInputChange={(event, newValue) => {
        setLocationQuery(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          name={name}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
