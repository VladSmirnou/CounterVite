import { RenderButtonsProps } from '@/features/Counter/lib/types/counter.types';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { DefaultCounterButtons } from '../../commonComponents/DefaultCounterButtons/DefaultCounterButtons';

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
        <>
            <DefaultCounterButtons
                incButtonDisabled={incButtonDisabled}
                resetButtonDisabled={resetButtonDisabled}
                handleIncrementClick={handleIncrementClick}
                handleResetClick={handleResetClick}
            />
            <Grid size="grow">
                <Button
                    onClick={setSettingsMode}
                    variant="contained"
                    sx={{ width: '100%' }}
                >
                    set
                </Button>
            </Grid>
        </>
    );
};
