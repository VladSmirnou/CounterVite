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
    getCounterSpecificStyles?: (
        element: string,
    ) => { [key: string]: unknown } | undefined;
};

export const DisplayCounterStand = (props: Props) => {
    const { fieldValuesValidator, renderButtons, getCounterSpecificStyles } =
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
        <Grid size={{ xs: 2, sm: 4, md: 5, lg: 4 }}>
            <Paper
                variant="outlined"
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 2,
                    ...(getCounterSpecificStyles ?
                        getCounterSpecificStyles('paper')
                    :   undefined),
                }}
            >
                <Paper variant="outlined" sx={{ flexGrow: 1, marginBottom: 2 }}>
                    <Scoreboard
                        minValue_eq_maxValue={minValue_eq_maxValue}
                        counterValue={minValue}
                        counterStatus={counterStatus}
                        errorText={errorText}
                        counterSpecificStyles={
                            getCounterSpecificStyles ?
                                getCounterSpecificStyles('scoreboard')
                            :   undefined
                        }
                    />
                </Paper>
                <Paper variant="outlined" sx={{ paddingX: 3, paddingY: 2 }}>
                    <Grid container spacing={{ xs: 2, lg: 6 }}>
                        {renderButtons({
                            handleIncrementClick,
                            handleResetClick,
                            incButtonDisabled,
                            resetButtonDisabled,
                        })}
                    </Grid>
                </Paper>
            </Paper>
        </Grid>
    );
};
