import {FC} from 'react';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

import {Container, Reveal, SectionTitle, Seo} from "../../components";
import {createDentalClinicSchema, useContent} from '../../content';
import './contacts-page.css';

const ContactsPage: FC = () => {
    const {content} = useContent();
    const {clinic} = content;
    const page = content.pages.contacts;

    return (
        <main className="main">
            <Seo
                canonicalPath="/contacts"
                description={content.seo.contacts.description}
                schema={createDentalClinicSchema(content)}
                title={content.seo.contacts.title}
            />

            <section className="contacts-page td-section">
                <Container>
                    <Reveal>
                        <SectionTitle
                            align="center"
                            as="h1"
                            eyebrow={page.eyebrow}
                            title={page.title}
                            description={page.description}
                        />
                    </Reveal>
                    <div className="contacts-page__grid">
                        {clinic.locations.map((location, index) => (
                            <Reveal as="article" className="location-card" delay={index * 100} key={location.name}>
                                <iframe
                                    height="260"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src={location.mapSrc}
                                    title={location.mapTitle}
                                    width="100%"
                                />
                                <div className="location-card__body">
                                    <h2>{location.name}</h2>
                                    <p><PlaceOutlinedIcon fontSize="small"/>{location.address}</p>
                                    <p><LocalPhoneOutlinedIcon fontSize="small"/><a href={`tel:${location.phone}`}>{location.phoneDisplay}</a></p>
                                    <p><MailOutlineOutlinedIcon fontSize="small"/><a href={`mailto:${clinic.email}`}>{clinic.email}</a></p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </Container>
            </section>
        </main>
    );
};

export {ContactsPage};
