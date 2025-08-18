import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import CardActionArea from '@mui/material/CardActionArea';

type cardInfo = {
    name: string,
    image: string,
    types: PokemonType[],
}

type PokemonType = {
    type: {
        name: string;
    };
};

export default function PokeCard({name, image, types}:cardInfo) {
    return (
        <Box className={`poke-card ${types?.[0].type.name}`}>
            <Paper elevation={2} className="paper">
                <Card variant="outlined">
                    <CardContent>
                        <CardMedia
                            component="img"
                            image={image}
                            alt={name}
                        />
                        
                        <h4 className="card-title">{name}</h4>
                        </CardContent>
                    </Card>
                </Paper>
        </Box>
    )
}