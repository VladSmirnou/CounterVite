import { FieldValueValidator } from '@/features/Counter/lib/interfaces/fieldValueValidator';
import { useEffect } from 'react';
import { AltCounter } from './CounterSpecies/AltCounter/AltCounter';
import { BasicCounter } from './CounterSpecies/BasicCounter/BasicCounter';

type Props = {
    fieldValueValidator: FieldValueValidator;
    CounterType: typeof BasicCounter | typeof AltCounter;
};

export const Counter = ({ fieldValueValidator, CounterType }: Props) => {
    useEffect(() => {
        const root = document.getElementById('root') as HTMLElement;
        root.style.backgroundColor = '#292c35';
        return () => {
            root.style.backgroundColor = 'white';
        };
    });

    return <CounterType fieldValueValidator={fieldValueValidator} />;
};
