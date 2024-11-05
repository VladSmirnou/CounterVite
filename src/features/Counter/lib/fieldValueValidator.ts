import { ValueValidator } from '@/features/Counter/lib/validators/fieldValuesValidator/fieldValuesValidator';
import { FieldNames } from './enums/enums';
import { ValidateBoth } from './validators/fieldValuesValidator/validator/validators/validateBoth';
import { ValidateMax } from './validators/fieldValuesValidator/validator/validators/validateMax';
import { ValidateMin } from './validators/fieldValuesValidator/validator/validators/validateMin';

const MIN_ALLOWED_VALUE = 0;

export const fieldValuesValidator = new ValueValidator([
    new ValidateBoth(FieldNames.BOTH, 'Min value cannot be equal to max value'),
    new ValidateMin(
        FieldNames.MIN,
        MIN_ALLOWED_VALUE,
        `Min value cannot be less than ${MIN_ALLOWED_VALUE}`,
    ),
    new ValidateMax(FieldNames.MAX, 'Max value cannot be less than min value'),
]);
