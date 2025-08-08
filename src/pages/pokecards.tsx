import { useState, useEffect } from "react"
import Header from "./sections/header"

export default function Pokecards() {

    const [pokemon, setPokemon] = useState('');
    const [loading, setLoading] = useState(true);
    const [pokeId, setPokeId] = useState('');
    const endpoint = `https://api.pokemontcg.io/v2/cards`;

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('X-Api-Key', process.env.REACT_APP_API_KEY as string);

    const requestOptions:any = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    useEffect(() => {
        fetch(`${endpoint}/base1-4`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setPokemon(data.data.name);
                setLoading(false);
            })
             .catch((error) => {
                console.error("Error fetching card:", error);
                setLoading(false); // ✅ Also handle loading on error
            });
    }, [])

    return (
        <div className="pokecards">
            <Header />
            {loading ? (
                <p>Loading</p>
            ): (
                pokemon && <p>{pokemon}</p>
            )}
        </div>
    )
}