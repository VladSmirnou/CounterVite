import { SuperButton } from '@/common/components/SuperButton/SuperButton';
import { SettingsButtons } from '@/common/components/SettingsButtons/SettingsButtons';

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
