import { FieldValueValidator } from '@/app/interfaces/fieldValueValidator';
import Grid from '@mui/material/Grid2';
import { CounterSettingsStand } from '../../CounterSettingsStand/CounterSettingsStand';
import { DisplayCounterStand } from '../../DisplayCounterStand/DisplayCounterStand';

type Props = {
    fieldValueValidator: FieldValueValidator;
};

export const BasicCounter = (props: Props) => {
    const { fieldValueValidator } = props;
    return (
        <Grid container spacing={12} sx={{ justifyContent: 'center' }}>
            <CounterSettingsStand fieldValueValidator={fieldValueValidator} />
            <DisplayCounterStand fieldValueValidator={fieldValueValidator} />
        </Grid>
    );
};
