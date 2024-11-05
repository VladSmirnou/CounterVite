import { IncorrectFieldName } from '@/common/types/app.types';

export interface FieldValueValidator {
    validateFieldValues(
        minValue: number,
        maxValue: number,
    ):
        | {
              fieldName: IncorrectFieldName;
              errorText: string;
          }
        | undefined;
}
