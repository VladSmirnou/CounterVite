import { CounterStatus } from '@/features/Counter/lib/enums/enums';
import Typography from '@mui/material/Typography';

type Props = {
    minValue_eq_maxValue: boolean;
    counterValue: number;
    counterStatus: CounterStatus;
    errorText: string | undefined;
    counterSpecificStyles?: { [key: string]: unknown };
};

export const Scoreboard = (props: Props) => {
    const {
        counterValue,
        errorText,
        counterStatus,
        minValue_eq_maxValue,
        counterSpecificStyles,
    } = props;
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
            variant={counterStatus === CounterStatus.TYPING ? 'h5' : 'h3'}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                fontWeight: 900,
                color: scoreboardTextColor,
                ...counterSpecificStyles,
            }}
        >
            {scoreboardText}
        </Typography>
    );
};
