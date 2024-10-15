import { getDefaultValues } from './getDefaultValues';
import { MinMaxValues } from './types/counter.types';
import { not } from '@/common/not';

export const demarshallMinMaxValues = (storedValues: string): MinMaxValues => {
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
    return getDefaultValues();
};
