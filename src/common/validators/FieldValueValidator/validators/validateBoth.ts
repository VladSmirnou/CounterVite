import { Validator } from '../validator';
import { IncorrectFieldName } from '@/common/types/app.types';
import { ErrorText } from '@/common/types/app.types';

export class ValidateBoth extends Validator {
    constructor(incFieldName: IncorrectFieldName, errorText: ErrorText) {
        super(incFieldName, errorText);
    }

    validateValues(minValue: number, maxValue: number): boolean {
        return minValue !== maxValue;
    }
}
