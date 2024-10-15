import { Header } from '@/common/components/Header/Header';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

function App() {
    return (
        <Box sx={{ backgroundColor: '#292c35', height: '100vh' }}>
            <CssBaseline enableColorScheme />
            <Header />
            <Outlet />
        </Box>
    );
}

export default App;
