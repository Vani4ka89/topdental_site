import {AnchorHTMLAttributes, ButtonHTMLAttributes, FC, ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

interface IBaseButtonProps {
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    size?: ButtonSize;
    variant?: ButtonVariant;
}

type NativeButtonProps = IBaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
};

type RouterButtonProps = IBaseButtonProps & {
    as: 'link' | 'hash';
    onClick?: () => void;
    target?: string;
    to: string;
};

type AnchorButtonProps = IBaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
    href: string;
};

type ButtonProps = NativeButtonProps | RouterButtonProps | AnchorButtonProps;

const Button: FC<ButtonProps> = (props) => {
    const {
        children,
        className = '',
        disabled = false,
        icon,
        iconPosition = 'right',
        size = 'md',
        variant = 'primary',
    } = props;

    const classes = [
        'td-button',
        `td-button--${variant}`,
        `td-button--${size}`,
        disabled ? 'td-button--disabled' : '',
        className,
    ].filter(Boolean).join(' ');

    const content = (
        <>
            {icon && iconPosition === 'left' && <span className="td-button__icon">{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === 'right' && <span className="td-button__icon">{icon}</span>}
        </>
    );

    if (props.as === 'link') {
        return (
            <Link className={classes} onClick={props.onClick} to={props.to}>
                {content}
            </Link>
        );
    }

    if (props.as === 'hash') {
        return (
            <HashLink className={classes} onClick={props.onClick} smooth to={props.to}>
                {content}
            </HashLink>
        );
    }

    if (props.as === 'a') {
        const {as, children: _children, className: _className, icon: _icon, iconPosition: _iconPosition, size: _size, variant: _variant, ...anchorProps} = props;

        return (
            <a className={classes} {...anchorProps}>
                {content}
            </a>
        );
    }

    const {as, children: _children, className: _className, icon: _icon, iconPosition: _iconPosition, size: _size, variant: _variant, ...buttonProps} = props;

    return (
        <button className={classes} disabled={disabled} type="button" {...buttonProps}>
            {content}
        </button>
    );
};

export {Button};
