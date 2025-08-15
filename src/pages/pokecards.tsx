import { useState, useEffect } from "react"
import Header from "./sections/header"
import Pagination from "./components/pagination";
import PokeCard from "./components/pokeCard";
import PokePagination from "./components/pagination";
import ModalComponent from "./sections/pokeInfo";

export default function Pokecards() {
    const [allPokemon, setAllPokemon] = useState<PokemonInfo[]>([])
    const [pokemon, setPokemon] = useState<PokemonInfo[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(12);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(false);
    const handleClose = () => setOpen(true);
    const [name, setName] = useState("");

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

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000000`)
            .then(response => response.json())
            .then(data => {
                setAllPokemon(data.results);
                console.log('All poke : ', data.results.length);
                setTotalPages(Math.ceil(data.count / pageSize));
                console.log('Total page: ', Math.ceil(data.count / pageSize));
            })
    }, []);

    useEffect(() => {
        let pageOffset = (page-1) * 20;
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

    return (
        <div className="pokecards">
            <Header />
            <div className="container">
                <div className="input-field">
                    <input
                        type="text"
                        id="search"
                        name="pokemon"
                        list="pokemon"
                        placeholder="Search...."
                        onChange={(e)=>setSearch(e.target.value)}
                    />
                    {search.length > 2 && (
                        <datalist id="pokemon">
                            {allPokemon.map((item, index) => (
                                <option key={index}>{item.name}</option>
                            ))}
                        </datalist>
                    )}
                    <button>Search</button>
                </div>
                <div className="poke-list">
                    {pokemon.map((item, index) => {
                        const realIndex = (page-1) * 20 + index;
                        return (
                            <PokeCard
                                name={item.name}
                                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${realIndex + 1}.png`}
                                types={item.types}
                                setName={setName}
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
            {name && (
                <ModalComponent
                    name={name}
                    onClose={handleClose}
                />
            )}
            
        </div>
    )
}