import { FieldValuesValidator } from '@/features/Counter/lib/interfaces/fieldValueValidator';
import {
    MinMaxValues,
    RenderButtonsProps,
} from '@/features/Counter/lib/types/counter.types';
import Grid from '@mui/material/Grid2';
import { CounterSettingsStand } from '../commonComponents/CounterSettingsStand/CounterSettingsStand';
import { DefaultCounterButtons } from '../commonComponents/DefaultCounterButtons/DefaultCounterButtons';
import { DisplayCounterStand } from '../commonComponents/DisplayCounterStand/DisplayCounterStand';

type Props = {
    fieldValuesValidator: FieldValuesValidator;
    validateFieldValue: (value: string) => boolean;
    getMinMaxValues: () => MinMaxValues;
};

export const BasicCounter = (props: Props) => {
    const { fieldValuesValidator, validateFieldValue, getMinMaxValues } = props;

    return (
        <Grid container spacing={12} sx={{ justifyContent: 'center' }}>
            <CounterSettingsStand
                fieldValuesValidator={fieldValuesValidator}
                validateFieldValue={validateFieldValue}
                getMinMaxValues={getMinMaxValues}
            />
            <DisplayCounterStand
                fieldValuesValidator={fieldValuesValidator}
                renderButtons={(props: RenderButtonsProps) => (
                    <DefaultCounterButtons {...props} />
                )}
            />
        </Grid>
    );
};
