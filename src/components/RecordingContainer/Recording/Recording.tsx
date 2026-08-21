import {FC} from 'react';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';

import {Container, Reveal, SectionTitle} from "../../ui";
import {useContent} from '../../../content';
import {RecordingForm} from "../RecordingForm/RecordingForm";
import './recording.css';

const Recording: FC = () => {
    const {content} = useContent();
    const {clinic} = content;
    const recording = content.home.recording;

    return (
        <section className="recording td-section">
            <Container className="recording__container">
                <Reveal className="recording__content">
                    <SectionTitle
                        inverse
                        eyebrow={recording.eyebrow}
                        title={recording.title}
                        description={recording.description}
                    />
                    <div className="recording__facts">
                        <span><AccessTimeOutlinedIcon fontSize="small"/>{clinic.hours.short}</span>
                        <a href={`tel:${clinic.phone}`}><PhoneInTalkOutlinedIcon fontSize="small"/>{clinic.phoneDisplay}</a>
                    </div>
                </Reveal>
                <Reveal className="recording__form-card" delay={120} id="recording">
                    <RecordingForm/>
                </Reveal>
            </Container>
        </section>
    );
};

export {Recording};
