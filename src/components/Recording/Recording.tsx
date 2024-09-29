import {FC} from 'react';

import '../../styles/recording.css';
import {RecordingForm} from "../RecordingForm/RecordingForm";

const Recording: FC = () => {
    return (
        <section className="recording">
            <div className="recording__container">
                <div className="recording__content">
                    <h2>Бажаєте записатися на першу консультацію?</h2>
                    <p>Скористайтеся цією формою, щоб записатися на прийом і запланувати свій перший візит до нас.</p>
                    <p>* Після заповнення форми чекайте дзвінка нашого адміністратора.</p>
                </div>
                <RecordingForm/>
            </div>
        </section>
    );
};

export {Recording};