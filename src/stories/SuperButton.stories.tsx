import { SuperButton } from '@/SuperButton';

export default {
    component: SuperButton,
    title: 'SuperButton',
    tags: ['autodocs'],
};

export const Active = {
    args: {
        disabled: false,
        children: 'set',
    },
};

export const Disabled = {
    args: {
        disabled: true,
        children: 'set',
    },
};
