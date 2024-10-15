import s from './Scoreboard.module.css';

type Props = {
    counterValue: number;
    counterV_lt_MaxV: boolean;
    settingsModeOn: boolean;
    errorText: string | undefined;
};

export const Scoreboard = ({
    counterValue,
    counterV_lt_MaxV,
    settingsModeOn,
    errorText,
}: Props) => {
    let finalClass = s.default;

    if (!counterV_lt_MaxV && !settingsModeOn)
        finalClass += ' ' + s.counterV_gte_MaxV;
    else if (settingsModeOn && !errorText) finalClass += ' ' + s.settingsModeOn;
    else if (errorText) finalClass += ' ' + s.error;

    const scoreBoardText =
        errorText ? errorText
        : settingsModeOn ? "enter values and press 'set'"
        : counterValue;

    return <p className={finalClass}>{scoreBoardText}</p>;
};
