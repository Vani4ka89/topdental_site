import {FC, HTMLAttributes, ReactNode} from 'react';

interface IContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    size?: 'default' | 'wide' | 'narrow';
}

const Container: FC<IContainerProps> = ({children, className = '', size = 'default', ...props}) => (
    <div className={`td-container td-container--${size} ${className}`.trim()} {...props}>
        {children}
    </div>
);

export {Container};
