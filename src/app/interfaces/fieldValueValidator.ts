import { ErrorText, IncorrectFieldName } from '@/common/types/app.types';

export interface FieldValueValidator {
    validateFieldValues(
        minValue: number,
        maxValue: number,
    ): [IncorrectFieldName, ErrorText] | undefined;
}
