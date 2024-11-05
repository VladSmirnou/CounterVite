import { RenderButtonsProps } from '@/features/Counter/lib/types/counter.types';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';

type Props = RenderButtonsProps & {
    setSettingsMode: () => void;
};

export const AltCounterButtons = (props: Props) => {
    const {
        incButtonDisabled,
        resetButtonDisabled,
        handleIncrementClick,
        handleResetClick,
        setSettingsMode,
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
            <Grid size="grow">
                <Button
                    onClick={setSettingsMode}
                    variant="contained"
                    sx={{ width: '100%' }}
                >
                    set
                </Button>
            </Grid>
        </Grid>
    );
};
