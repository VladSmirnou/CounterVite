import { createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { Main } from './Main.tsx';
import { IntroPage } from './IntroPage.tsx';
import { ErrorPage } from '../common/components/ErrorPage/ErrorPage.tsx';
import { AltCounter } from '../features/Counter/ui/Counter/CounterSpecies/AltCounter/AltCounter.tsx';
import { BasicCounter } from '../features/Counter/ui/Counter/CounterSpecies/BasicCounter/BasicCounter.tsx';
import { CounterPage } from '../features/Counter/ui/IntroPage/CounterPage.tsx';
import { FieldNames } from '@/common/enums/enums';
import { getLocalStorageRepo } from '@/common/repo/localstorage/localstorage';
import { ValueValidator } from '@/common/validators/FieldValueValidator/fieldValueValidator';
import { ValidateBoth } from '@/common/validators/FieldValueValidator/validators/validateBoth';
import { ValidateMax } from '@/common/validators/FieldValueValidator/validators/validateMax';
import { ValidateMin } from '@/common/validators/FieldValueValidator/validators/validateMin';
import { Counter } from '@/features/Counter/ui/Counter/Counter.tsx';

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

const repo = getLocalStorageRepo();

export const router = createBrowserRouter([
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
                            <Counter
                                repo={repo}
                                fieldValueValidator={validator}
                                CounterType={BasicCounter}
                            />
                        ),
                    },
                    {
                        path: 'counter/alt',
                        element: (
                            <Counter
                                repo={repo}
                                fieldValueValidator={validator}
                                CounterType={AltCounter}
                            />
                        ),
                    },
                ],
            },
        ],
    },
]);
