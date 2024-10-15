import { Display } from '@/Display';
import { ValuePanel } from '@/ValuePannel';
import { fn } from '@storybook/test';
import s from '../Display.module.css';

export default {
    component: Display,
    title: 'Display',
    tags: ['autodocs'],
};

export const WithFields = {
    args: {
        children: [
            <ValuePanel
                key={0}
                initialValue={5}
                labelText={'Max'}
                errorText={null}
                fieldName={'max'}
                valueIsValid={fn()}
            />,
            <ValuePanel
                key={1}
                initialValue={0}
                labelText={'Min'}
                errorText={null}
                fieldName={'min'}
                valueIsValid={fn()}
            />,
        ],
    },
};

export const MaxFieldInvalid = {
    args: {
        children: [
            <ValuePanel
                key={0}
                initialValue={2}
                labelText={'Max'}
                errorText={'error'}
                fieldName={'max'}
                valueIsValid={fn()}
            />,
            <ValuePanel
                key={1}
                initialValue={3}
                labelText={'Min'}
                errorText={null}
                fieldName={'min'}
                valueIsValid={fn()}
            />,
        ],
    },
};

export const MinFieldInvalid = {
    args: {
        children: [
            <ValuePanel
                key={0}
                initialValue={2}
                labelText={'Max'}
                errorText={null}
                fieldName={'max'}
                valueIsValid={fn()}
            />,
            <ValuePanel
                key={1}
                initialValue={3}
                labelText={'Min'}
                errorText={'error'}
                fieldName={'min'}
                valueIsValid={fn()}
            />,
        ],
    },
};

export const BothFieldsInvalid = {
    args: {
        children: [
            <ValuePanel
                key={0}
                initialValue={1}
                labelText={'Min'}
                errorText={'error'}
                fieldName={'min'}
                valueIsValid={fn()}
            />,
            <ValuePanel
                key={1}
                initialValue={1}
                labelText={'Max'}
                errorText={'error'}
                fieldName={'max'}
                valueIsValid={fn()}
            />,
        ],
    },
};

export const MaxCounterValueNotReached = {
    args: {
        children: <p>5</p>,
    },
};

export const MaxCounterValueReached = {
    args: {
        children: <p className={s.displayInvalidValue}>5</p>,
    },
};

export const SettingsModeOn = {
    args: {
        children: <p>enter values and press &quot;set&quot;</p>,
    },
};

export const SettingsModeOnAndError = {
    args: {
        children: <p className={s.displayInvalidValue}>Incorrect value!</p>,
    },
};
