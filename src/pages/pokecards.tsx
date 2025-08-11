import { useState, useEffect } from "react"
import Header from "./sections/header"

export default function Pokecards() {

    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=386')
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
    }, []);

    return (
        <div className="pokecards">
            <Header />
            <div className="container">
                <div className="input-field">
                    <input type="text" id="search" name="pokemon" list="pokemon" placeholder="Search...." />
                    <datalist id="pokemon">
                        {pokemon.map((item, index) => (
                            <option key={index}>{item.name}</option>
                        ))}
                    </datalist>
                    <button>Search</button>
                </div>
                <div className="poke-list">
                    {pokemon.map((item, index) => (
                        <div key={index} className={`poke-card ${item.types?.[0].type.name}`}>
                            <h4>{item.name}</h4>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={item.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}