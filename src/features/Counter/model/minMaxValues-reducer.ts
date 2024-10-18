import { getDefaultValues } from '../lib/getDefaultValues';
import { MinMaxValues } from '../lib/types/counter.types';

const initialState = getDefaultValues();

export const minMaxValuesReducer = (
    state: MinMaxValues = initialState,
    action: MinMaxValuesAction,
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
    };
};

type SetMinMaxValues = ReturnType<typeof setMinMaxValuesAC>;

type MinMaxValuesAction = SetMinMaxValues;
