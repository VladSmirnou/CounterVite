import { RootState } from '@/app/store';

export const selectCounterStatus = (state: RootState) => state.status;
