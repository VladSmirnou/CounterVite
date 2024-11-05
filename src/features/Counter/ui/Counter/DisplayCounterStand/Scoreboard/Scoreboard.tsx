import { CounterStatus } from '@/features/Counter/lib/enums';
import Typography from '@mui/material/Typography';

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
    let scoreboardTextColor = '#5ed1f5';

    if (counterStatus === CounterStatus.ERROR || minValue_eq_maxValue)
        scoreboardTextColor = 'red';

    const scoreboardText =
        counterStatus === CounterStatus.ERROR ? errorText
        : counterStatus === CounterStatus.TYPING ? 'Enter values and press set'
        : counterValue;

    return (
        <Typography
            component={'p'}
            variant={counterStatus === CounterStatus.TYPING ? 'h5' : 'h2'}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: counterStatus === CounterStatus.TYPING ? 148 : '100%',
                fontWeight: 900,
                color: scoreboardTextColor,
            }}
        >
            {scoreboardText}
        </Typography>
    );
};
