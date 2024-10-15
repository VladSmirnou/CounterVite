import { ErrorText } from '@/common/types/app.types';
import { IncorrectFieldName } from '@/common/types/app.types';

export interface Validator {
    validateValues(minValue: number, maxValue: number): boolean;
    getIncorrectFieldNameAndErrorText(): [IncorrectFieldName, ErrorText];
}
