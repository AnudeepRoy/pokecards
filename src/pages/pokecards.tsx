import { useState, useEffect } from "react"
import Header from "./sections/header"
import Pagination from "./components/pagination";
import PokeCard from "./components/pokeCard";
import PokePagination from "./components/pagination";
import ModalComponent from "./sections/pokeInfo";
import PokeFilters from "./sections/pokeFilters";

export default function Pokecards() {
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([])
    const [pokemon, setPokemon] = useState<PokemonInfo[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonInfo | null>(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(12);
    const [allTypes, setAllTypes] = useState<Type[]>([]);
    const [selectedType, setSelectedType] = useState<Type[]>([]);
    const [allRegions, setAllRegions] = useState<Region[]>([]);
    const [selectedRegion, setSelectedRegion] = useState<Region[]>([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(false);
    const handleClose = () => setOpen(true);
    const [name, setName] = useState("");
    const [isFilterSet, setIsFilterSet] = useState<Boolean>(false);

    type PokemonInfo = {
        name: string,
        image: string,
        types: PokemonType[],
    }

    type PokemonType = {
        type: {
            name: string;
            url: string;
        };
    };

    type Pokemon = {
        name: string,
        url: string;
    }

    type Type = {
        name: string,
        url: string;
    }

    type Region = {
        name: string,
        url: string;
    }

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000000`)
        .then(response => response.json())
        .then(data => {
            setAllPokemon(data.results);
            setTotalPages(Math.ceil(data.count / pageSize));
        })
    }, []);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/type')
        .then(response => response.json())
        .then(data => {
            setAllTypes(data.results);
        })
        fetch('https://pokeapi.co/api/v2/region')
        .then(response => response.json())
        .then(data => {
            setAllRegions(data.results);
        })
    })

    useEffect(() => {
        let pageOffset = (page-1) * pageSize;
        console.log('Page offset : ', pageOffset);
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${pageOffset}`)
        .then(res => res.json())
        .then(async data => {
            const detailed:any = await Promise.all(
                data.results.map(async (p:any) => {
                    const res = await fetch(p.url);
                    return res.json();
                })
            );
            setPokemon(detailed);
        });
    }, [page]);

    function filterList() {
        console.log('Triggered');
    }

    return (
        <div className="pokecards">
            <Header />
            <div className="container">
                <PokeFilters
                    allPokemon={allPokemon}
                    allTypes={allTypes}
                    allRegions={allRegions}
                    filterList={filterList}
                />
                <div className="poke-list">
                    {pokemon.map((item, index) => {
                        const realIndex = (page-1) * pageSize + index;
                        return (
                            <PokeCard
                                key={index}
                                name={item.name}
                                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${realIndex+1}.png`}
                                types={item.types}
                            />
                        )
                    })}
                </div>
                <PokePagination
                    count={totalPages}
                    page={page}
                    setPage={setPage}
                />
            </div>
                <ModalComponent
                    name={name}
                    onClose={handleClose}
                />
        </div>
    )
}