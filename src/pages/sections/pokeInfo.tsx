import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';

type PokeNameProps = {
    name: string;
    onClose: () => void; // handle close from parent
};

type PokeInfo = {
    id: number;
    name: string;
};

export default function ModalComponent({ name, onClose }: PokeNameProps) {
    const [pokemon, setPokemon] = useState<PokeInfo | null>(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => {
            setPokemon({
                id: data.id,
                name: data.name,
            });
        });
    }, [name]);

    return (
        <Modal
            open={true}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="modal-content">
                {pokemon ? (
                    <>
                        <h2 id="modal-modal-title">{pokemon.name}</h2>
                        <figure>
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                                alt={pokemon.name}
                            />
                            <figcaption>Official Artwork</figcaption>
                        </figure>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </Modal>
    );
}
