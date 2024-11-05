import { RenderButtonsProps } from '@/features/Counter/lib/types/counter.types';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';

export const BasicCounterButtons = (props: RenderButtonsProps) => {
    const {
        incButtonDisabled,
        resetButtonDisabled,
        handleIncrementClick,
        handleResetClick,
    } = props;
    return (
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
    );
};
