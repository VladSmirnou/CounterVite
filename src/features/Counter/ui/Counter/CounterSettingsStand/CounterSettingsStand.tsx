import { FieldValueValidator } from '@/app/interfaces/fieldValueValidator';
import { FieldNames } from '@/common/enums/enums';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { setCounterStatusAC } from '@/features/Counter/model/counter-status-reducer';
import { selectCounterStatus } from '@/features/Counter/model/select-counter-status';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import {
    setMinMaxValuesAC,
    setMinMaxValuesTC,
} from '../../../model/minMaxValues-reducer';
import { ValuePanel } from './ValuePanel/ValuePannel';
import { getMinMaxValues } from '@/app/store';

type Props = {
    fieldValueValidator: FieldValueValidator;
};

export const CounterSettingsStand = (props: Props) => {
    const dispatch = useAppDispatch();
    const counterStatus = useAppSelector(selectCounterStatus);

    const { fieldValueValidator } = props;

    const [localMinMaxValues, setLocalMinMaxValues] = useState(getMinMaxValues);

    const { minValue, maxValue } = localMinMaxValues;

    const setLocalValues = (fieldName: FieldNames, value: number) => {
        const nextMinMaxValues = {
            ...localMinMaxValues,
            [fieldName === FieldNames.MIN ? 'minValue' : 'maxValue']: value,
        };

        const incorrectFieldData = fieldValueValidator.validateFieldValues(
            nextMinMaxValues.minValue,
            nextMinMaxValues.maxValue,
        );

        if (incorrectFieldData && counterStatus === 'error') {
            return;
        } else if (incorrectFieldData && counterStatus !== 'error') {
            // I want to set incorrect values to the state once, so
            // that the user can see these values, and also to the store,
            // so that I don't have to store the error data, and can
            // calculate it in DisplayCounterStand

            dispatch(setCounterStatusAC('error'));
            dispatch(setMinMaxValuesAC(nextMinMaxValues));
            setLocalMinMaxValues(nextMinMaxValues);
        } else {
            if (counterStatus === 'error') {
                dispatch(setMinMaxValuesAC(nextMinMaxValues));
            }
            dispatch(setCounterStatusAC('typing'));
            setLocalMinMaxValues(nextMinMaxValues);
        }
        return;
    };

    const setMinMaxValuesHandler = () => {
        dispatch(setCounterStatusAC('idle'));
        dispatch(setMinMaxValuesTC(localMinMaxValues));
    };

    // const altCounterStyles = {
    //     width: '100%',
    //     maxWidth: 430,
    //     margin: '0 auto',
    // };

    const incorrectFieldData = fieldValueValidator.validateFieldValues(
        minValue,
        maxValue,
    );
    const incorrectFieldName = incorrectFieldData?.fieldName;

    return (
        <Grid size={4}>
            <Paper
                variant="outlined"
                sx={{
                    padding: 2,
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
                        fieldIsIncorrect={
                            incorrectFieldName === FieldNames.MAX ||
                            incorrectFieldName === FieldNames.BOTH
                        }
                        fieldName={FieldNames.MAX}
                        setValues={setLocalValues}
                    />
                    <ValuePanel
                        initialValue={minValue}
                        labelText="start value:"
                        fieldIsIncorrect={
                            incorrectFieldName === FieldNames.MIN ||
                            incorrectFieldName === FieldNames.BOTH
                        }
                        fieldName={FieldNames.MIN}
                        setValues={setLocalValues}
                    />
                </Paper>
                <Paper variant="outlined" sx={{ paddingX: 3, paddingY: 2 }}>
                    <Button
                        variant="contained"
                        disabled={counterStatus !== 'typing'}
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
