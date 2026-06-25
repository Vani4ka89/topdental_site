import {CSSProperties, ElementType, HTMLAttributes, ReactNode, useEffect, useRef, useState} from 'react';

import {usePrefersReducedMotion} from '../../../hooks/usePrefersReducedMotion';

interface IRevealProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    children: ReactNode;
    className?: string;
    delay?: number;
}

const Reveal = ({as: Component = 'div', children, className = '', delay = 0, style, ...props}: IRevealProps) => {
    const ref = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        const element = ref.current;

        if (!element || prefersReducedMotion) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, {rootMargin: '0px 0px -12% 0px', threshold: 0.12});

        observer.observe(element);

        return () => observer.disconnect();
    }, [prefersReducedMotion]);

    const revealStyle: CSSProperties = {
        ...style,
        transitionDelay: isVisible && delay ? `${delay}ms` : undefined,
    };

    return (
        <Component
            className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
            ref={ref}
            style={revealStyle}
            {...props}
        >
            {children}
        </Component>
    );
};

export {Reveal};
