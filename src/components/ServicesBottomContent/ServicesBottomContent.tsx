import {FC} from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import {Button, Container, Reveal, SectionTitle} from '../ui';
import {useContent} from '../../content';
import './services-bottom.content.css';

const ServicesBottomContent: FC = () => {
    const {content} = useContent();
    const cta = content.services.cta;

    return (
        <section className="consultation-content td-section">
            <Container>
                <Reveal className="consultation-content__card">
                    <SectionTitle
                        align="center"
                        inverse
                        eyebrow={cta.eyebrow}
                        title={cta.title}
                        description={cta.description}
                    />
                    <Button as="hash" icon={<ArrowForwardRoundedIcon fontSize="small"/>} size="lg" to="/#recording">
                        {cta.buttonLabel}
                    </Button>
                </Reveal>
            </Container>
        </section>
    );
};

export {ServicesBottomContent};
