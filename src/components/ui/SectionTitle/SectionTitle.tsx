import {FC, ReactNode} from 'react';

interface ISectionTitleProps {
    align?: 'left' | 'center';
    as?: 'h1' | 'h2';
    children?: ReactNode;
    className?: string;
    description?: string;
    eyebrow?: string;
    inverse?: boolean;
    title: string;
}

const SectionTitle: FC<ISectionTitleProps> = ({
    align = 'left',
    as: Heading = 'h2',
    children,
    className = '',
    description,
    eyebrow,
    inverse = false,
    title,
}) => (
    <div className={`section-heading section-heading--${align} ${inverse ? 'section-heading--inverse' : ''} ${className}`.trim()}>
        {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
        <Heading className="section-heading__title">{title}</Heading>
        {description && <p className="section-heading__description">{description}</p>}
        {children}
    </div>
);

export {SectionTitle};
