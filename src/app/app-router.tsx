import { fieldValuesValidator } from '@/features/Counter/lib/fieldValueValidator.ts';
import { validateFieldValue } from '@/features/Counter/lib/validators/fieldValueValidator/fieldValueValidator.ts';
import { Counter } from '@/features/Counter/ui/Counter/Counter.tsx';
import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from '../common/components/ErrorPage/ErrorPage.tsx';
import { AltCounter } from '../features/Counter/ui/Counter/CounterSpecies/AltCounter/AltCounter.tsx';
import { BasicCounter } from '../features/Counter/ui/Counter/CounterSpecies/BasicCounter/BasicCounter.tsx';
import { CounterPage } from '../features/Counter/ui/IntroPage/CounterPage.tsx';
import App from './App.tsx';
import { IntroPage } from './IntroPage.tsx';
import { Main } from './Main.tsx';

const appPath = {
    root: '/',
    counter: 'counter',
    basicCounter: 'counter/basic',
    altCounter: 'counter/alt',
};

export const router = createBrowserRouter([
    {
        path: appPath.root,
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
                        path: appPath.counter,
                        element: <CounterPage />,
                    },
                    {
                        path: appPath.basicCounter,
                        element: (
                            <Counter
                                fieldValuesValidator={fieldValuesValidator}
                                validateFieldValue={validateFieldValue}
                                CounterType={BasicCounter}
                            />
                        ),
                    },
                    {
                        path: appPath.altCounter,
                        element: (
                            <Counter
                                fieldValuesValidator={fieldValuesValidator}
                                validateFieldValue={validateFieldValue}
                                CounterType={AltCounter}
                            />
                        ),
                    },
                ],
            },
        ],
    },
]);
