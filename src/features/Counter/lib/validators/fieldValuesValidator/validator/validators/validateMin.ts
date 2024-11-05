import { IncorrectFieldName } from '@/features/Counter/lib/types/counter.types';
import { Validator } from '../validator';

export class ValidateMin extends Validator {
    #lowestAllowedValue: number;

    constructor(
        incFieldName: IncorrectFieldName,
        lowestAllVal: number,
        errorText: string,
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
