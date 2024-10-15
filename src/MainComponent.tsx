import { useEffect, useState } from 'react';
import { CounterSettingsStand } from './CounterSettingsStand';
import { DisplayCounterStand } from './DisplayCounterStand';
import { not } from './not';
import { LocalStorageRepo } from './localStorageRepo';

const MAX = 'max';
const MIN = 'min';
const BOTH = 'both';
const STORED_VALUES = 'storedValues';
export const MIN_ALLOWED_VALUE = 0;

export type ErrorText = string;
export type IncorrectFieldName = typeof MIN | typeof MAX | typeof BOTH;

export interface Validator {
    validateValues(minValue: number, maxValue: number): boolean;
    getIncorrectFieldNameAndErrorText(): [IncorrectFieldName, ErrorText];
}

export class ValidateMin implements Validator {
    #incorrectFieldName: IncorrectFieldName;
    #lowestAllowedValue: number;
    #errorText: ErrorText;

    constructor(
        incFieldName: IncorrectFieldName,
        lowestAllVal: number,
        errorText: ErrorText,
    ) {
        this.#incorrectFieldName = incFieldName;
        this.#lowestAllowedValue = lowestAllVal;
        this.#errorText = errorText;
    }

    // Don't wanna separate this check from the others
    // now, even tho it is slightly different,
    // and 'maxValue' is unused.

    // @ts-expect-error descr-above
    // eslint-disable-next-line
    validateValues(minValue: number, maxValue: number): boolean {
        return minValue >= this.#lowestAllowedValue;
    }

    getIncorrectFieldNameAndErrorText(): [IncorrectFieldName, ErrorText] {
        return [this.#incorrectFieldName, this.#errorText];
    }
}

export class ValidateMax implements Validator {
    #incorrectFieldName: IncorrectFieldName;
    #errorText: ErrorText;

    constructor(incFieldName: IncorrectFieldName, errorText: ErrorText) {
        this.#incorrectFieldName = incFieldName;
        this.#errorText = errorText;
    }

    validateValues(minValue: number, maxValue: number): boolean {
        return minValue < maxValue;
    }

    getIncorrectFieldNameAndErrorText(): [IncorrectFieldName, ErrorText] {
        return [this.#incorrectFieldName, this.#errorText];
    }
}

export class ValidateBoth implements Validator {
    #incorrectFieldName: IncorrectFieldName;
    #errorText: ErrorText;

    constructor(incFieldName: IncorrectFieldName, errorText: ErrorText) {
        this.#incorrectFieldName = incFieldName;
        this.#errorText = errorText;
    }

    validateValues(minValue: number, maxValue: number): boolean {
        return minValue !== maxValue;
    }

    getIncorrectFieldNameAndErrorText(): [IncorrectFieldName, ErrorText] {
        return [this.#incorrectFieldName, this.#errorText];
    }
}

export class valueValidatorRunner implements ValidatorRunner {
    #validators: Array<Validator>;

    constructor(classes: Array<Validator>) {
        this.#validators = classes;
    }

    validate(
        minValue: number,
        maxValue: number,
    ): [IncorrectFieldName, ErrorText] | undefined {
        for (const validator of this.#validators) {
            const valuesAreValid = validator.validateValues(minValue, maxValue);
            if (not(valuesAreValid))
                return validator.getIncorrectFieldNameAndErrorText();
        }
        return;
    }
}

export interface ValidatorRunner {
    validate(
        minValue: number,
        maxValue: number,
    ): [IncorrectFieldName, string] | undefined;
}

const validatorRunner = new valueValidatorRunner([
    new ValidateBoth(BOTH, 'Min value cannot be equal to max value'),
    new ValidateMin(
        MIN,
        MIN_ALLOWED_VALUE,
        'Min value cannot be less than zero',
    ),
    new ValidateMax(MAX, 'Max value cannot be less than min value'),
]);

const getInitialValues = () => {
    return {
        minValue: 0,
        maxValue: 5,
    };
};

export type ErrorData = {
    error: string;
    incorrectFieldName: string;
};

export type MinMaxValues = ReturnType<typeof getInitialValues>;

const repoObj = new LocalStorageRepo();

export const Main = () => {
    useEffect(() => {
        const storedValues = repoObj.getItem(STORED_VALUES);
        if (storedValues) {
            const minMaxVals = JSON.parse(storedValues) as MinMaxValues;
            if (typeof minMaxVals === 'object') {
                const { minValue, maxValue } = minMaxVals;
                if (
                    typeof minValue === 'number' &&
                    typeof maxValue === 'number' &&
                    !isNaN(minValue) &&
                    !isNaN(maxValue)
                )
                    setMinMaxValues({ minValue, maxValue });
            }
        } else {
            setMinMaxValues(getInitialValues());
        }
    }, []);

    const [errorData, setErrorData] = useState<ErrorData | null>(null);
    const [settingsModeOn, setSettingsModeOn] = useState<boolean>(false);
    const [minMaxValues, setMinMaxValues] =
        useState<MinMaxValues>(getInitialValues);

    const setValues = (fieldName: string, value: number) => {
        const nextMinMaxValues = {
            ...minMaxValues,
            [fieldName === MIN ? 'minValue' : 'maxValue']: value,
        };

        const incorrectFieldData = validatorRunner.validate(
            nextMinMaxValues.minValue,
            nextMinMaxValues.maxValue,
        );

        if (incorrectFieldData && errorData) {
            return;
        } else if (incorrectFieldData && not(errorData)) {
            const [incorrectFieldName, errorText] = incorrectFieldData;

            setErrorData({
                error: errorText,
                incorrectFieldName,
            });
            // I want to set incorrect values to the state once, so
            // that the user can see these values.
            setMinMaxValues(nextMinMaxValues);
        } else {
            if (errorData) setErrorData(null);
            if (not(settingsModeOn)) setSettingsModeOn(true);
            setMinMaxValues(nextMinMaxValues);
        }
        return;
    };

    const setMinMaxValuesHandler = () => {
        setMinMaxValues(minMaxValues);
        setSettingsModeOn(false);
        repoObj.setItem(STORED_VALUES, minMaxValues);
    };

    return (
        <div>
            <CounterSettingsStand
                minMaxValues={minMaxValues}
                setMinMaxValuesHandler={setMinMaxValuesHandler}
                settingsModeOn={settingsModeOn}
                setValues={setValues}
                errorData={errorData}
            />
            <DisplayCounterStand
                key={minMaxValues.minValue}
                minMaxValues={minMaxValues}
                errorText={errorData?.error}
                settingsModeOn={settingsModeOn}
            />
        </div>
    );
};
