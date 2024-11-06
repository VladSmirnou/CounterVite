import { CounterStatus } from '../lib/enums/enums';
import { ResetStoreActionType } from './common-actions';

const initialState = 'idle' as CounterStatus;

export const counterStatusReducer = (
    state: CounterStatus = initialState,
    action: CounterStatusActions,
): CounterStatus => {
    switch (action.type) {
        case 'COUNTER_STATUS/SET_STATUS': {
            return action.payload;
        }
        case 'RESET_STORE': {
            return CounterStatus.IDLE;
        }
        default:
            return state;
    }
};

export const setCounterStatusAC = (status: CounterStatus) => {
    return {
        type: 'COUNTER_STATUS/SET_STATUS' as const,
        payload: status,
    };
};

type SetCounterStatusActionType = ReturnType<typeof setCounterStatusAC>;

export type CounterStatusActions =
    | SetCounterStatusActionType
    | ResetStoreActionType;
