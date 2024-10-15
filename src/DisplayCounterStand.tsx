import { memo, useCallback, useState } from 'react';
import { Display } from './Display';
import { MinMaxValues } from './MainComponent';
import { not } from './not';
import { Scoreboard } from './Scoreboard';
import { SettingsButtons } from './SettingsButtons';
import { Stand } from './Stand';
import { SuperButton } from './SuperButton';

type Props = {
    minMaxValues: MinMaxValues;
    errorText: string | undefined;
    settingsModeOn: boolean;
};

export const DisplayCounterStand = memo(
    function DisplayCounterStand(props: Props) {
        const {
            minMaxValues: { minValue, maxValue },
            errorText,
            settingsModeOn,
        } = props;

        const [value, setValue] = useState<number>(minValue);

        const counterV_lt_MaxV = value < maxValue;
        const predicate = settingsModeOn || !!errorText;
        const incButtonDisabled = not(counterV_lt_MaxV) || predicate;
        const resetButtonDisabled = value === minValue || predicate;

        const handleIncrementClick = useCallback(() => {
            if (counterV_lt_MaxV) setValue((prev) => prev + 1);
        }, [counterV_lt_MaxV]);

        const handleResetClick = useCallback(
            () => setValue(minValue),
            [minValue],
        );

        return (
            <Stand>
                <Display>
                    <Scoreboard
                        counterValue={value}
                        counterV_lt_MaxV={counterV_lt_MaxV}
                        settingsModeOn={settingsModeOn}
                        errorText={errorText}
                    />
                </Display>
                <SettingsButtons>
                    <SuperButton
                        onClick={handleIncrementClick}
                        disabled={incButtonDisabled}
                    >
                        inc
                    </SuperButton>
                    <SuperButton
                        onClick={handleResetClick}
                        disabled={resetButtonDisabled}
                    >
                        reset
                    </SuperButton>
                </SettingsButtons>
            </Stand>
        );
    },
    (prevProps, newProps) => {
        if (
            prevProps.errorText === newProps.errorText &&
            prevProps.settingsModeOn === newProps.settingsModeOn &&
            prevProps.minMaxValues !== newProps.minMaxValues
        ) {
            return true;
        }
        return false;
    },
);
