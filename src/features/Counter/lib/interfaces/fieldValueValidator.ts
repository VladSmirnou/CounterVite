import { IncorrectFieldName } from '@/features/Counter/lib/types/counter.types';

export interface FieldValuesValidator {
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
