import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { CounterStatus } from '@/features/Counter/lib/enums/enums';
import { FieldValuesValidator } from '@/features/Counter/lib/interfaces/fieldValueValidator';
import {
    MinMaxValues,
    RenderButtonsProps,
} from '@/features/Counter/lib/types/counter.types';
import { counterStatusChanged } from '@/features/Counter/model/counter-status-slice';
import { selectCounterStatus } from '@/features/Counter/model/select-counter-status';
import { AltCounterButtons } from './AltCounterButtons/AltCounterButtons';
import { CounterSettingsStand } from '../commonComponents/CounterSettingsStand/CounterSettingsStand';
import { DisplayCounterStand } from '../commonComponents/DisplayCounterStand/DisplayCounterStand';
import { getStyles } from './styles';

type Props = {
    fieldValuesValidator: FieldValuesValidator;
    validateFieldValue: (value: string) => boolean;
    getMinMaxValues: () => MinMaxValues;
};

export const AltCounter = (props: Props) => {
    const dispatch = useAppDispatch();

    const counterStatus = useAppSelector(selectCounterStatus);
    const { fieldValuesValidator, validateFieldValue, getMinMaxValues } = props;

    const setSettingsMode = () => {
        dispatch(counterStatusChanged(CounterStatus.TYPING));
    };

    return counterStatus !== CounterStatus.IDLE ?
            <CounterSettingsStand
                fieldValuesValidator={fieldValuesValidator}
                getCounterSpecificStyles={getStyles}
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
                getCounterSpecificStyles={getStyles}
            />;
};
