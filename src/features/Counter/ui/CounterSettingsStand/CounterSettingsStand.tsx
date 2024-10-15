import { FieldNames } from '@/common/enums/enums';
import { ErrorData } from '@/common/types/app.types';
import Paper from '@mui/material/Paper';
import { not } from '../../../../common/not';
import { MinMaxValues } from '../../lib/types/counter.types';
import { ValuePanel } from './ValuePanel/ValuePannel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';

type Props = {
    minMaxValues: MinMaxValues;
    errorData: ErrorData | null;
    settingsModeOn: boolean;
    setMinMaxValuesHandler: () => void;
    setValues: (fieldName: FieldNames, value: number) => void;
    setSettingsMode?: () => void;
};

export const CounterSettingsStand = (props: Props) => {
    const {
        minMaxValues: { minValue, maxValue },
        errorData,
        setMinMaxValuesHandler,
        settingsModeOn,
        setValues,
        setSettingsMode,
    } = props;

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
                        setValues={setValues}
                    />
                    <ValuePanel
                        initialValue={minValue}
                        labelText="start value:"
                        errorData={errorData}
                        fieldName={FieldNames.MIN}
                        setValues={setValues}
                    />
                </Paper>
                <Paper variant="outlined" sx={{ paddingX: 3, paddingY: 2 }}>
                    <Button
                        variant="contained"
                        disabled={not(settingsModeOn) || !!errorData}
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
