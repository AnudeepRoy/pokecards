import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

type CardInfo = {
    name: string
}

export default function BoxElement({name}:CardInfo) {
    return (
            <Paper>
                <Box>
                    <Card variant="outlined">
                        <CardContent>
                            {name}
                        </CardContent>
                    </Card>
                </Box>
            </Paper>
        )
}