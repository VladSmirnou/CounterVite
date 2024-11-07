import { useAppSelector } from '@/common/hooks/useAppSelector';
import { CounterStatus } from '@/features/Counter/lib/enums/enums';
import { FieldValuesValidator } from '@/features/Counter/lib/interfaces/fieldValueValidator';
import { selectCounterStatus } from '@/features/Counter/model/select-counter-status';

type Kwargs = {
    values: {
        minValue: number;
        maxValue: number;
        initialMinValue: number;
    };
    fieldValuesValidator: FieldValuesValidator;
};

export const useDisplayStatus = (args: Kwargs) => {
    const { values, fieldValuesValidator } = args;
    const { minValue, maxValue, initialMinValue } = values;

    const counterStatus = useAppSelector(selectCounterStatus);

    let errorData;
    if (counterStatus === CounterStatus.ERROR) {
        errorData = fieldValuesValidator.validateFieldValues(
            minValue,
            maxValue,
        );
    }

    const minValue_eq_maxValue = minValue === maxValue;
    const counterStatusIsNotIdle = counterStatus !== CounterStatus.IDLE;

    const incButtonDisabled = minValue >= maxValue || counterStatusIsNotIdle;
    const resetButtonDisabled =
        minValue === initialMinValue || counterStatusIsNotIdle;
    return {
        counterStatus,
        minValue_eq_maxValue,
        incButtonDisabled,
        resetButtonDisabled,
        errorText: errorData?.errorText,
    };
};
