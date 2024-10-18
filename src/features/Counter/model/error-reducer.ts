import { ErrorData } from '@/common/types/app.types';

export const errorReducer = (
    state: ErrorData | null,
    action: Action,
): ErrorData | null => {
    switch (action.type) {
        case 'SET_ERROR_DATA': {
            return action.payload;
        }
        case 'SET_ERROR_NULL': {
            return action.payload;
        }
        default:
            return state;
    }
};

export const setErrorDataAC = (payload: ErrorData) => {
    return {
        type: 'SET_ERROR_DATA',
        payload,
    };
};

export const setErrorNullAC = () => {
    return {
        type: 'SET_ERROR_NULL',
        payload: null,
    };
};

type SetErrorDataActionType = ReturnType<typeof setErrorDataAC>;
type SetErrorNullActionType = ReturnType<typeof setErrorNullAC>;

type Action = SetErrorDataActionType | SetErrorNullActionType;
