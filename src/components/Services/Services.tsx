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
                    {services.items.map((service, index) => (
                        <Reveal as="article" className="service-card" delay={index * 70} key={service.title} tabIndex={0}>
                            <div className="service-card__inner">
                                <div className="service-card__beam-glow" aria-hidden="true"></div>
                                <div className="service-card__beam" aria-hidden="true"></div>
                                <div className="service-card__face service-card__front">
                                    <div className="service-card__header">
                                        <div className="service-card__icon" aria-hidden="true">{serviceIcons[index % serviceIcons.length].icon}</div>
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
                    ))}
                </div>
            </Container>
        </section>
    );
};

export {Services};
