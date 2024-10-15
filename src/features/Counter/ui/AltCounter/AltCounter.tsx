import { FieldNames } from '@/common/enums/enums';
import { ErrorData } from '@/common/types/app.types';
import { useCallback, useEffect, useState } from 'react';
import { not } from '@/common/not';
import { CounterSettingsStand } from '../CounterSettingsStand/CounterSettingsStand';
import { DisplayCounterStand } from '../DisplayCounterStand/DisplayCounterStand';
import { Repo } from '@/app/interfaces/repo';
import { FieldValueValidator } from '@/app/interfaces/fieldValueValidator';
import { MinMaxValues } from '../../lib/types/counter.types';
import { getDefaultValues } from '../../lib/getDefaultValues';
import { demarshallMinMaxValues } from '../../lib/demarhsallMinMaxValues';

const STORED_VALUES = 'storedValues';

type Props = {
    repo: Repo;
    fieldValueValidator: FieldValueValidator;
};

export const AltCounter = ({ repo, fieldValueValidator }: Props) => {
    useEffect(() => {
        const storedValues = repo.getItem(STORED_VALUES);
        if (storedValues) {
            const minMaxValues = demarshallMinMaxValues(storedValues);
            setMinMaxValues(minMaxValues);
        } else {
            setMinMaxValues(getDefaultValues());
        }
    }, [repo]);

    const [errorData, setErrorData] = useState<ErrorData | null>(null);
    const [settingsModeOn, setSettingsModeOn] = useState<boolean>(false);
    const [minMaxValues, setMinMaxValues] =
        useState<MinMaxValues>(getDefaultValues);

    const setValues = (fieldName: FieldNames, value: number) => {
        const nextMinMaxValues = {
            ...minMaxValues,
            [fieldName === FieldNames.MIN ? 'minValue' : 'maxValue']: value,
        };

        const incorrectFieldData = fieldValueValidator.validateFieldValues(
            nextMinMaxValues.minValue,
            nextMinMaxValues.maxValue,
        );

        if (incorrectFieldData && errorData) {
            return;
        } else if (incorrectFieldData && not(errorData)) {
            const [incorrectFieldName, errorText] = incorrectFieldData;

            setErrorData({
                error: errorText,
                incorrectFieldName,
            });
            // I want to set incorrect values to the state once, so
            // that the user can see these values.
            setMinMaxValues(nextMinMaxValues);
        } else {
            if (errorData) setErrorData(null);
            if (not(settingsModeOn)) setSettingsModeOn(true);
            setMinMaxValues(nextMinMaxValues);
        }
        return;
    };

    const setSettingsMode = useCallback(() => {
        setSettingsModeOn(true);
    }, []);

    const setMinMaxValuesHandler = () => {
        setMinMaxValues(minMaxValues);
        setSettingsModeOn(false);
        repo.setItem('storedValues', minMaxValues);
    };

    return (
        <div>
            {settingsModeOn ?
                <CounterSettingsStand
                    minMaxValues={minMaxValues}
                    setMinMaxValuesHandler={setMinMaxValuesHandler}
                    settingsModeOn={settingsModeOn}
                    setValues={setValues}
                    errorData={errorData}
                    setSettingsMode={setSettingsMode}
                />
            :   <DisplayCounterStand
                    key={minMaxValues.minValue}
                    minMaxValues={minMaxValues}
                    errorText={errorData?.error}
                    settingsModeOn={settingsModeOn}
                    setSettingsMode={setSettingsMode}
                />
            }
        </div>
    );
};
