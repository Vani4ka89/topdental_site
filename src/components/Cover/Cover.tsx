import {FC} from 'react';

import '../../styles/cover.css';

const Cover: FC = () => {
    return (
        <section className="cover">
            <div className="cover__container">
                <div className="cover__content">
                    <h2>Перша консультація в TopDental</h2>
                    <p>Консультація - перший крок до гарної усмішки.</p>
                </div>
            </div>
        </section>
    );
};

export {Cover};