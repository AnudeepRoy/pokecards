import { useState, useEffect } from "react"
import { Pagination } from "@mui/material"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Header from "./sections/header";
import BoxElement from "./components/boxElement";
import PokePagination from "./components/pagination";
import PokeFilters from "./sections/pokeFilters";
import PokemonByName from "./sections/pokemonByName";
import PokemonByType from "./sections/pokemonByType";
import PokemonByRegion from "./sections/pokemonByRegion";



export default function PokeCards() {

    type Pokemon = {
        name: string,
        url: string
    }

    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [pageSize, setPageSize] = useState(100);
    const [offset, setOffset] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    //Filter variables
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
    const [allTypes, setAllTypes] = useState<Pokemon[]>([]);
    const [allRegions, setAllRegions] = useState<Pokemon[]>([]);
    const [isFilterSet, setIsFilterSet] = useState<Boolean>(false);
    const [selectedPokemon, setSelectedPokemon] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedRegion, setSelectedRegion] = useState<string>('');

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=1500`)
        .then(res => res.json())
        .then(data => setAllPokemon(data.results))
        
        fetch(`https://pokeapi.co/api/v2/type`)
        .then(res => res.json())
        .then(data => setAllTypes(data.results));
        
        fetch(`https://pokeapi.co/api/v2/region`)
        .then(res => res.json())
        .then(data => setAllRegions(data.results));
    }, [])

    useEffect(() => {
        let pageOffset = (page - 1) * pageSize;
        let endpoint: string = '';
        if (!isFilterSet) {
            endpoint = `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${pageOffset}`;
            fetch(endpoint)
            .then(res => res.json())
            .then(data => {
                setPokemon(data.results);
                setLoading(false);
                setTotalPages(Math.ceil(data.count / pageSize));
            })
        }
    }, [page, isFilterSet]);

    return (
        <div className="pokecards">
            <div className="container">
                <p>Hello World</p>
                <PokeFilters
                    allPokemon={allPokemon}
                    allTypes={allTypes}
                    allRegions={allRegions}
                    setIsFilterSet={setIsFilterSet}
                    setSelectedPokemon={setSelectedPokemon}
                    setSelectedType={setSelectedType}
                    setSelectedRegion={setSelectedRegion}
                />
                {loading ? (
                    <p>Loading....</p>
                ) : (
                    <>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                {!isFilterSet ? (
                                    pokemon.map((item, index) => (
                                        <Grid key={index} size={3}>
                                            <BoxElement
                                                name={item.name}
                                            />
                                        </Grid>
                                    ))
                                ) : (
                                    selectedPokemon ? (
                                        <PokemonByName
                                            selectedPokemon={selectedPokemon}
                                            setTotalPages={setTotalPages}
                                        />
                                    ) : (
                                        selectedType ? (
                                            <PokemonByType
                                                selectedType={selectedType}
                                            />
                                        ) : (
                                            <PokemonByRegion
                                                selectedRegion={selectedRegion}
                                                allRegions={allRegions}     
                                            />
                                        )
                                    )
                                )}
                            </Grid>
                        </Box>
                        {!isFilterSet && (
                            <PokePagination
                                count={totalPages}
                                page={page}
                                setPage={setPage}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}