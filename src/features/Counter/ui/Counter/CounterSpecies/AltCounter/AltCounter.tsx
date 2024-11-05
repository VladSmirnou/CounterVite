import { FieldValueValidator } from '@/features/Counter/lib/interfaces/fieldValueValidator';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { CounterStatus } from '@/features/Counter/lib/enums';
import { selectCounterStatus } from '@/features/Counter/model/select-counter-status';
import { CounterSettingsStand } from '../../CounterSettingsStand/CounterSettingsStand';
import { DisplayCounterStand } from '../../DisplayCounterStand/DisplayCounterStand';

type Props = {
    fieldValueValidator: FieldValueValidator;
};

export const AltCounter = (props: Props) => {
    const counterStatus = useAppSelector(selectCounterStatus);
    const { fieldValueValidator } = props;

    // const setSettingsMode = useCallback(() => {
    //     dispatch(turnSettingsModeOnAC());
    // }, [dispatch]);

    return (
        <div>
            {counterStatus === CounterStatus.TYPING ?
                <CounterSettingsStand
                    fieldValueValidator={fieldValueValidator}
                />
            :   <DisplayCounterStand
                    fieldValueValidator={fieldValueValidator}
                />
            }
        </div>
    );
};
