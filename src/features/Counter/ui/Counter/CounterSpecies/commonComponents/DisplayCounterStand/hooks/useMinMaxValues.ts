import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import {
    minValueIncremented,
    minValueReset,
} from '@/features/Counter/model/min-max-values-slice';
import { selectMinMaxValues } from '@/features/Counter/model/min-max-values-selector';

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
