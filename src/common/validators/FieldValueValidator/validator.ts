import { IncorrectFieldName } from '@/common/types/app.types';

export interface Validator {
    validateValues(minValue: number, maxValue: number): boolean;
    getIncorrectFieldNameAndErrorText(): {
        fieldName: IncorrectFieldName;
        errorText: string;
    };
}
