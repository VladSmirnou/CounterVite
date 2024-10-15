import { FieldValueValidator } from '@/app/Main';
import { Validator } from './validator';
import { IncorrectFieldName } from '@/app/Main';
import { ErrorText } from '@/common/types/app.types';
import { not } from '@/common/not';

export class ValueValidator implements FieldValueValidator {
    #validators: Array<Validator>;

    constructor(classes: Array<Validator>) {
        this.#validators = classes;
    }

    validateFieldValues(
        minValue: number,
        maxValue: number,
    ): [IncorrectFieldName, ErrorText] | undefined {
        for (const validator of this.#validators) {
            const valuesAreValid = validator.validateValues(minValue, maxValue);
            if (not(valuesAreValid))
                return validator.getIncorrectFieldNameAndErrorText();
        }
        return;
    }
}
