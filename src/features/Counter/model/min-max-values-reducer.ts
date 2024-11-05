import { AppDispatch } from '@/app/store';
import { getDefaultValues } from '../lib/getDefaultValues';
import { getLocalStorageRepo } from '@/common/repo/localstorage/localstorage';

const defaultValues = getDefaultValues();
const initialState = {
    ...defaultValues,
    initialMinValue: defaultValues.minValue,
};

type State = typeof initialState;

const repo = getLocalStorageRepo();
const STORED_VALUES = 'storedValues';

export const minMaxValuesReducer = (
    state: State = initialState,
    action: MinMaxValuesActions,
): State => {
    switch (action.type) {
        case 'COUNTER_VALUES/SET_MIN_MAX_VALUES': {
            return {
                ...action.payload,
                initialMinValue: action.payload.minValue,
            };
        }
        case 'COUNTER_VALUES/INCREMENT_MIN_VALUE': {
            return { ...state, minValue: state.minValue + 1 };
        }
        case 'COUNTER_VALUES/RESET_MIN_MAX_VALUES': {
            return { ...state, minValue: state.initialMinValue };
        }
        default:
            return state;
    }
};

export const setMinMaxValuesTC =
    (payload: { minValue: number; maxValue: number }) =>
    (dispatch: AppDispatch) => {
        repo.setItem(STORED_VALUES, payload);
        dispatch(setMinMaxValuesAC(payload));
    };

export const setMinMaxValuesAC = (payload: {
    minValue: number;
    maxValue: number;
}) => {
    return {
        type: 'COUNTER_VALUES/SET_MIN_MAX_VALUES' as const,
        payload,
    };
};

export const incrementMinValueAC = () => {
    return {
        type: 'COUNTER_VALUES/INCREMENT_MIN_VALUE' as const,
    };
};

export const resetMinMaxValuesAC = () => {
    return {
        type: 'COUNTER_VALUES/RESET_MIN_MAX_VALUES' as const,
    };
};

export type SetMinMaxValuesActionType = ReturnType<typeof setMinMaxValuesAC>;
export type IncrementMinValueActionType = ReturnType<
    typeof incrementMinValueAC
>;
export type ResetMinMaxValuesActionType = ReturnType<
    typeof resetMinMaxValuesAC
>;

export type MinMaxValuesActions =
    | SetMinMaxValuesActionType
    | IncrementMinValueActionType
    | ResetMinMaxValuesActionType;
