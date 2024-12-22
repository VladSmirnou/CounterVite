import { IncorrectFieldName } from '@/features/Counter/lib/types/counter.types';

export abstract class Validator {
    #incorrectFieldName: IncorrectFieldName;
    #errorText: string;

    constructor(incFieldName: IncorrectFieldName, errorText: string) {
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
