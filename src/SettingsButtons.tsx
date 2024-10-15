import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export const SettingsButtons = (props: Props) => {
    const { children } = props;
    return <div>{children}</div>;
};
