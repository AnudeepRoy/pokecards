import { useEffect, useState } from "react"
import BoxElement from "../components/boxElement"
import Grid from '@mui/material/Grid';

type RegionInfo = {
    selectedRegion: string,
    allRegions: Region[],
}

type Region = {
    name: string,
    url: string
}

export default function PokemonByRegion({ selectedRegion, allRegions }: RegionInfo) {
    const [pokemon, setPokemon] = useState<Region[]>([]);

    useEffect(() => {
        let regions = [];
        for (var i = 0; i < allRegions.length; i++) {
            regions.push(allRegions[i].name)
        }
        let thisRegion = regions.indexOf(selectedRegion);
        thisRegion += 1;
        let endpoint = `https://pokeapi.co/api/v2/generation/${thisRegion}`
        fetch(endpoint)
            .then(res => res.json())
            .then(data => {
            setPokemon(data.pokemon_species)
        })
    }, [selectedRegion])

    return (
        pokemon.map((item, index) => (
            <Grid key={index} size={3}>
                <BoxElement
                    name={item.name}
                />
            </Grid>
        ))
    )
}