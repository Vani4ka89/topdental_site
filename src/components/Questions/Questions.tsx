import {FC, SyntheticEvent, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {Container, Reveal, SectionTitle} from '../ui';
import {useContent} from '../../content';
import './questions.css';

const Questions: FC = () => {
    const {content} = useContent();
    const questions = content.home.questions;
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <section className="questions td-section">
            <Container className="questions__container" size="narrow">
                <Reveal>
                    <SectionTitle
                        align="center"
                        eyebrow={questions.eyebrow}
                        title={questions.title}
                        description={questions.description}
                    />
                </Reveal>
                <div className="questions__list">
                    {questions.items.map((faq, index) => (
                        <Reveal delay={index * 60} key={faq.id}>
                            <Accordion
                                disableGutters
                                expanded={expanded === faq.id}
                                onChange={handleChange(faq.id)}
                                square={false}
                            >
                                <AccordionSummary
                                    aria-controls={`${faq.id}-content`}
                                    expandIcon={<ExpandMoreIcon/>}
                                    id={`${faq.id}-header`}
                                >
                                    <Typography component="h3">{faq.question}</Typography>
                                </AccordionSummary>
                                <AccordionDetails id={`${faq.id}-content`}>
                                    <Typography>{faq.answer}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export {Questions};
