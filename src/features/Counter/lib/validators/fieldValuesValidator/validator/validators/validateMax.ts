import { IncorrectFieldName } from '@/features/Counter/lib/types/counter.types';
import { Validator } from '../validator';

export class ValidateMax extends Validator {
    constructor(incFieldName: IncorrectFieldName, errorText: string) {
        super(incFieldName, errorText);
    }

    validateValues(minValue: number, maxValue: number): boolean {
        return minValue < maxValue;
    }
}
