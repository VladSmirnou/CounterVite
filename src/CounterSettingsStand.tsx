import { Display } from './Display';
import { ErrorData, MinMaxValues } from './MainComponent';
import { not } from './not';
import { SettingsButtons } from './SettingsButtons';
import { Stand } from './Stand';
import { SuperButton } from './SuperButton';
import { ValuePanel } from './ValuePannel';

type Props = {
    minMaxValues: MinMaxValues;
    errorData: ErrorData | null;
    settingsModeOn: boolean;
    setMinMaxValuesHandler: () => void;
    setValues: (fieldName: string, value: number) => void;
};

export const CounterSettingsStand = (props: Props) => {
    const {
        minMaxValues: { minValue, maxValue },
        errorData,
        setMinMaxValuesHandler,
        settingsModeOn,
        setValues,
    } = props;
    return (
        <Stand>
            <Display>
                <ValuePanel
                    initialValue={maxValue}
                    labelText="Max"
                    errorData={errorData}
                    fieldName="max"
                    setValues={setValues}
                />
                <ValuePanel
                    initialValue={minValue}
                    labelText="Min"
                    errorData={errorData}
                    fieldName="min"
                    setValues={setValues}
                />
            </Display>
            <SettingsButtons>
                <SuperButton
                    disabled={not(settingsModeOn)}
                    onClick={setMinMaxValuesHandler}
                >
                    set
                </SuperButton>
            </SettingsButtons>
        </Stand>
    );
};
