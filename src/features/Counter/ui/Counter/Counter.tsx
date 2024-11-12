import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useEffect } from 'react';
import { counterTypeChanged } from '../../model/common-actions';

type Props = {
    render: () => JSX.Element;
};

export const Counter = (props: Props) => {
    const dispatch = useAppDispatch();

    const { render } = props;

    useEffect(() => {
        const root = document.getElementById('root') as HTMLElement;
        root.style.backgroundColor = '#292c35';
        return () => {
            root.style.backgroundColor = 'white';
            dispatch(counterTypeChanged());
        };
    }, [dispatch]);

    return render();
};
