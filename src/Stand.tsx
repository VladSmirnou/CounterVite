import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export const Stand = (props: Props) => {
    // min-max value state
    const { children } = props;
    return <div>{children}</div>;
};
