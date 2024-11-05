// Можно раскидать по файлам сразу, но эти проверки легкие, ошибки
// не возвращают + их мало
const isEmptyString = (value: string) => value === '';

const isConvertableToValidInt = (value: string) => isNaN(Number(value));

const validators = [isEmptyString, isConvertableToValidInt];

export const validateFieldValue = (value: string) => {
    for (const validator of validators) {
        const valueIsInvalid = validator(value);
        if (valueIsInvalid) return true;
    }
    return false;
};
