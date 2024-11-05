import { useAppSelector } from '@/common/hooks/useAppSelector';
import { CounterStatus, FieldNames } from '@/features/Counter/lib/enums/enums';
import { FieldValuesValidator } from '@/features/Counter/lib/interfaces/fieldValueValidator';
import { selectCounterStatus } from '@/features/Counter/model/select-counter-status';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { useMinMaxValues } from './ValuePanel/hooks/useMinMaxValues';
import { ValuePanel } from './ValuePanel/ValuePannel';

type Props = {
    fieldValuesValidator: FieldValuesValidator;
    counterSpecificStyles?: { [key: string]: unknown };
    validateFieldValue: (value: string) => boolean;
};

export const CounterSettingsStand = (props: Props) => {
    const { fieldValuesValidator, counterSpecificStyles, validateFieldValue } =
        props;
    const counterStatus = useAppSelector(selectCounterStatus);

    const { localMinMaxValues, setValues, setMinMaxValuesHandler } =
        useMinMaxValues(counterStatus);
    const { minValue, maxValue } = localMinMaxValues;

    const incorrectFieldData = fieldValuesValidator.validateFieldValues(
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
                    ...counterSpecificStyles,
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
                        value={maxValue}
                        labelText="max value:"
                        fieldIsIncorrect={
                            incorrectFieldName === FieldNames.MAX ||
                            incorrectFieldName === FieldNames.BOTH
                        }
                        fieldName={FieldNames.MAX}
                        setValues={setValues}
                        validateFieldValue={validateFieldValue}
                    />
                    <ValuePanel
                        value={minValue}
                        labelText="start value:"
                        fieldIsIncorrect={
                            incorrectFieldName === FieldNames.MIN ||
                            incorrectFieldName === FieldNames.BOTH
                        }
                        fieldName={FieldNames.MIN}
                        setValues={setValues}
                        validateFieldValue={validateFieldValue}
                    />
                </Paper>
                <Paper variant="outlined" sx={{ paddingX: 3, paddingY: 2 }}>
                    <Button
                        variant="contained"
                        disabled={counterStatus !== CounterStatus.TYPING}
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
