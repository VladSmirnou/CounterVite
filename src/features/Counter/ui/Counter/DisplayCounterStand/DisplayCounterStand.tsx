import { FieldValueValidator } from '@/app/interfaces/fieldValueValidator';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import {
    incrementMinValueAC,
    resetMinMaxValuesAC,
} from '@/features/Counter/model/minMaxValues-reducer';
import { selectMinMaxValues } from '@/features/Counter/model/minMaxValuesSelector';
import { selectCounterStatus } from '@/features/Counter/model/select-counter-status';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { Scoreboard } from './Scoreboard/Scoreboard';

type Props = {
    fieldValueValidator: FieldValueValidator;
};

export const DisplayCounterStand = (props: Props) => {
    const { fieldValueValidator } = props;
    const counterStatus = useAppSelector(selectCounterStatus);

    const dispatch = useAppDispatch();

    const { minValue, maxValue, initialMinValue } =
        useAppSelector(selectMinMaxValues);

    const errorData = fieldValueValidator.validateFieldValues(
        minValue,
        maxValue,
    );

    const minValue_eq_maxValue = minValue === maxValue;
    const counterStatusIsNotIdle = counterStatus !== 'idle';

    const incButtonDisabled = minValue >= maxValue || counterStatusIsNotIdle;
    const resetButtonDisabled =
        minValue === initialMinValue || counterStatusIsNotIdle;

    const handleIncrementClick = () => {
        dispatch(incrementMinValueAC());
    };

    const handleResetClick = () => {
        dispatch(resetMinMaxValuesAC());
    };

    return (
        <Grid size={4}>
            <Paper
                variant="outlined"
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 2,
                }}
            >
                <Paper variant="outlined" sx={{ flexGrow: 1, marginBottom: 2 }}>
                    <Scoreboard
                        minValue_eq_maxValue={minValue_eq_maxValue}
                        counterValue={minValue}
                        counterStatus={counterStatus}
                        errorText={errorData?.errorText}
                    />
                </Paper>
                <Paper variant="outlined" sx={{ paddingX: 3, paddingY: 2 }}>
                    <Grid container spacing={6}>
                        <Grid size="grow">
                            <Button
                                onClick={handleIncrementClick}
                                disabled={incButtonDisabled}
                                variant="contained"
                                sx={{ width: '100%' }}
                            >
                                inc
                            </Button>
                        </Grid>
                        <Grid size="grow">
                            <Button
                                onClick={handleResetClick}
                                disabled={resetButtonDisabled}
                                variant="contained"
                                sx={{ width: '100%' }}
                            >
                                reset
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Paper>
        </Grid>
    );
};
