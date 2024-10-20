import { FieldValueValidator } from '@/app/interfaces/fieldValueValidator';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { ErrorData } from '@/common/types/app.types';
import { useCallback } from 'react';
import { MinMaxValues } from '../../../../lib/types/counter.types';
import { turnSettingsModeOnAC } from '../../../../model/settingsMode-reducer';
import { CounterSettingsStand } from '../../CounterSettingsStand/CounterSettingsStand';
import { DisplayCounterStand } from '../../DisplayCounterStand/DisplayCounterStand';

type Props = {
    minMaxValues: MinMaxValues;
    errorData: ErrorData | null;
    settingsMode: boolean;
    fieldValueValidator: FieldValueValidator;
};

export const AltCounter = (props: Props) => {
    const { minMaxValues, errorData, settingsMode, fieldValueValidator } =
        props;
    const dispatch = useAppDispatch();

    const setSettingsMode = useCallback(() => {
        dispatch(turnSettingsModeOnAC());
    }, [dispatch]);

    return (
        <div>
            {settingsMode ?
                <CounterSettingsStand
                    fieldValueValidator={fieldValueValidator}
                    minMaxValues={minMaxValues}
                    settingsMode={settingsMode}
                    errorData={errorData}
                    setSettingsMode={setSettingsMode}
                />
            :   <DisplayCounterStand
                    key={minMaxValues.minValue}
                    minMaxValues={minMaxValues}
                    errorText={errorData?.error}
                    settingsMode={settingsMode}
                    setSettingsMode={setSettingsMode}
                />
            }
        </div>
    );
};
