import { fieldValueValidator } from '@/features/Counter/lib/fieldValueValidator.ts';
import { Counter } from '@/features/Counter/ui/Counter/Counter.tsx';
import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from '../common/components/ErrorPage/ErrorPage.tsx';
import { AltCounter } from '../features/Counter/ui/Counter/CounterSpecies/AltCounter/AltCounter.tsx';
import { BasicCounter } from '../features/Counter/ui/Counter/CounterSpecies/BasicCounter/BasicCounter.tsx';
import { CounterPage } from '../features/Counter/ui/IntroPage/CounterPage.tsx';
import App from './App.tsx';
import { IntroPage } from './IntroPage.tsx';
import { Main } from './Main.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <Main />,
                children: [
                    {
                        index: true,
                        element: <IntroPage />,
                    },
                    {
                        path: 'counter',
                        element: <CounterPage />,
                    },
                    {
                        path: 'counter/basic',
                        element: (
                            <Counter
                                fieldValueValidator={fieldValueValidator}
                                CounterType={BasicCounter}
                            />
                        ),
                    },
                    {
                        path: 'counter/alt',
                        element: (
                            <Counter
                                fieldValueValidator={fieldValueValidator}
                                CounterType={AltCounter}
                            />
                        ),
                    },
                ],
            },
        ],
    },
]);
