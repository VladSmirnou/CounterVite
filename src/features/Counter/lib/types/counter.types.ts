import { FieldNames } from '@/features/Counter/lib/enums/enums';
import { getDefaultValues } from '../getDefaultValues';

export type IncorrectFieldName = FieldNames;
export type MinMaxValues = ReturnType<typeof getDefaultValues>;

export type RenderButtonsProps = {
    incButtonDisabled: boolean;
    resetButtonDisabled: boolean;
    handleIncrementClick: () => void;
    handleResetClick: () => void;
};
