import { getLocalStorageRepo } from '@/common/repo/localstorage/localstorage';
import { STORED_VALUES } from '@/features/Counter/lib/constants/constants';
import { CounterStatus } from '@/features/Counter/lib/enums/enums';
import { demarshallMinMaxValues } from '@/features/Counter/lib/utils/demarhsallMinMaxValues';
import { getDefaultValues } from '@/features/Counter/lib/utils/getDefaultValues';
import { counterStatusReducer } from '@/features/Counter/model/counter-status-slice';
import { minMaxValuesReducer } from '@/features/Counter/model/min-max-values-slice';
import { configureStore } from '@reduxjs/toolkit';
import { MinMaxValuesActions } from '@/features/Counter/model/min-max-values-slice';
import { CounterStatusSliceActions } from '@/features/Counter/model/counter-status-slice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { CommonActionTypes } from '@/features/Counter/model/common-actions';
import { counterStatusSliceName } from '@/features/Counter/model/counter-status-slice';
import { minMaxValuesSliceName } from '@/features/Counter/model/min-max-values-slice';

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

export const store = configureStore({
    reducer: {
        [counterStatusSliceName]: counterStatusReducer,
        [minMaxValuesSliceName]: minMaxValuesReducer,
    },
    preloadedState,
});

export const getMinMaxValues = () => {
    const minMaxValues = store.getState().minMaxValues;
    const { initialMinValue, maxValue } = minMaxValues;
    return { minValue: initialMinValue, maxValue };
};

type AppActions =
    | CounterStatusSliceActions
    | MinMaxValuesActions
    | CommonActionTypes;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
