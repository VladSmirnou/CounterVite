import { ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './app/store.tsx';
import { theme } from './common/theme/theme.ts';
import { router } from './app/app-router.tsx';

createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </ThemeProvider>,
);
