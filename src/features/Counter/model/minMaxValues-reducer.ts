import { AppDispatch } from '@/app/store';
import { getDefaultValues } from '../lib/getDefaultValues';
import { MinMaxValues } from '../lib/types/counter.types';
import { getLocalStorageRepo } from '@/common/repo/localstorage/localstorage';

const initialState = getDefaultValues();
const repo = getLocalStorageRepo();
const STORED_VALUES = 'storedValues';

export const minMaxValuesReducer = (
    state: MinMaxValues = initialState,
    action: MinMaxValuesActions,
): MinMaxValues => {
    switch (action.type) {
        case 'SET_MIN_MAX_VALUES': {
            return action.payload;
        }
        default:
            return state;
    }
};

export const setMinMaxValuesAC = (payload: MinMaxValues) => {
    return {
        type: 'SET_MIN_MAX_VALUES',
        payload,
    } as const;
};

export const setMinMaxValuesTC = (payload: MinMaxValues) => {
    return (dispatch: AppDispatch) => {
        dispatch(setMinMaxValuesAC(payload));
        repo.setItem(STORED_VALUES, payload);
    };
};

export type SetMinMaxValues = ReturnType<typeof setMinMaxValuesAC>;

export type MinMaxValuesActions = SetMinMaxValues;
