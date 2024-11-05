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
import { getDefaultValues } from '@/features/Counter/lib/getDefaultValues';
import { CounterStatus } from '@/features/Counter/lib/enums/enums';

const STORED_VALUES = 'storedValues';
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

// when I go to another counter's link in the browser,
// it is considered as an initial load (the whole app is destroyed)
// (even when pressing browser history arrows)

// when I to the 'home' page, then my components are unmounting,
// but the store is not deleted.

export const getMinMaxValues = () => {
    const minMaxValues = store.getState().minMaxValues;
    // get initial min value from the store when user swaps counters
    const { initialMinValue, maxValue } = minMaxValues;
    return { minValue: initialMinValue, maxValue };
};

type AppActions = MinMaxValuesActions | CounterStatusActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
