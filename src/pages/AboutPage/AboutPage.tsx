import {FC} from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

import {Button, Container, Reveal, SectionTitle, Seo} from "../../components";
import {createDentalClinicSchema, useContent} from '../../content';
import './about-page.css';

const factIcons = [
    <GroupsOutlinedIcon/>,
    <BiotechOutlinedIcon/>,
    <PlaceOutlinedIcon/>,
];

const AboutPage: FC = () => {
    const {content} = useContent();
    const page = content.pages.about;

    return (
        <main className="main">
            <Seo
                canonicalPath="/about"
                description={content.seo.about.description}
                schema={createDentalClinicSchema(content)}
                title={content.seo.about.title}
            />

            <section className="about-page td-section">
                <Container className="about-page__container">
                    <Reveal className="about-page__content">
                        <SectionTitle
                            as="h1"
                            eyebrow={page.eyebrow}
                            title={page.title}
                            description={page.description}
                        />
                        <p>{page.body}</p>
                        <Button as="hash" icon={<ArrowForwardRoundedIcon fontSize="small"/>} to="/#recording" variant="dark">
                            {page.buttonLabel}
                        </Button>
                    </Reveal>
                    <Reveal className="about-page__image" delay={120}>
                        <img src={page.image.src} loading="lazy" alt={page.image.alt}/>
                    </Reveal>
                    <div className="about-page__facts">
                        {page.facts.map((fact, index) => (
                            <Reveal className="about-page__fact" delay={index * 80} key={fact.label}>
                                <span aria-hidden="true">{factIcons[index % factIcons.length]}</span>
                                <strong>{fact.value}</strong>
                                <p>{fact.label}</p>
                            </Reveal>
                        ))}
                    </div>
                </Container>
            </section>
        </main>
    );
};

export {AboutPage};
