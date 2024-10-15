import App from './app/App.tsx';
import { FieldNames } from '@/common/enums/enums';
import { LocalStorageRepo } from '@/common/repo/localstorage/localstorage';
import { ValueValidator } from '@/common/validators/FieldValueValidator/fieldValueValidator';
import { ValidateBoth } from '@/common/validators/FieldValueValidator/validators/validateBoth';
import { ValidateMax } from '@/common/validators/FieldValueValidator/validators/validateMax';
import { ValidateMin } from '@/common/validators/FieldValueValidator/validators/validateMin';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main } from './app/Main.tsx';
import { CounterPage } from './app/pages/Counter.tsx';
import { IntroPage } from './app/pages/Intro.tsx';
import { ErrorPage } from './common/components/ErrorPage/ErrorPage.tsx';
import { AltCounter } from './features/Counter/ui/AltCounter/AltCounter.tsx';
import { BasicCounter } from './features/Counter/ui/BasicCounter/BasicCounter.tsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const MIN_ALLOWED_VALUE = 0;

const validator = new ValueValidator([
    new ValidateBoth(FieldNames.BOTH, 'Min value cannot be equal to max value'),
    new ValidateMin(
        FieldNames.MIN,
        MIN_ALLOWED_VALUE,
        `Min value cannot be less than ${MIN_ALLOWED_VALUE}`,
    ),
    new ValidateMax(FieldNames.MAX, 'Max value cannot be less than min value'),
]);

const repo = new LocalStorageRepo();

const theme = createTheme({
    components: {
        MuiPaper: {
            variants: [
                {
                    props: {
                        variant: 'outlined',
                    },
                    style: {
                        borderColor: '#5ed1f5',
                        borderWidth: 3,
                        borderRadius: 10,
                        backgroundColor: '#292c35',
                    },
                },
            ],
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        backgroundColor: '#3e6d7e',
                    },
                },
            },
            variants: [
                {
                    props: {
                        variant: 'contained',
                    },
                    style: {
                        backgroundColor: '#5ed1f5',
                        color: 'black',
                        fontWeight: 900,
                        fontSize: 20,
                    },
                },
            ],
        },
    },
});

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Main />,
                children: [
                    {
                        path: '/',
                        element: <IntroPage />,
                    },
                    {
                        path: 'counter',
                        element: <CounterPage />,
                    },
                    {
                        path: 'counter/basic',
                        element: (
                            <BasicCounter
                                repo={repo}
                                fieldValueValidator={validator}
                            />
                        ),
                    },
                    {
                        path: 'counter/alt',
                        element: (
                            <AltCounter
                                repo={repo}
                                fieldValueValidator={validator}
                            />
                        ),
                    },
                ],
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
    </ThemeProvider>,
);
