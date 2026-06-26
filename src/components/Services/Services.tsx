import {FC, ReactNode} from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';

import {Button, Container, Reveal, SectionTitle} from '../ui';
import {useContent} from '../../content';
import './services.css';

interface IServiceItem {
    icon: ReactNode;
}

const serviceIcons: IServiceItem[] = [
    {icon: <CleaningServicesOutlinedIcon/>},
    {icon: <MedicalServicesOutlinedIcon/>},
    {icon: <ConstructionOutlinedIcon/>},
    {icon: <StraightenOutlinedIcon/>},
    {icon: <BiotechOutlinedIcon/>},
    {icon: <AutoFixHighOutlinedIcon/>},
    {icon: <SentimentSatisfiedAltOutlinedIcon/>},
];

const allowedSvgTags = new Set([
    'circle',
    'clippath',
    'defs',
    'desc',
    'ellipse',
    'g',
    'lineargradient',
    'line',
    'mask',
    'path',
    'polygon',
    'polyline',
    'radialgradient',
    'rect',
    'stop',
    'svg',
    'title',
]);

const allowedSvgAttributes = new Set([
    'aria-hidden',
    'class',
    'clip-path',
    'clip-rule',
    'cx',
    'cy',
    'd',
    'fill',
    'fill-opacity',
    'fill-rule',
    'focusable',
    'height',
    'id',
    'mask',
    'offset',
    'opacity',
    'points',
    'r',
    'role',
    'rx',
    'ry',
    'stop-color',
    'stop-opacity',
    'stroke',
    'stroke-dasharray',
    'stroke-dashoffset',
    'stroke-linecap',
    'stroke-linejoin',
    'stroke-miterlimit',
    'stroke-opacity',
    'stroke-width',
    'transform',
    'viewbox',
    'width',
    'x',
    'x1',
    'x2',
    'xmlns',
    'y',
    'y1',
    'y2',
]);

const unsafeScriptProtocol = ['java', 'script:'].join('');

const sanitizeSvg = (svgMarkup = '') => {
    const trimmedSvg = svgMarkup.trim();

    if (!trimmedSvg.startsWith('<svg') || typeof DOMParser === 'undefined') {
        return '';
    }

    try {
        const document = new DOMParser().parseFromString(trimmedSvg, 'image/svg+xml');
        const svg = document.documentElement;

        if (!svg || svg.tagName.toLowerCase() !== 'svg' || document.querySelector('parsererror')) {
            return '';
        }

        const sanitizeElement = (element: Element) => {
            if (!allowedSvgTags.has(element.tagName.toLowerCase())) {
                element.remove();
                return;
            }

            Array.from(element.attributes).forEach(attribute => {
                const name = attribute.name.toLowerCase();
                const value = attribute.value.trim().toLowerCase();

                if (
                    name.startsWith('on') ||
                    !allowedSvgAttributes.has(name) ||
                    value.includes(unsafeScriptProtocol) ||
                    value.includes('data:text/html')
                ) {
                    element.removeAttribute(attribute.name);
                }
            });

            Array.from(element.children).forEach(child => sanitizeElement(child));
        };

        sanitizeElement(svg);

        return new XMLSerializer().serializeToString(svg);
    } catch {
        return '';
    }
};

const Services: FC = () => {
    const {content} = useContent();
    const services = content.services;

    return (
        <section className="service td-section">
            <Container>
                <Reveal>
                    <SectionTitle
                        align="center"
                        as="h1"
                        eyebrow={services.eyebrow}
                        title={services.title}
                        description={services.description}
                    />
                </Reveal>
                <div className="service-grid">
                    {services.items.map((service, index) => {
                        const serviceIconSvg = sanitizeSvg(service.iconSvg);

                        return (
                            <Reveal as="article" className="service-card" delay={index * 70} key={service.title} tabIndex={0}>
                                <div className="service-card__inner">
                                    <div className="service-card__beam-glow" aria-hidden="true"></div>
                                    <div className="service-card__beam" aria-hidden="true"></div>
                                    <div className="service-card__face service-card__front">
                                        <div className="service-card__header">
                                            <div
                                                aria-hidden="true"
                                                className="service-card__icon"
                                            >
                                                {serviceIconSvg
                                                    ? <span dangerouslySetInnerHTML={{__html: serviceIconSvg}}/>
                                                    : serviceIcons[index % serviceIcons.length].icon}
                                            </div>
                                            <h2>{service.title}</h2>
                                        </div>
                                        <p>{service.description}</p>
                                        <ul className="service-card__chips">
                                            {service.details.map(detail => <li key={detail}>{detail}</li>)}
                                        </ul>
                                        <span className="service-card__hint">{services.hintLabel}</span>
                                    </div>
                                    <div className="service-card__face service-card__back">
                                        <span className="service-card__back-label">{services.whatIncludedLabel}</span>
                                        <h3>{service.title}</h3>
                                        <p>{service.result}</p>
                                        <ul className="service-card__details">
                                            {service.details.map(detail => (
                                                <li key={detail}>
                                                    <CheckCircleOutlineRoundedIcon fontSize="small"/>
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button as="hash" icon={<ArrowForwardRoundedIcon fontSize="small"/>} size="sm" to="/#recording" variant="secondary">
                                            {content.navigation.mobileCtaLabel}
                                        </Button>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export {Services};
