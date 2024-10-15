import { SuperButton } from '@/common/components/SuperButton/SuperButton';
import { SettingsButtons } from '@/common/components/SettingsButtons/SettingsButtons';

export default {
    component: SettingsButtons,
    title: 'DisplayStandButtons',
};

export const InitialState = {
    args: {
        children: [
            <SuperButton key={0}>inc</SuperButton>,
            <SuperButton key={1} disabled>
                reset
            </SuperButton>,
        ],
    },
};

export const ValueChanged = {
    args: {
        children: [
            <SuperButton key={0}>inc</SuperButton>,
            <SuperButton key={1}>reset</SuperButton>,
        ],
    },
};

export const SettingsModeOn = {
    args: {
        children: [
            <SuperButton key={0} disabled>
                inc
            </SuperButton>,
            <SuperButton key={1} disabled>
                reset
            </SuperButton>,
        ],
    },
};

export const ErrorValue = {
    args: {
        children: [
            <SuperButton key={0} disabled>
                inc
            </SuperButton>,
            <SuperButton key={1} disabled>
                reset
            </SuperButton>,
        ],
    },
};
