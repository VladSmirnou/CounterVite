import { FieldValueValidator } from '@/app/interfaces/fieldValueValidator';
import { Repo } from '@/app/interfaces/repo';
import { FieldNames } from '@/common/enums/enums';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { not } from '@/common/not';
import Grid from '@mui/material/Grid2';
import { useEffect } from 'react';
import { demarshallMinMaxValues } from '../../lib/demarhsallMinMaxValues';
import { getDefaultValues } from '../../lib/getDefaultValues';
import { setErrorDataAC, setErrorNullAC } from '../../model/error-reducer';
import { selectErrorData } from '../../model/errorSelector';
import { setMinMaxValuesAC } from '../../model/minMaxValues-reducer';
import { selectMinMaxValues } from '../../model/minMaxValuesSelector';
import {
    turnSettingsModeOffAC,
    turnSettingsModeOnAC,
} from '../../model/settingsMode-reducer';
import { selectSettingsMode } from '../../model/settingsModeSelecor';
import { CounterSettingsStand } from '../CounterSettingsStand/CounterSettingsStand';
import { DisplayCounterStand } from '../DisplayCounterStand/DisplayCounterStand';

const STORED_VALUES = 'storedValues';

type Props = {
    repo: Repo;
    fieldValueValidator: FieldValueValidator;
};

export const BasicCounter = ({ repo, fieldValueValidator }: Props) => {
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

    const setValues = (fieldName: FieldNames, value: number) => {
        const nextMinMaxValues = {
            ...minMaxValues,
            [fieldName === FieldNames.MIN ? 'minValue' : 'maxValue']: value,
        };

        const incorrectFieldData = fieldValueValidator.validateFieldValues(
            nextMinMaxValues.minValue,
            nextMinMaxValues.maxValue,
        );

        if (incorrectFieldData && errorData) {
            return;
        } else if (incorrectFieldData && not(errorData)) {
            const [incorrectFieldName, errorText] = incorrectFieldData;

            dispatch(
                setErrorDataAC({
                    error: errorText,
                    incorrectFieldName,
                }),
            );
            // I want to set incorrect values to the state once, so
            // that the user can see these values.
            dispatch(setMinMaxValuesAC(nextMinMaxValues));
        } else {
            if (errorData) dispatch(setErrorNullAC());
            if (not(settingsMode)) dispatch(turnSettingsModeOnAC());
            dispatch(setMinMaxValuesAC(nextMinMaxValues));
        }
        return;
    };

    const setMinMaxValuesHandler = () => {
        dispatch(setMinMaxValuesAC(minMaxValues));
        dispatch(turnSettingsModeOffAC());
        repo.setItem(STORED_VALUES, minMaxValues);
    };

    return (
        <Grid container spacing={12} sx={{ justifyContent: 'center' }}>
            <CounterSettingsStand
                minMaxValues={minMaxValues}
                setMinMaxValuesHandler={setMinMaxValuesHandler}
                settingsMode={settingsMode}
                setValues={setValues}
                errorData={errorData}
            />
            <DisplayCounterStand
                key={minMaxValues.minValue}
                minMaxValues={minMaxValues}
                errorText={errorData?.error}
                settingsMode={settingsMode}
            />
        </Grid>
    );
};
