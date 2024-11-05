import { ErrorText, IncorrectFieldName } from '@/common/types/app.types';

export abstract class Validator {
    #incorrectFieldName: IncorrectFieldName;
    #errorText: ErrorText;

    constructor(incFieldName: IncorrectFieldName, errorText: ErrorText) {
        this.#incorrectFieldName = incFieldName;
        this.#errorText = errorText;
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

    abstract validateValues(minValue: number, maxValue: number): boolean;
}
