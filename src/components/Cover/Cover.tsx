import {FC} from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import {Button, Container, Reveal, SectionTitle} from '../ui';
import {useContent} from '../../content';
import {bookingUrl} from '../../constants';
import './cover.css';

const Cover: FC = () => {
    const {content} = useContent();
    const cover = content.home.cover;

    return (
        <section className="cover td-section">
            <Container className="cover__container">
                <Reveal className="cover__content">
                    <SectionTitle
                        align="left"
                        inverse
                        eyebrow={cover.eyebrow}
                        title={cover.title}
                        description={cover.description}
                    />
                    <Button as="a" href={bookingUrl} icon={<ArrowForwardRoundedIcon fontSize="small"/>} rel="noopener noreferrer" size="lg" target="_blank">
                        {cover.buttonLabel}
                    </Button>
                </Reveal>
                <Reveal className="cover__portrait" delay={140}>
                    <div className="cover__portrait-shell">
                        <img src={cover.image.src} alt={cover.image.alt} loading="lazy"/>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
};

export {Cover};
