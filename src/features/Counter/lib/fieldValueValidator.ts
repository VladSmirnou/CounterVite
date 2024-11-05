import { ValueValidator } from '@/common/validators/FieldValueValidator/fieldValueValidator';
import { ValidateBoth } from '@/common/validators/FieldValueValidator/validators/validateBoth';
import { ValidateMax } from '@/common/validators/FieldValueValidator/validators/validateMax';
import { ValidateMin } from '@/common/validators/FieldValueValidator/validators/validateMin';
import { FieldNames } from './enums';

const MIN_ALLOWED_VALUE = 0;

export const fieldValueValidator = new ValueValidator([
    new ValidateBoth(FieldNames.BOTH, 'Min value cannot be equal to max value'),
    new ValidateMin(
        FieldNames.MIN,
        MIN_ALLOWED_VALUE,
        `Min value cannot be less than ${MIN_ALLOWED_VALUE}`,
    ),
    new ValidateMax(FieldNames.MAX, 'Max value cannot be less than min value'),
]);
