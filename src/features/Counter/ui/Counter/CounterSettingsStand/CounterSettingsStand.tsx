import { FieldNames } from '@/common/enums/enums';
import { ErrorData } from '@/common/types/app.types';
import Paper from '@mui/material/Paper';
import { not } from '../../../../../common/not';
import { MinMaxValues } from '../../../lib/types/counter.types';
import { ValuePanel } from './ValuePanel/ValuePannel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { setErrorDataAC, setErrorNullAC } from '../../../model/error-reducer';
import { setMinMaxValuesTC } from '../../../model/minMaxValues-reducer';
import { turnSettingsModeOnAC } from '../../../model/settingsMode-reducer';
import { FieldValueValidator } from '@/app/interfaces/fieldValueValidator';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';

type Props = {
    minMaxValues: MinMaxValues;
    errorData: ErrorData | null;
    settingsMode: boolean;
    setSettingsMode?: () => void;
    fieldValueValidator: FieldValueValidator;
};

export const CounterSettingsStand = (props: Props) => {
    const dispatch = useAppDispatch();

    const {
        minMaxValues,
        errorData,
        settingsMode,
        setSettingsMode,
        fieldValueValidator,
    } = props;

    const [loaclMinMaxValues, setLocalMinMaxValues] = useState(minMaxValues);

    const { minValue, maxValue } = loaclMinMaxValues;

    const setLocalValues = (fieldName: FieldNames, value: number) => {
        const nextMinMaxValues = {
            ...minMaxValues,
            [fieldName === FieldNames.MIN ? 'minValue' : 'maxValue']: value,
        };
        console.log(fieldValueValidator);
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
            setLocalMinMaxValues(nextMinMaxValues);
        } else {
            if (errorData) dispatch(setErrorNullAC());
            if (not(settingsMode)) dispatch(turnSettingsModeOnAC());
            setLocalMinMaxValues(nextMinMaxValues);
        }
        return;
    };

    const setMinMaxValuesHandler = () => {
        dispatch(setMinMaxValuesTC(minMaxValues));
    };

    const altCounterStyles = {
        width: '100%',
        maxWidth: 430,
        margin: '0 auto',
    };

    return (
        <Grid size={4}>
            <Paper
                variant="outlined"
                sx={{
                    padding: 2,
                    ...(setSettingsMode ? altCounterStyles : {}),
                }}
            >
                <Paper
                    variant="outlined"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingX: 2,
                        paddingY: 3,
                        rowGap: 3,
                        marginBottom: 2,
                    }}
                >
                    <ValuePanel
                        initialValue={maxValue}
                        labelText="max value:"
                        errorData={errorData}
                        fieldName={FieldNames.MAX}
                        setValues={setLocalValues}
                    />
                    <ValuePanel
                        initialValue={minValue}
                        labelText="start value:"
                        errorData={errorData}
                        fieldName={FieldNames.MIN}
                        setValues={setLocalValues}
                    />
                </Paper>
                <Paper variant="outlined" sx={{ paddingX: 3, paddingY: 2 }}>
                    <Button
                        variant="contained"
                        disabled={not(settingsMode) || !!errorData}
                        onClick={setMinMaxValuesHandler}
                        sx={{ display: 'block', mx: 'auto' }}
                    >
                        set
                    </Button>
                </Paper>
            </Paper>
        </Grid>
    );
};
