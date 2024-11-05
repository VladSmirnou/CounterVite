import { FieldValuesValidator } from '@/features/Counter/lib/interfaces/fieldValueValidator';
import { useEffect } from 'react';
import { AltCounter } from './CounterSpecies/AltCounter/AltCounter';
import { BasicCounter } from './CounterSpecies/BasicCounter/BasicCounter';

type Props = {
    fieldValuesValidator: FieldValuesValidator;
    validateFieldValue: (value: string) => boolean;
    CounterType: typeof BasicCounter | typeof AltCounter;
};

export const Counter = (props: Props) => {
    const { fieldValuesValidator, validateFieldValue, CounterType } = props;
    useEffect(() => {
        const root = document.getElementById('root') as HTMLElement;
        root.style.backgroundColor = '#292c35';
        return () => {
            root.style.backgroundColor = 'white';
        };
    }, []);

    return (
        <CounterType
            fieldValuesValidator={fieldValuesValidator}
            validateFieldValue={validateFieldValue}
        />
    );
};
