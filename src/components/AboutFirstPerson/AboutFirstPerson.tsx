import {FC} from 'react';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

import {Container, Reveal, SectionTitle} from '../ui';
import {useContent} from '../../content';
import './about-first-person.css';

const AboutFirstPerson: FC = () => {
    const {content} = useContent();
    const doctor = content.doctors.items[0];

    if (!doctor) {
        return null;
    }

    return (
        <section className="doctor-section doctor-section--primary td-section">
            <Container className="doctor-section__container">
                <Reveal className="doctor-section__image">
                    <img src={doctor.image.src} alt={doctor.image.alt} loading="lazy"/>
                </Reveal>
                <Reveal className="doctor-section__content" delay={100}>
                    <SectionTitle eyebrow={doctor.role} title={doctor.name} description={doctor.description}/>
                    <div className="doctor-section__badges">
                        {doctor.badges.map(badge => <span key={badge}>{badge}</span>)}
                    </div>
                    <ul className="doctor-section__list">
                        {doctor.credentials.map(item => (
                            <li key={item}><CheckCircleOutlineRoundedIcon fontSize="small"/>{item}</li>
                        ))}
                    </ul>
                </Reveal>
            </Container>
        </section>
    );
};

export {AboutFirstPerson};
