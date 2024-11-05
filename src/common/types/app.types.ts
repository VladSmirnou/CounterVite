import { FieldNames } from '@/features/Counter/lib/enums';

export type ErrorText = string;

export type IncorrectFieldName = FieldNames;

export type ErrorData = {
    fieldName: FieldNames;
    errorText: string;
};
