import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

export const Main = () => {
    return (
        <Container maxWidth={'xl'} sx={{ paddingTop: 15 }}>
            <Outlet />
        </Container>
    );
};
