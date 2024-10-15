import Typography from '@mui/material/Typography';

type Props = {
    counterValue: number;
    counterV_lt_MaxV: boolean;
    settingsModeOn: boolean;
    errorText: string | undefined;
    setSettingsMode?: () => void;
};

export const Scoreboard = ({
    counterValue,
    counterV_lt_MaxV,
    settingsModeOn,
    errorText,
    setSettingsMode,
}: Props) => {
    let scoreBoardTextColor: string = '#5ed1f5';

    if (!counterV_lt_MaxV && !settingsModeOn) scoreBoardTextColor = 'red';
    // else if (settingsModeOn && !errorText) finalClass += ' ' + s.settingsModeOn;
    else if (errorText) scoreBoardTextColor = 'red';

    const scoreBoardText =
        errorText ? errorText
        : settingsModeOn ? "enter values and press 'set'"
        : counterValue;

    return (
        <Typography
            component={'p'}
            variant={settingsModeOn ? 'h5' : 'h2'}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: setSettingsMode ? 148 : '100%',
                fontWeight: 900,
                color: scoreBoardTextColor,
            }}
        >
            {scoreBoardText}
        </Typography>
    );
};
