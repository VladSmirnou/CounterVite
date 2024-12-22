import { ValueValidator } from '@/features/Counter/lib/validators/fieldValuesValidator/fieldValuesValidator';
import { FieldNames } from '../enums/enums';
import { ValuesAreNotEqual } from '../validators/fieldValuesValidator/validator/validators/valuesAreNotEqual';
import { Max_gt_Min } from '../validators/fieldValuesValidator/validator/validators/max_gt_Min';
import { Min_ge_MinAllowedValue } from '../validators/fieldValuesValidator/validator/validators/min_ge_MinAllowedValue';

const MIN_ALLOWED_VALUE = 0;

export const fieldValuesValidator = new ValueValidator([
    new ValuesAreNotEqual(
        FieldNames.BOTH,
        'Min value cannot be equal to max value',
    ),
    new Min_ge_MinAllowedValue(
        FieldNames.MIN,
        MIN_ALLOWED_VALUE,
        `Min value cannot be less than ${MIN_ALLOWED_VALUE}`,
    ),
    new Max_gt_Min(FieldNames.MAX, 'Max value cannot be less than min value'),
]);
