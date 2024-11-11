import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { CounterStatus, FieldNames } from '@/features/Counter/lib/enums/enums';
import { fieldValuesValidator } from '@/features/Counter/lib/utils/fieldValuesValidator';
import { MinMaxValues } from '@/features/Counter/lib/types/counter.types';
import { setCounterStatusAC } from '@/features/Counter/model/counter-status-reducer';
import {
    setMinMaxValuesAC,
    setMinMaxValuesTC,
} from '@/features/Counter/model/min-max-values-reducer';
import { useState } from 'react';

type Kwargs = {
    counterStatus: CounterStatus;
    getMinMaxValues: () => MinMaxValues;
};

export const useMinMaxValues = (args: Kwargs) => {
    const { counterStatus, getMinMaxValues } = args;

    const dispatch = useAppDispatch();

    const [localMinMaxValues, setLocalMinMaxValues] = useState(getMinMaxValues);

    const setValues = (fieldName: FieldNames, value: number) => {
        const nextMinMaxValues = {
            ...localMinMaxValues,
            [fieldName === FieldNames.MIN ? 'minValue' : 'maxValue']: value,
        };

        const incorrectFieldData = fieldValuesValidator.validateFieldValues(
            nextMinMaxValues.minValue,
            nextMinMaxValues.maxValue,
        );

        if (incorrectFieldData && counterStatus === CounterStatus.ERROR) {
            return;
        } else if (
            incorrectFieldData &&
            counterStatus !== CounterStatus.ERROR
        ) {
            // I want to set incorrect values to the state once, so
            // that the user can see these values, and also to the store,
            // so that I don't have to store the error data, and can
            // calculate it in DisplayCounterStand

            dispatch(setCounterStatusAC(CounterStatus.ERROR));
            dispatch(setMinMaxValuesAC(nextMinMaxValues));
            setLocalMinMaxValues(nextMinMaxValues);
        } else {
            if (counterStatus === CounterStatus.ERROR) {
                dispatch(setMinMaxValuesAC(nextMinMaxValues));
            }
            dispatch(setCounterStatusAC(CounterStatus.TYPING));
            setLocalMinMaxValues(nextMinMaxValues);
        }
        return;
    };

    const setMinMaxValuesHandler = () => {
        dispatch(setCounterStatusAC(CounterStatus.IDLE));
        dispatch(setMinMaxValuesTC(localMinMaxValues));
    };

    return {
        localMinMaxValues,
        setValues,
        setMinMaxValuesHandler,
    };
};