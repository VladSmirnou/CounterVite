import { RootState } from '@/app/store';

export const selectErrorData = (state: RootState) => {
    return state.error;
};
