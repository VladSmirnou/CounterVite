import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { CounterStatus } from '@/features/Counter/lib/enums/enums';
import { FieldValuesValidator } from '@/features/Counter/lib/interfaces/fieldValueValidator';
import {
    MinMaxValues,
    RenderButtonsProps,
} from '@/features/Counter/lib/types/counter.types';
import { setCounterStatusAC } from '@/features/Counter/model/counter-status-reducer';
import { selectCounterStatus } from '@/features/Counter/model/select-counter-status';
import { AltCounterButtons } from './AltCounterButtons/AltCounterButtons';
import { CounterSettingsStand } from '../commonComponents/CounterSettingsStand/CounterSettingsStand';
import { DisplayCounterStand } from '../commonComponents/DisplayCounterStand/DisplayCounterStand';

type Props = {
    fieldValuesValidator: FieldValuesValidator;
    validateFieldValue: (value: string) => boolean;
    getMinMaxValues: () => MinMaxValues;
};

const getStyles = (element: string) => {
    switch (element) {
        case 'paper': {
            return {
                width: '100%',
                maxWidth: 430,
                margin: '0 auto',
            };
        }
        case 'scoreboard': {
            return {
                height: 148,
            };
        }
    }
};

export const AltCounter = (props: Props) => {
    const dispatch = useAppDispatch();

    const counterStatus = useAppSelector(selectCounterStatus);
    const { fieldValuesValidator, validateFieldValue, getMinMaxValues } = props;

    const setSettingsMode = () => {
        dispatch(setCounterStatusAC(CounterStatus.TYPING));
    };

    return counterStatus !== CounterStatus.IDLE ?
            <CounterSettingsStand
                fieldValuesValidator={fieldValuesValidator}
                counterSpecificStyles={getStyles}
                validateFieldValue={validateFieldValue}
                getMinMaxValues={getMinMaxValues}
            />
        :   <DisplayCounterStand
                fieldValuesValidator={fieldValuesValidator}
                renderButtons={(props: RenderButtonsProps) => (
                    <AltCounterButtons
                        {...props}
                        setSettingsMode={setSettingsMode}
                    />
                )}
                counterSpecificStyles={getStyles}
            />;
};
