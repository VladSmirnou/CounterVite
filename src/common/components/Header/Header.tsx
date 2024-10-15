import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <AppBar position="fixed">
            <Container maxWidth={'xl'}>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        <Link to="/">Home</Link>
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
