import { RootState } from '@/app/store';

export const selectSettingsMode = (state: RootState) => {
    return state.settingsMode;
};
