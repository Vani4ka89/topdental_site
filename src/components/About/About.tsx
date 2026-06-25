import {FC} from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';

import {Button, Container, Reveal, SectionTitle} from '../ui';
import {useContent} from '../../content';
import './about.css';

const highlightIcons = [
    <WorkspacePremiumOutlinedIcon/>,
    <BiotechOutlinedIcon/>,
    <HealthAndSafetyOutlinedIcon/>,
];

const About: FC = () => {
    const {content} = useContent();
    const about = content.home.about;

    return (
        <section className="about td-section">
            <Container className="about__container">
                <Reveal className="about__content">
                    <SectionTitle
                        eyebrow={about.eyebrow}
                        title={about.title}
                        description={about.description}
                    />
                    <div className="about__actions">
                        <Button as="link" icon={<ArrowForwardRoundedIcon fontSize="small"/>} to="/about" variant="dark">
                            {about.buttonLabel}
                        </Button>
                    </div>
                </Reveal>

                <Reveal className="about__visual" delay={120}>
                    <img alt={about.image.alt} loading="lazy" src={about.image.src}/>
                </Reveal>

                <div className="about__highlights">
                    {about.highlights.map((item, index) => (
                        <Reveal className="about__highlight" delay={index * 90} key={item.title}>
                            <span aria-hidden="true">{highlightIcons[index % highlightIcons.length]}</span>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export {About};
