import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import {
    incrementMinValueAC,
    resetMinValueAC,
} from '@/features/Counter/model/min-max-values-reducer';
import { selectMinMaxValues } from '@/features/Counter/model/min-max-values-selector';

export const useMinMaxValues = () => {
    const dispatch = useAppDispatch();

    const values = useAppSelector(selectMinMaxValues);

    const handleIncrementClick = () => {
        dispatch(incrementMinValueAC());
    };

    const handleResetClick = () => {
        dispatch(resetMinValueAC());
    };

    return {
        values,
        handleIncrementClick,
        handleResetClick,
    };
};
