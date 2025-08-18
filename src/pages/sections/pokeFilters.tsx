import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';

type Pokemon = {
  name: string;
  url: string;
};

type PokeFiltersProps = {
    allPokemon: Pokemon[];
    allTypes: Pokemon[];
    allRegions: Pokemon[];
};

export default function PokeFilters({ allPokemon, allTypes, allRegions }: PokeFiltersProps, {filterList}) {
  return (
      <Box sx={{ flexGrow: 1 }} className="filters">
          <Grid container spacing={2}>
            <Grid size={{ xs: 4, md: 4 }}>
                <Autocomplete
                    disablePortal
                    options={allPokemon}
                    getOptionLabel={(option) => option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                    renderInput={(params) => <TextField {...params} label="Pokemon" />}
                />
            </Grid>
            <Grid size={{ xs: 4, md: 4 }}>
                <Autocomplete
                    disablePortal
                    options={allTypes}
                    getOptionLabel={(option) => option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                    renderInput={(params) => <TextField {...params} label="Types" />}
                />
            </Grid>
            <Grid size={{ xs: 4, md: 4 }}>
                <Autocomplete
                    disablePortal
                    options={allRegions}
                    getOptionLabel={(option) => option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                    renderInput={(params) => <TextField {...params} label="Regions" />}
                />
            </Grid>
        </Grid>
    </Box>
  );
}
