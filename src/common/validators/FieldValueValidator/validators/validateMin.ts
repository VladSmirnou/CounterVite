import { Validator } from '../validator';
import { IncorrectFieldName } from '@/common/types/app.types';
import { ErrorText } from '@/common/types/app.types';

export class ValidateMin extends Validator {
    #lowestAllowedValue: number;

    constructor(
        incFieldName: IncorrectFieldName,
        lowestAllVal: number,
        errorText: ErrorText,
    ) {
        super(incFieldName, errorText);
        this.#lowestAllowedValue = lowestAllVal;
    }

    // Don't wanna separate this check from the others
    // now, even tho it is slightly different,
    // and 'maxValue' is unused.

    // @ts-expect-error descr-above
    // eslint-disable-next-line
    validateValues(minValue: number, maxValue: number): boolean {
        return minValue >= this.#lowestAllowedValue;
    }
}
