import { ChangeEvent } from 'react';
import s from './ValuePannel.module.css';
import { ErrorData } from './MainComponent';

type Props = {
    initialValue: number;
    labelText: string;
    errorData: ErrorData | null;
    fieldName: string;
    setValues: (fieldName: string, value: number) => void;
};

export const ValuePanel = ({
    initialValue,
    labelText,
    errorData,
    fieldName,
    setValues,
}: Props) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        // Number('') === 0, and not NaN
        if (value === '') return;

        const nextValue = Number(value);

        if (isNaN(nextValue)) return;

        setValues(fieldName, nextValue);
    };

    let finalClass = s.default;
    if (errorData) {
        const { incorrectFieldName } = errorData;
        if (incorrectFieldName === 'both' || incorrectFieldName === fieldName) {
            finalClass += ' ' + s.error;
        }
    }

    return (
        <div>
            <label htmlFor="value">{labelText}</label>
            <input
                id="value"
                type="number"
                value={initialValue}
                onChange={handleChange}
                className={finalClass}
            />
        </div>
    );
};
