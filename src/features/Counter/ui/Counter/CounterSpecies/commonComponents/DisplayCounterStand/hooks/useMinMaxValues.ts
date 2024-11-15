import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import {
    minValueIncremented,
    minValueReset,
    selectMinMaxValues,
} from '@/features/Counter/model/min-max-values-slice';

export const useMinMaxValues = () => {
    const dispatch = useAppDispatch();

    const values = useAppSelector(selectMinMaxValues);

    const handleIncrementClick = () => {
        dispatch(minValueIncremented());
    };

    const handleResetClick = () => {
        dispatch(minValueReset());
    };

    return {
        values,
        handleIncrementClick,
        handleResetClick,
    };
};
