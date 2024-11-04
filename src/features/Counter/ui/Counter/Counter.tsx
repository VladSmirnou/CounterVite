import { FieldValueValidator } from '@/app/interfaces/fieldValueValidator';
import { Repo } from '@/app/interfaces/repo';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useEffect } from 'react';
import { AltCounter } from './CounterSpecies/AltCounter/AltCounter';
import { BasicCounter } from './CounterSpecies/BasicCounter/BasicCounter';

type Props = {
    repo: Repo;
    fieldValueValidator: FieldValueValidator;
    CounterType: typeof BasicCounter | typeof AltCounter;
};

export const Counter = ({ repo, fieldValueValidator, CounterType }: Props) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const root = document.getElementById('root') as HTMLElement;
        root.style.backgroundColor = '#292c35';
        return () => {
            root.style.backgroundColor = 'white';
        };
    }, [repo, dispatch]);

    return <CounterType fieldValueValidator={fieldValueValidator} />;
};
