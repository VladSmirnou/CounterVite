import { Validator } from '../validator';
import { IncorrectFieldName } from '@/common/types/app.types';
import { ErrorText } from '@/common/types/app.types';

export class ValidateBoth implements Validator {
    #incorrectFieldName: IncorrectFieldName;
    #errorText: ErrorText;

    constructor(incFieldName: IncorrectFieldName, errorText: ErrorText) {
        this.#incorrectFieldName = incFieldName;
        this.#errorText = errorText;
    }

    validateValues(minValue: number, maxValue: number): boolean {
        return minValue !== maxValue;
    }

    getIncorrectFieldNameAndErrorText(): {
        fieldName: IncorrectFieldName;
        errorText: string;
    } {
        return {
            fieldName: this.#incorrectFieldName,
            errorText: this.#errorText,
        };
    }
}
