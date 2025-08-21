import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

type PokeNameProps = {
    name: string;
    onClose: () => void; // handle close from parent
};

type PokeInfo = {
    id: number;
    name: string;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function ModalComponent({ name, onClose }: PokeNameProps) {
    const [pokemon, setPokemon] = useState<PokeInfo | null>(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
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
            </Box>
        </Modal>
    );
}
