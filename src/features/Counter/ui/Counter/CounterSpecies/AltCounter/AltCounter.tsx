import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { CounterStatus } from '@/features/Counter/lib/enums/enums';
import { FieldValuesValidator } from '@/features/Counter/lib/interfaces/fieldValueValidator';
import { RenderButtonsProps } from '@/features/Counter/lib/types/counter.types';
import { setCounterStatusAC } from '@/features/Counter/model/counter-status-reducer';
import { selectCounterStatus } from '@/features/Counter/model/select-counter-status';
import { CounterSettingsStand } from '../../CounterSettingsStand/CounterSettingsStand';
import { DisplayCounterStand } from '../../DisplayCounterStand/DisplayCounterStand';
import { AltCounterButtons } from './AltCounterButtons/AltCounterButtons';
import { useEffect } from 'react';

type Props = {
    fieldValuesValidator: FieldValuesValidator;
    validateFieldValue: (value: string) => boolean;
};

const altCounterStyles = {
    width: '100%',
    maxWidth: 430,
    margin: '0 auto',
};

export const AltCounter = (props: Props) => {
    useEffect(() => {
        return () => console.log('removing alt counter');
    }, []);
    const dispatch = useAppDispatch();

    const counterStatus = useAppSelector(selectCounterStatus);
    const { fieldValuesValidator, validateFieldValue } = props;

    const setSettingsMode = () => {
        dispatch(setCounterStatusAC(CounterStatus.TYPING));
    };

    return counterStatus !== CounterStatus.IDLE ?
            <CounterSettingsStand
                fieldValuesValidator={fieldValuesValidator}
                counterSpecificStyles={altCounterStyles}
                validateFieldValue={validateFieldValue}
            />
        :   <DisplayCounterStand
                fieldValuesValidator={fieldValuesValidator}
                renderButtons={(props: RenderButtonsProps) => (
                    <AltCounterButtons
                        {...props}
                        setSettingsMode={setSettingsMode}
                    />
                )}
                counterSpecificStyles={altCounterStyles}
            />;
};
