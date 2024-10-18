import { FieldValueValidator } from '@/app/interfaces/fieldValueValidator';
import { Repo } from '@/app/interfaces/repo';
import { FieldNames } from '@/common/enums/enums';
import { not } from '@/common/not';
import Grid from '@mui/material/Grid2';
import { useEffect, useReducer } from 'react';
import { demarshallMinMaxValues } from '../../lib/demarhsallMinMaxValues';
import { getDefaultValues } from '../../lib/getDefaultValues';
import {
    errorReducer,
    setErrorDataAC,
    setErrorNullAC,
} from '../../model/error-reducer';
import {
    minMaxValuesReducer,
    setMinMaxValuesAC,
} from '../../model/minMaxValues-reducer';
import {
    settingsModeReducer,
    turnSettingsModeOffAC,
    turnSettingsModeOnAC,
} from '../../model/settingsMode-reducer';
import { CounterSettingsStand } from '../CounterSettingsStand/CounterSettingsStand';
import { DisplayCounterStand } from '../DisplayCounterStand/DisplayCounterStand';

const STORED_VALUES = 'storedValues';

type Props = {
    repo: Repo;
    fieldValueValidator: FieldValueValidator;
};

export const BasicCounter = ({ repo, fieldValueValidator }: Props) => {
    useEffect(() => {
        const storedValues = repo.getItem(STORED_VALUES);
        if (storedValues) {
            const minMaxValues = demarshallMinMaxValues(storedValues);
            dispatchMinMaxValues(setMinMaxValuesAC(minMaxValues));
        } else {
            dispatchMinMaxValues(setMinMaxValuesAC(getDefaultValues()));
        }
    }, [repo]);

    const [errorData, dispatchError] = useReducer(errorReducer, null);
    const [settingsModeOn, dispatchSettingsMode] = useReducer(
        settingsModeReducer,
        false,
    );
    const [minMaxValues, dispatchMinMaxValues] = useReducer(
        minMaxValuesReducer,
        null,
        getDefaultValues,
    );

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

            dispatchError(
                setErrorDataAC({
                    error: errorText,
                    incorrectFieldName,
                }),
            );
            // I want to set incorrect values to the state once, so
            // that the user can see these values.
            dispatchMinMaxValues(setMinMaxValuesAC(nextMinMaxValues));
        } else {
            if (errorData) dispatchError(setErrorNullAC());
            if (not(settingsModeOn))
                dispatchSettingsMode(turnSettingsModeOnAC());
            dispatchMinMaxValues(setMinMaxValuesAC(nextMinMaxValues));
        }
        return;
    };

    const setMinMaxValuesHandler = () => {
        dispatchMinMaxValues(setMinMaxValuesAC(minMaxValues));
        dispatchSettingsMode(turnSettingsModeOffAC());
        repo.setItem(STORED_VALUES, minMaxValues);
    };

    return (
        <Grid container spacing={12} sx={{ justifyContent: 'center' }}>
            <CounterSettingsStand
                minMaxValues={minMaxValues}
                setMinMaxValuesHandler={setMinMaxValuesHandler}
                settingsModeOn={settingsModeOn}
                setValues={setValues}
                errorData={errorData}
            />
            <DisplayCounterStand
                key={minMaxValues.minValue}
                minMaxValues={minMaxValues}
                errorText={errorData?.error}
                settingsModeOn={settingsModeOn}
            />
        </Grid>
    );
};
