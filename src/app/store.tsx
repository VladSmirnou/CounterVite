import { getLocalStorageRepo } from '@/common/repo/localstorage/localstorage';
import { demarshallMinMaxValues } from '@/features/Counter/lib/utils/demarhsallMinMaxValues';
import {
    CounterStatusActions,
    counterStatusReducer,
} from '@/features/Counter/model/counter-status-reducer';
import {
    MinMaxValuesActions,
    minMaxValuesReducer,
} from '@/features/Counter/model/min-max-values-reducer';
import {
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore,
} from 'redux';
import { thunk, ThunkDispatch } from 'redux-thunk';
import { getDefaultValues } from '@/features/Counter/lib/utils/getDefaultValues';
import { CounterStatus } from '@/features/Counter/lib/enums/enums';
import { STORED_VALUES } from '@/features/Counter/lib/constants/constants';

const repo = getLocalStorageRepo();

const storedValues = repo.getItem(STORED_VALUES);

const minMaxValues = demarshallMinMaxValues(storedValues) || getDefaultValues();

const preloadedState = {
    status: 'idle' as CounterStatus,
    minMaxValues: {
        initialMinValue: minMaxValues.minValue,
        ...minMaxValues,
    },
};

const rootReducer = combineReducers({
    status: counterStatusReducer,
    minMaxValues: minMaxValuesReducer,
});

export const store = createStore(
    rootReducer,
    //@ts-expect-error dunno why it doesn't work when it should
    preloadedState,
    applyMiddleware(thunk),
);

export const getMinMaxValues = () => {
    const minMaxValues = store.getState().minMaxValues;
    const { initialMinValue, maxValue } = minMaxValues;
    return { minValue: initialMinValue, maxValue };
};

type AppActions = MinMaxValuesActions | CounterStatusActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
