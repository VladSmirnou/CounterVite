import { FieldValuesValidator } from '@/features/Counter/lib/interfaces/fieldValueValidator';
import { not } from '@/common/utils/not';
import { IncorrectFieldName } from '@/features/Counter/lib/types/counter.types';
import { Validator } from './validator/validator';

export class ValueValidator implements FieldValuesValidator {
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
