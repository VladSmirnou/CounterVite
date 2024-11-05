import { MinMaxValues } from './types/counter.types';
import { not } from '@/common/utils/not';

export const demarshallMinMaxValues = (
    storedValues: string | null,
): MinMaxValues | undefined => {
    if (storedValues) {
        const minMaxVals = JSON.parse(storedValues) as MinMaxValues;
        if (typeof minMaxVals === 'object') {
            const { minValue, maxValue } = minMaxVals;
            if (
                typeof minValue === 'number' &&
                typeof maxValue === 'number' &&
                not(isNaN(minValue)) &&
                not(isNaN(maxValue))
            ) {
                return minMaxVals;
            }
        }
    }
};
