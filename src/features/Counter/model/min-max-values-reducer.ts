import { AppDispatch } from '@/app/store';
import { getLocalStorageRepo } from '@/common/repo/localstorage/localstorage';
import { getDefaultValues } from '../lib/utils/getDefaultValues';
import { ResetStoreActionType } from './common-actions';
import { STORED_VALUES } from '../lib/constants/constants';

const defaultValues = getDefaultValues();
const initialState = {
    ...defaultValues,
    initialMinValue: defaultValues.minValue,
};

type State = typeof initialState;

const repo = getLocalStorageRepo();

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
        case 'COUNTER_VALUES/RESET_MIN_VALUE': {
            return { ...state, minValue: state.initialMinValue };
        }
        case 'RESET_STORE': {
            return initialState;
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

export const resetMinValueAC = () => {
    return {
        type: 'COUNTER_VALUES/RESET_MIN_VALUE' as const,
    };
};

export type SetMinMaxValuesActionType = ReturnType<typeof setMinMaxValuesAC>;
export type IncrementMinValueActionType = ReturnType<
    typeof incrementMinValueAC
>;
export type ResetMinMaxValuesActionType = ReturnType<typeof resetMinValueAC>;
export type MinMaxValuesActions =
    | SetMinMaxValuesActionType
    | IncrementMinValueActionType
    | ResetMinMaxValuesActionType
    | ResetStoreActionType;
