import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

type cardInfo = {
    name: string,
    image: string,
    types: PokemonType[],
    setName: (name:string) => void
}

  type PokemonType = {
    type: {
        name: string;
    };
};

export default function PokeCard({name, image, types}:cardInfo) {
    return (
        <Card className={`poke-card ${types?.[0].type.name}`} variant="outlined">
            <CardMedia
                component="img"
                image={image}
                alt={name}
            />
            <CardContent>
                <h4 className="card-title">{name}</h4>
            </CardContent>
        </Card>
    )
}