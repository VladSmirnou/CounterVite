import { FieldValueValidator } from '@/app/interfaces/fieldValueValidator';
import { Repo } from '@/app/interfaces/repo';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { useEffect } from 'react';
import { demarshallMinMaxValues } from '../../lib/demarhsallMinMaxValues';
import { getDefaultValues } from '../../lib/getDefaultValues';
import { selectErrorData } from '../../model/errorSelector';
import { setMinMaxValuesAC } from '../../model/minMaxValues-reducer';
import { selectMinMaxValues } from '../../model/minMaxValuesSelector';
import { selectSettingsMode } from '../../model/settingsModeSelecor';
import { AltCounter } from './CounterSpecies/AltCounter/AltCounter';
import { BasicCounter } from './CounterSpecies/BasicCounter/BasicCounter';

type Props = {
    repo: Repo;
    fieldValueValidator: FieldValueValidator;
    CounterType: typeof BasicCounter | typeof AltCounter;
};

const STORED_VALUES = 'storedValues';

export const Counter = ({ repo, fieldValueValidator, CounterType }: Props) => {
    const dispatch = useAppDispatch();
    const errorData = useAppSelector(selectErrorData);
    const settingsMode = useAppSelector(selectSettingsMode);
    const minMaxValues = useAppSelector(selectMinMaxValues);

    useEffect(() => {
        const root = document.getElementById('root') as HTMLElement;
        root.style.backgroundColor = '#292c35';
        return () => {
            root.style.backgroundColor = 'white';
        };
    }, []);

    useEffect(() => {
        const storedValues = repo.getItem(STORED_VALUES);
        if (storedValues) {
            const minMaxValues = demarshallMinMaxValues(storedValues);
            dispatch(setMinMaxValuesAC(minMaxValues));
        } else {
            dispatch(setMinMaxValuesAC(getDefaultValues()));
        }
    }, [repo, dispatch]);

    return (
        <CounterType
            fieldValueValidator={fieldValueValidator}
            minMaxValues={minMaxValues}
            errorData={errorData}
            settingsMode={settingsMode}
        />
    );
};
