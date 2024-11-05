import { RootState } from '@/app/store';

export const selectMinMaxValues = (state: RootState) => {
    return state.minMaxValues;
};
