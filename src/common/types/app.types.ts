import { FieldNames } from '../enums/enums';

export type ErrorText = string;

export type IncorrectFieldName = FieldNames;

export type ErrorData = {
    error: ErrorText;
    incorrectFieldName: IncorrectFieldName;
};
