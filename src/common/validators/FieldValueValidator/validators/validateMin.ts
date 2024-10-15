import { Validator } from '../validator';
import { IncorrectFieldName } from '@/common/types/app.types';
import { ErrorText } from '@/common/types/app.types';

export class ValidateMin implements Validator {
    #incorrectFieldName: IncorrectFieldName;
    #lowestAllowedValue: number;
    #errorText: ErrorText;

    constructor(
        incFieldName: IncorrectFieldName,
        lowestAllVal: number,
        errorText: ErrorText,
    ) {
        this.#incorrectFieldName = incFieldName;
        this.#lowestAllowedValue = lowestAllVal;
        this.#errorText = errorText;
    }

    // Don't wanna separate this check from the others
    // now, even tho it is slightly different,
    // and 'maxValue' is unused.

    // @ts-expect-error descr-above
    // eslint-disable-next-line
    validateValues(minValue: number, maxValue: number): boolean {
        return minValue >= this.#lowestAllowedValue;
    }

    getIncorrectFieldNameAndErrorText(): [IncorrectFieldName, ErrorText] {
        return [this.#incorrectFieldName, this.#errorText];
    }
}
