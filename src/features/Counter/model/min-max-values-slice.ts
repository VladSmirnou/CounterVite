import { AppDispatch } from '@/app/store';
import { getLocalStorageRepo } from '@/common/repo/localstorage/localstorage';
import { getDefaultValues } from '../lib/utils/getDefaultValues';
import { STORED_VALUES } from '../lib/constants/constants';
import { createSlice } from '@reduxjs/toolkit';
import { MinMaxValues } from '../lib/types/counter.types';
import { counterTypeChanged } from './common-actions';

const defaultValues = getDefaultValues();
const initialState = {
    ...defaultValues,
    initialMinValue: defaultValues.minValue,
};

const repo = getLocalStorageRepo();

const minMaxValuesSlice = createSlice({
    name: 'minMaxValues',
    initialState,
    reducers: (create) => ({
        minMaxValuesSet: create.reducer<MinMaxValues>((_, action) => {
            return {
                ...action.payload,
                initialMinValue: action.payload.minValue,
            };
        }),
        minValueIncremented: create.reducer((state) => {
            state.minValue++;
        }),
        minValueReset: create.reducer((state) => {
            state.minValue = state.initialMinValue;
        }),
    }),
    extraReducers: (builder) => {
        builder.addCase(counterTypeChanged, () => {
            return initialState;
        });
    },
    selectors: {
        selectMinMaxValues: (state) => state,
    },
});

export const minMaxValuesReducer = minMaxValuesSlice.reducer;
export const { minMaxValuesSet, minValueIncremented, minValueReset } =
    minMaxValuesSlice.actions;
export const minMaxValuesSliceName = minMaxValuesSlice.name;
export const { selectMinMaxValues } = minMaxValuesSlice.selectors;

export const setMinMaxValuesTC =
    (payload: { minValue: number; maxValue: number }) =>
    (dispatch: AppDispatch) => {
        repo.setItem(STORED_VALUES, payload);
        dispatch(minMaxValuesSet(payload));
    };

export type MinMaxValuesActions =
    | ReturnType<typeof minMaxValuesSet>
    | ReturnType<typeof minValueIncremented>
    | ReturnType<typeof minValueReset>;
