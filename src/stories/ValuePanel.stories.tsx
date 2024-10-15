import { ValuePanel } from '@/features/Counter/ui/CounterSettingsStand/ValuePanel/ValuePannel';
import { fn } from '@storybook/test';

export const ActionsData = {
    valueIsValid: fn(),
};

export default {
    component: ValuePanel,
    title: 'ValuePanel',
    tags: ['autodocs'],
    excludeStories: /.*Data$/,
    args: {
        ...ActionsData,
    },
};

export const ValueIsValid = {
    args: {
        initialValue: 0,
        labelText: 'Min',
        errorText: '',
        fieldName: 'min',
    },
};

export const ValueIsInvalid = {
    args: {
        initialValue: 0,
        labelText: 'Min',
        errorText: 'error',
        fieldName: 'min',
    },
};
