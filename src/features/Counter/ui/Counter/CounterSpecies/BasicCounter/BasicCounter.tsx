import { FieldValuesValidator } from '@/features/Counter/lib/interfaces/fieldValueValidator';
import { RenderButtonsProps } from '@/features/Counter/lib/types/counter.types';
import Grid from '@mui/material/Grid2';
import { CounterSettingsStand } from '../../CounterSettingsStand/CounterSettingsStand';
import { DisplayCounterStand } from '../../DisplayCounterStand/DisplayCounterStand';
import { BasicCounterButtons } from './BasicCounterButtons/BasicCounterButtons';

type Props = {
    fieldValuesValidator: FieldValuesValidator;
    validateFieldValue: (value: string) => boolean;
};

export const BasicCounter = (props: Props) => {
    const { fieldValuesValidator, validateFieldValue } = props;

    return (
        <Grid container spacing={12} sx={{ justifyContent: 'center' }}>
            <CounterSettingsStand
                fieldValuesValidator={fieldValuesValidator}
                validateFieldValue={validateFieldValue}
            />
            <DisplayCounterStand
                fieldValuesValidator={fieldValuesValidator}
                renderButtons={(props: RenderButtonsProps) => (
                    <BasicCounterButtons {...props} />
                )}
            />
        </Grid>
    );
};
