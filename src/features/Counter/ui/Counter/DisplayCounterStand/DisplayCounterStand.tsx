import { FieldValuesValidator } from '@/features/Counter/lib/interfaces/fieldValueValidator';
import { RenderButtonsProps } from '@/features/Counter/lib/types/counter.types';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { useDisplayStatus } from './hooks/useDisplayStatus';
import { useMinMaxValues } from './hooks/useMinMaxValues';
import { Scoreboard } from './Scoreboard/Scoreboard';

type Props = {
    fieldValuesValidator: FieldValuesValidator;
    renderButtons: (props: RenderButtonsProps) => JSX.Element;
    counterSpecificStyles?: { [key: string]: unknown };
};

export const DisplayCounterStand = (props: Props) => {
    const { fieldValuesValidator, renderButtons, counterSpecificStyles } =
        props;

    const { values, handleIncrementClick, handleResetClick } =
        useMinMaxValues();

    const {
        counterStatus,
        minValue_eq_maxValue,
        incButtonDisabled,
        resetButtonDisabled,
        errorText,
    } = useDisplayStatus({ values, fieldValuesValidator });

    const { minValue } = values;

    return (
        <Grid size={4}>
            <Paper
                variant="outlined"
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 2,
                    ...counterSpecificStyles,
                }}
            >
                <Paper variant="outlined" sx={{ flexGrow: 1, marginBottom: 2 }}>
                    <Scoreboard
                        minValue_eq_maxValue={minValue_eq_maxValue}
                        counterValue={minValue}
                        counterStatus={counterStatus}
                        errorText={errorText}
                    />
                </Paper>
                <Paper variant="outlined" sx={{ paddingX: 3, paddingY: 2 }}>
                    {renderButtons({
                        handleIncrementClick,
                        handleResetClick,
                        incButtonDisabled,
                        resetButtonDisabled,
                    })}
                </Paper>
            </Paper>
        </Grid>
    );
};
