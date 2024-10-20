import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { memo, useCallback, useState } from 'react';
import { Scoreboard } from './Scoreboard/Scoreboard';
import Grid from '@mui/material/Grid2';
import { MinMaxValues } from '@/features/Counter/lib/types/counter.types';
import { not } from '@/common/not';

type Props = {
    minMaxValues: MinMaxValues;
    errorText: string | undefined;
    settingsMode: boolean;
    setSettingsMode?: () => void;
};

export const DisplayCounterStand = memo(
    function DisplayCounterStand(props: Props) {
        const {
            minMaxValues: { minValue, maxValue },
            errorText,
            settingsMode,
            setSettingsMode,
        } = props;

        const [value, setValue] = useState<number>(minValue);

        const counterV_lt_MaxV = value < maxValue;
        const predicate = settingsMode || !!errorText;
        const incButtonDisabled = not(counterV_lt_MaxV) || predicate;
        const resetButtonDisabled = value === minValue || predicate;

        const handleIncrementClick = useCallback(() => {
            if (counterV_lt_MaxV) setValue((prev) => prev + 1);
        }, [counterV_lt_MaxV]);

        const handleResetClick = useCallback(
            () => setValue(minValue),
            [minValue],
        );

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
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 2,
                        ...(setSettingsMode ? altCounterStyles : {}),
                    }}
                >
                    <Paper
                        variant="outlined"
                        sx={{ flexGrow: 1, marginBottom: 2 }}
                    >
                        <Scoreboard
                            counterValue={value}
                            counterV_lt_MaxV={counterV_lt_MaxV}
                            settingsMode={settingsMode}
                            errorText={errorText}
                            setSettingsMode={setSettingsMode}
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
                            {setSettingsMode ?
                                <Grid size="grow">
                                    <Button
                                        onClick={setSettingsMode}
                                        variant="contained"
                                        sx={{ width: '100%' }}
                                    >
                                        set
                                    </Button>
                                </Grid>
                            :   ''}
                        </Grid>
                    </Paper>
                </Paper>
            </Grid>
        );
    },
    (prevProps, newProps) => {
        if (
            prevProps.errorText === newProps.errorText &&
            prevProps.settingsMode === newProps.settingsMode &&
            prevProps.minMaxValues !== newProps.minMaxValues
        ) {
            return true;
        }
        return false;
    },
);
