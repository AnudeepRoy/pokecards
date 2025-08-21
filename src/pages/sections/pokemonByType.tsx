import { useEffect, useState } from "react"
import BoxElement from "../components/boxElement"
import Grid from '@mui/material/Grid';
import { Dispatch, SetStateAction } from "react";

type TypeInfo = {
    selectedType: string,
}

export default function PokemonByType({ selectedType }: TypeInfo) {
    const [pokemon, setPokemon] = useState([]);
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
        .then(res => res.json())
        .then(data => {
            setPokemon(data.pokemon)
        })
    }, [selectedType])
    return (
            pokemon.map((item, index) => (
                <Grid key={index} size={3}>
                    <BoxElement
                        name={item.pokemon.name}
                    />
                </Grid>
            ))
    )
}