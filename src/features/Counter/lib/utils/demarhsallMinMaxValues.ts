import { MinMaxValues } from '../types/counter.types';
import { not } from '@/common/utils/not';
import { fieldValuesValidator } from '../fieldValueValidator';

export const demarshallMinMaxValues = (
    storedValues: string | null,
): MinMaxValues | undefined => {
    if (storedValues) {
        const minMaxValues = JSON.parse(storedValues) as MinMaxValues;
        // Проверки на то, испортил ли пользователь данные в
        // LocalStorage или нет
        if (typeof minMaxValues === 'object') {
            const { minValue, maxValue } = minMaxValues;
            if (
                typeof minValue === 'number' &&
                typeof maxValue === 'number' &&
                not(isNaN(minValue)) &&
                not(isNaN(maxValue)) &&
                not(
                    fieldValuesValidator.validateFieldValues(
                        minValue,
                        maxValue,
                    ),
                )
            ) {
                return minMaxValues;
            }
        }
    }
};
