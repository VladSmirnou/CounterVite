import { ButtonHTMLAttributes, memo } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const SuperButton = memo(function SuperButton(props: Props) {
    const { onClick, ...rest } = props;

    return <button onClick={onClick} {...rest} />;
});
