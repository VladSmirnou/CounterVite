import { SuperButton } from '@/SuperButton';
import { SettingsButtons } from '@/SettingsButtons';

export default {
    component: SettingsButtons,
    title: 'SettingsStandButtons',
};

export const SettingsModeOn = {
    args: {
        children: [<SuperButton key={0}>set</SuperButton>],
    },
};

export const SettingsModeOff = {
    args: {
        children: [
            <SuperButton key={0} disabled>
                set
            </SuperButton>,
        ],
    },
};

export const ErrorValue = {
    args: {
        children: [
            <SuperButton key={0} disabled>
                set
            </SuperButton>,
        ],
    },
};
