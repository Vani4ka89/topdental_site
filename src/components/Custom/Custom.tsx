import {FC, useState} from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

import {Button, Container} from '../ui';
import {useContent} from '../../content';
import './custom.css';

const Custom: FC = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const {content} = useContent();
    const {clinic} = content;
    const hero = content.home.hero;

    return (
        <section className={`hero ${isImageLoaded ? 'is-loaded' : ''}`}>
            <Container className="hero__container" size="wide">
                <div className="hero__content">
                    <p className="hero__eyebrow"><VerifiedOutlinedIcon fontSize="small"/> {hero.eyebrow}</p>
                    <h1>{hero.title}</h1>
                    <p className="hero__description">
                        {hero.description}
                    </p>
                    <div className="hero__actions">
                        <Button as="hash" icon={<ArrowForwardRoundedIcon fontSize="small"/>} size="lg" to="/#recording">
                            {hero.primaryCtaLabel}
                        </Button>
                        <Button as="link" size="lg" to="/services" variant="secondary">
                            {hero.secondaryCtaLabel}
                        </Button>
                    </div>
                    <div className="hero__quick-info" aria-label="Швидка інформація">
                        <a href={`tel:${clinic.phone}`}><LocalPhoneOutlinedIcon fontSize="small"/>{clinic.phoneDisplay}</a>
                        <span><CalendarMonthOutlinedIcon fontSize="small"/>{clinic.hours.short}</span>
                        <span><PlaceOutlinedIcon fontSize="small"/>{hero.quickLocation}</span>
                    </div>
                </div>

                <div className="hero__visual">
                    <div className="hero__image-shell">
                        <img
                            alt={hero.image.alt}
                            height="705"
                            loading="eager"
                            onLoad={() => setIsImageLoaded(true)}
                            src={hero.image.src}
                            width="1280"
                        />
                    </div>
                    <div className="hero__trust-card" aria-label={`Переваги ${clinic.name}`}>
                        {hero.trustItems.map(item => (
                            <div key={item.label}>
                                <strong>{item.value}</strong>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export {Custom};
