import { FieldValuesValidator } from '@/features/Counter/lib/interfaces/fieldValueValidator';
import { useEffect } from 'react';
import { AltCounter } from './CounterSpecies/AltCounter/AltCounter';
import { BasicCounter } from './CounterSpecies/BasicCounter/BasicCounter';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { resetStoreAC } from '../../model/common-actions';

type Props = {
    fieldValuesValidator: FieldValuesValidator;
    validateFieldValue: (value: string) => boolean;
    CounterType: typeof BasicCounter | typeof AltCounter;
};

export const Counter = (props: Props) => {
    const dispatch = useAppDispatch();

    const { fieldValuesValidator, validateFieldValue, CounterType } = props;
    useEffect(() => {
        const root = document.getElementById('root') as HTMLElement;
        root.style.backgroundColor = '#292c35';
        return () => {
            root.style.backgroundColor = 'white';
            dispatch(resetStoreAC());
        };
    }, [dispatch]);

    return (
        <CounterType
            fieldValuesValidator={fieldValuesValidator}
            validateFieldValue={validateFieldValue}
        />
    );
};
