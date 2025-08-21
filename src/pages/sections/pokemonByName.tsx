import { useEffect, useState } from "react"
import BoxElement from "../components/boxElement"
import Grid from '@mui/material/Grid';
import { Dispatch, SetStateAction } from "react";

type PokeInfo = {
    selectedPokemon: string,
    setTotalPages: Dispatch<SetStateAction<number>>
}

export default function PokemonByName({ selectedPokemon, setTotalPages }: PokeInfo) {

    const [pokemon, setPokemon] = useState<string>('');

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
        .then(res => res.json())
        .then(data => {
            setPokemon(data.name);
            setTotalPages(1);
        })
    }, [selectedPokemon])
    
    return (
        <Grid size={3}>
            <BoxElement
                name={pokemon}
            />
        </Grid>
    )
}