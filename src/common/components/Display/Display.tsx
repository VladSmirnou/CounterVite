import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export const Display = (props: Props) => {
    const { children } = props;
    return <div>{children}</div>;
};
