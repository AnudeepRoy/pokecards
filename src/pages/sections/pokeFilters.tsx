import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Dispatch, SetStateAction } from 'react';

type Pokemon = {
  name: string;
  url: string;
};

type PokeFiltersProps = {
    allPokemon: Pokemon[];
    allTypes: Pokemon[];
    allRegions: Pokemon[];
    setIsFilterSet: Dispatch<SetStateAction<Boolean>>;
    setSelectedPokemon: Dispatch<SetStateAction<string>>
    setSelectedType: Dispatch<SetStateAction<string>>
    setSelectedRegion: Dispatch<SetStateAction<string>>
};

export default function PokeFilters({ allPokemon, allTypes, allRegions, setIsFilterSet, setSelectedPokemon, setSelectedType, setSelectedRegion }: PokeFiltersProps) {
  return (
      <Box sx={{ flexGrow: 1 }} className="filters">
          <Grid container spacing={2}>
            <Grid size={{ xs: 3, md: 3 }}>
                <Autocomplete
                    disablePortal
                    onChange={(event, newValue) => {
                        if (newValue) {
                            setIsFilterSet(true);
                            setSelectedType('');
                            setSelectedRegion('');
                            setSelectedPokemon(newValue.name);
                        };
                    }}
                    options={allPokemon}
                    getOptionLabel={(option) => option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                    renderInput={(params) => <TextField {...params} label="Pokemon" />}
                />
            </Grid>
            <Grid size={{ xs: 3, md: 3 }}>
                <Autocomplete
                    disablePortal
                    onChange={(event, newValue) => {
                    if (newValue) {
                        setIsFilterSet(true);
                        setSelectedPokemon('');
                        setSelectedRegion('');
                        setSelectedType(newValue.name);
                    };
                    }}
                    options={allTypes}
                    getOptionLabel={(option) => option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                    renderInput={(params) => <TextField {...params} label="Types" />}
                />
            </Grid>
            <Grid size={{ xs: 3, md: 3 }}>
                <Autocomplete
                    disablePortal
                    onChange={(event, newValue) => {
                    if (newValue) {
                        setIsFilterSet(true);
                        setSelectedPokemon('');
                        setSelectedType('');
                        setSelectedRegion(newValue.name);
                    };
                    }}
                    options={allRegions}
                    getOptionLabel={(option) => option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                    renderInput={(params) => <TextField {...params} label="Regions" />}
                />
              </Grid>
              <Grid size={{ xs: 3, md: 3 }}>
                  <Button
                      variant="outlined"
                      color='error'
                      onClick={() => {
                          setIsFilterSet(false);
                      }}
                    >
                      Clear
                  </Button>
              </Grid>
        </Grid>
    </Box>
  );
}
