import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export const CounterPage = () => {
    return (
        <Box>
            <Typography variant="h4" component={'h1'}>
                This is the main page of the Counter application
            </Typography>
            <Typography sx={{ marginTop: 3, marginBottom: 2 }}>
                This project has two different implementations, so feel free to
                play with both of them!
            </Typography>
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="basic" disableGutters>
                        <ListItemText primary="Basic" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="alt" disableGutters>
                        <ListItemText primary="Alternative" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
};
