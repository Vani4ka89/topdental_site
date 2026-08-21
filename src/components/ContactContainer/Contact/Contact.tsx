import {FC} from 'react';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

import {Container, Reveal, SectionTitle} from "../../ui";
import {useContent} from '../../../content';
import {Map} from "../../Map/Map";
import './contact.css';

const Contact: FC = () => {
    const {content} = useContent();
    const {clinic} = content;
    const contact = content.home.contact;
    const primaryLocation = clinic.locations[0];

    return (
        <section className="contact td-section" id="contact">
            <Container className="contact__container">
                <Reveal className="contact__content">
                    <SectionTitle
                        eyebrow={contact.eyebrow}
                        title={contact.title}
                        description={contact.description}
                    />
                    <div className="contact__info">
                        <div>
                            <PlaceOutlinedIcon/>
                            <span>{contact.addressLabel}</span>
                            <p>{primaryLocation?.address}</p>
                        </div>
                        <div>
                            <AccessTimeOutlinedIcon/>
                            <span>{contact.hoursLabel}</span>
                            <p>{clinic.hours.weekdays}. {clinic.hours.saturday}.</p>
                        </div>
                        <div>
                            <LocalPhoneOutlinedIcon/>
                            <span>{contact.phoneLabel}</span>
                            <p><a href={`tel:${clinic.phone}`}>{clinic.phoneDisplay}</a></p>
                        </div>
                        <div>
                            <MailOutlineOutlinedIcon/>
                            <span>{contact.emailLabel}</span>
                            <p><a href={`mailto:${clinic.email}`}>{clinic.email}</a></p>
                        </div>
                    </div>
                    <Map/>
                </Reveal>
            </Container>
        </section>
    );
};

export {Contact};
