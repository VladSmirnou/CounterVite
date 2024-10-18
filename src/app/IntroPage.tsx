import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export const IntroPage = () => {
    return (
        <Box>
            <Typography variant="h4" component={'h1'}>
                Hello there! My name is ..., and I&apos;m developing stuff!
            </Typography>
            <Typography
                variant="body1"
                component={'h2'}
                sx={{ marginTop: 3, marginBottom: 2 }}
            >
                Here you can check all the projects that I&apos;ve created so
                far:
            </Typography>
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        component={Link}
                        to={'counter'}
                        disableGutters
                    >
                        <ListItemText primary="Counter" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
};
