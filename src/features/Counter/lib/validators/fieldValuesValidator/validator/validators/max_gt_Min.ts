import { IncorrectFieldName } from '@/features/Counter/lib/types/counter.types';
import { Validator } from '../validator';

export class Max_gt_Min extends Validator {
    constructor(incFieldName: IncorrectFieldName, errorText: string) {
        super(incFieldName, errorText);
    }

    validateValues(minValue: number, maxValue: number): boolean {
        return minValue < maxValue;
    }
}
