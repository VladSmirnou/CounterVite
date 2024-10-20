import { FieldValueValidator } from '@/app/interfaces/fieldValueValidator';
import { ErrorData } from '@/common/types/app.types';
import Grid from '@mui/material/Grid2';
import { MinMaxValues } from '../../../../lib/types/counter.types';
import { CounterSettingsStand } from '../../CounterSettingsStand/CounterSettingsStand';
import { DisplayCounterStand } from '../../DisplayCounterStand/DisplayCounterStand';

type Props = {
    minMaxValues: MinMaxValues;
    errorData: ErrorData | null;
    settingsMode: boolean;
    fieldValueValidator: FieldValueValidator;
};

export const BasicCounter = (props: Props) => {
    const { minMaxValues, errorData, settingsMode, fieldValueValidator } =
        props;
    return (
        <Grid container spacing={12} sx={{ justifyContent: 'center' }}>
            <CounterSettingsStand
                key={`${minMaxValues.minValue}${minMaxValues.maxValue}`}
                fieldValueValidator={fieldValueValidator}
                minMaxValues={minMaxValues}
                settingsMode={settingsMode}
                errorData={errorData}
            />
            <DisplayCounterStand
                key={minMaxValues.minValue}
                minMaxValues={minMaxValues}
                errorText={errorData?.error}
                settingsMode={settingsMode}
            />
        </Grid>
    );
};
