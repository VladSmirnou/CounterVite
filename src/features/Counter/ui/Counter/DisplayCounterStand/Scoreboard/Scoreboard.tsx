import Typography from '@mui/material/Typography';
import { CounterStatus } from '@/features/Counter/model/counter-status-reducer';

type Props = {
    minValue_eq_maxValue: boolean;
    counterValue: number;
    counterStatus: CounterStatus;
    errorText: string | undefined;
};

export const Scoreboard = ({
    counterValue,
    errorText,
    counterStatus,
    minValue_eq_maxValue,
}: Props) => {
    let scoreBoardTextColor: string = '#5ed1f5';

    if (counterStatus === 'error' || minValue_eq_maxValue)
        scoreBoardTextColor = 'red';

    const scoreBoardText =
        counterStatus === 'error' ? errorText
        : counterStatus === 'typing' ? 'Enter values and press set'
        : counterValue;

    return (
        <Typography
            component={'p'}
            variant={counterStatus === 'typing' ? 'h5' : 'h2'}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: counterStatus === 'typing' ? 148 : '100%',
                fontWeight: 900,
                color: scoreBoardTextColor,
            }}
        >
            {scoreBoardText}
        </Typography>
    );
};
