import { FieldValueValidator } from '@/app/interfaces/fieldValueValidator';
import { not } from '@/common/not';
import { IncorrectFieldName } from '@/common/types/app.types';
import { Validator } from './validator';

export class ValueValidator implements FieldValueValidator {
    #validators: Array<Validator>;

    constructor(classes: Array<Validator>) {
        this.#validators = classes;
    }

    validateFieldValues(
        minValue: number,
        maxValue: number,
    ):
        | {
              fieldName: IncorrectFieldName;
              errorText: string;
          }
        | undefined {
        for (const validator of this.#validators) {
            const valuesAreValid = validator.validateValues(minValue, maxValue);
            if (not(valuesAreValid))
                return validator.getIncorrectFieldNameAndErrorText();
        }
        return;
    }
}
